export interface UserSignUpDto {
  user_id: string;
  age: string;
  password: string;
}
export interface UserSignUpResponseDto {
  accessToken: string;
}
export interface UserSignInDto {
  user_id: string;
  password: string;
}
export interface UserSignInResponseDto {
  accessToken: string;
}
export interface UserConfirmIdDto {
  user_id: string;
}
