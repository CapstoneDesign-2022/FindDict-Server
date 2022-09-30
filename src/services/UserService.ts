import { access } from "fs";
import {
  UserCreateDto,
  UserResponseDto,
  UserSignInDto,
  UserSignInResponseDto,
} from "../interfaces/IUser";
import jwtHandler from "../modules/jwtHandler";
import bcrypt from "bcryptjs";

const createUser = async (
  client: any,
  userCreateDto: UserCreateDto
): Promise<UserResponseDto> => {
  try {
    const { rows: user } = await client.query(
      `
            INSERT INTO "user" (email, age)
            VALUES ($1, $2)
            RETURNING id, email, age
            `,
      [userCreateDto.email, userCreateDto.age]
    );
    const accessToken = jwtHandler.getToken(user[0].id);

    const data: UserResponseDto = {
      email: user[0].email,
      age: user[0].age,
      accessToken: accessToken,
    };

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const signInUser = async (
  client: any,
  userSignInDto: UserSignInDto
): Promise<UserSignInResponseDto | string> => {
  try {
    const { rows: user } = await client.query(
      `
        SELECT *
        FROM "user" as u
        WHERE u.email = $1
      `,
      [userSignInDto.email]
    );

    const isMatch = await bcrypt.compare(
      user[0].password,
      userSignInDto.password
    );
    if (!user[0] || !isMatch) {
      return "login_failed";
    }

    const accessToken = jwtHandler.getToken(user[0].id);
    const data: UserSignInResponseDto = {
      accessToken: accessToken,
    };
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  createUser,
  signInUser,
};
