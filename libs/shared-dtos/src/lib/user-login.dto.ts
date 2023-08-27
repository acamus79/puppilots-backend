import { IsEmail, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/index'

export class UserLoginDto {
  @IsEmail({}, {message: 'El email debe ser un email válido'})
  @ApiProperty()
  email: string;

  @IsStrongPassword({minLength: 6}, {message: 'La contraseña debe tener al menos 6 caracteres'})
  @ApiProperty()
  password: string;
}
