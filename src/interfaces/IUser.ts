export interface UserCreateDto {
  email: string;
  age: string;
}

export interface UserUpdateDto {
  age: string;
}

export interface UserResponseDto {
  email: string;
  age: string;
  accessToken?: string;
}
