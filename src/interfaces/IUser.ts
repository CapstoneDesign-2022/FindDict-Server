export interface UserSignUpDto {
  email: string;
  age: string;
  password: string;
}

export interface UserSignUpResponseDto {
  accessToken: string;
}
export interface UserSignInDto {
  email: string;
  password: string;
}

export interface UserSignInResponseDto {
  accessToken: string;
}
