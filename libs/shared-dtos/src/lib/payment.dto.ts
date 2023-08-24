import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class PaymentDto {
  @IsString()
  @IsNotEmpty({message: 'El token no puede estar vacío.'})
  @ApiProperty()
  token: string;
}