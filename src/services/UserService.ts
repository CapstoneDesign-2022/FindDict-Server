import { access } from "fs";
import { UserCreateDto, UserResponseDto } from "../interfaces/IUser";
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

export default {
  createUser
};
