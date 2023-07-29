import { IsEmail, IsStrongPassword, minLength } from 'class-validator';

export class UserLoginDto {
  @IsEmail()
  email: string;

  @IsStrongPassword({minLength: 6})
  password: string;
}