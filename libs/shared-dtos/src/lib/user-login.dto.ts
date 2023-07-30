import { IsEmail, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/index'

export class UserLoginDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsStrongPassword({minLength: 6})
  @ApiProperty()
  password: string;
}
