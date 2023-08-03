import { IsNotEmpty, IsString } from "class-validator";

export class VerifyTokenDto {
  @IsString()
  @IsNotEmpty({message: 'El token no puede estar vacío.'})
  token: string;
}