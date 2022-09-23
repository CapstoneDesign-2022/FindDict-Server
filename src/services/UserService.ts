import { UserCreateDto, UserResponseDto } from "../interfaces/IUser";

const createUser = async (
  client: any,
  userCreateDto: UserCreateDto
): Promise<UserResponseDto> => {
  try {
    const { rows: user } = await client.query(
      `
            INSERT INTO "user" (email, nickname)
            VALUES ($1, $2)
            RETURNING email, nickname
            `,
      [userCreateDto.email, userCreateDto.nickname]
    );

    const data: UserResponseDto = {
      email: user[0].email,
      nickname: user[0].nickname
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
