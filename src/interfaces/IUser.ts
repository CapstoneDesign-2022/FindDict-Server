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

export interface UserLoginDto {
  email: string;
  password: string;
}

export interface UserLoginResponseDto {
  accessToken: string;
}
