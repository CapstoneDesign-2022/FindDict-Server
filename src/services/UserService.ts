import { access } from "fs";
import {
  UserSignUpDto,
  UserSignUpResponseDto,
  UserSignInDto,
  UserSignInResponseDto,
} from "../interfaces/IUser";
import jwtHandler from "../modules/jwtHandler";
import bcrypt from "bcryptjs";

const createUser = async (
  client: any,
  userSignUpDto: UserSignUpDto
): Promise<UserSignUpResponseDto> => {
  try {
    const { rows: user } = await client.query(
            `
            INSERT INTO "user" (email, age, password)
            VALUES ($1, $2, $3)
            RETURNING id
            `,
      [userSignUpDto.email, userSignUpDto.age, userSignUpDto.password]
    );
    const accessToken = jwtHandler.getToken(user[0].id);
    const data: UserSignUpResponseDto = {
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
