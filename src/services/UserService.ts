import { access } from 'fs';
import {
  UserSignUpDto,
  UserSignUpResponseDto,
  UserSignInDto,
  UserSignInResponseDto,
} from '../interfaces/IUser';
import jwtHandler from '../modules/jwtHandler';
import bcrypt from 'bcryptjs';

const createUser = async (
  client: any,
  userSignUpDto: UserSignUpDto,
): Promise<UserSignUpResponseDto> => {
  try {
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(userSignUpDto.password, salt);
    const { rows: user } = await client.query(
      `
            INSERT INTO "user" (email, age, password)
            VALUES ($1, $2, $3)
            RETURNING id
            `,
      [userSignUpDto.email, userSignUpDto.age, encryptedPassword],
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

const updateUser = async (
  client: any,
  userSignInDto: UserSignInDto,
): Promise<UserSignInResponseDto | string> => {
  try {
    console.log(userUpdateDto, userId);
    const { rows: user } = await client.query(
      `
            UPDATE "user" 
            SET age = $1
            WHERE id = $2
            RETURNING *
            `,
      [userUpdateDto.age, userId]
    );
    // const accessToken = jwtHandler.getToken(user[0].id);

    const data: UserResponseDto = {
      email: user[0].email,
      age: user[0].age,
      // accessToken: accessToken
    };

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const loginUser = async (
  client: any,
  userLoginDto: UserLoginDto
): Promise<UserLoginResponseDto | string> => {
  try {
    const { rows: user } = await client.query(
      `
        SELECT *
        FROM "user" as u
        WHERE u.email = $1
      `,
      [userSignInDto.email],
    );

    const isMatch = await bcrypt.compare(userSignInDto.password, user[0].password);
    if (!user[0] || !isMatch) {
      return 'login_failed';
    }

    const accessToken = jwtHandler.getToken(user[0].id);
    const data: UserLoginResponseDto = {
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
  updateUser,
  loginUser,
};
