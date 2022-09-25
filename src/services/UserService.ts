import { access } from "fs";
import {
  UserCreateDto,
  UserResponseDto,
  UserUpdateDto
} from "../interfaces/IUser";
import jwtHandler from "../modules/jwtHandler";

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
      accessToken: accessToken
    };

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateUser = async (
  client: any,
  userUpdateDto: UserUpdateDto,
  userId: number
): Promise<UserResponseDto> => {
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
      age: user[0].age
      // accessToken: accessToken
    };

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  createUser,
  updateUser
};
