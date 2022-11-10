import { access } from 'fs';
import {
  UserSignUpDto,
  UserSignUpResponseDto,
  UserSignInDto,
  UserSignInResponseDto,
  UserConfirmIdDto,
} from '../interfaces/IUser';
import jwtHandler from '../modules/jwtHandler';
import bcrypt from 'bcryptjs';

const signUpUser = async (
  client: any,
  userSignUpDto: UserSignUpDto,
): Promise<UserSignUpResponseDto> => {
  try {
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(userSignUpDto.password, salt);
    const { rows: user } = await client.query(
      `
            INSERT INTO "user" (user_id, age, password)
            VALUES ($1, $2, $3)
            RETURNING id
            `,
      [userSignUpDto.user_id, userSignUpDto.age, encryptedPassword],
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
  userSignInDto: UserSignInDto,
): Promise<UserSignInResponseDto | string> => {
  try {
    const { rows: user } = await client.query(
      `
        SELECT *
        FROM "user" as u
        WHERE u.user_id = $1
      `,
      [userSignInDto.user_id],
    );

    if (!user[0]) {
      return 'login_failed';
    }

    const isMatch = await bcrypt.compare(userSignInDto.password, user[0].password);
    if (!isMatch) {
      return 'login_failed';
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

const confirmUserId = async (client: any, userConfirmIdDto: UserConfirmIdDto): Promise<string> => {
  try {
    const { rows: user } = await client.query(
      `
        SELECT *
        FROM "user" as u
        WHERE u.user_id = $1
      `,
      [userConfirmIdDto.user_id],
    );

    if (user[0]) {
      return 'already_exist';
    } else {
      return 'available_Id';
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  signUpUser,
  signInUser,
  confirmUserId,
};
