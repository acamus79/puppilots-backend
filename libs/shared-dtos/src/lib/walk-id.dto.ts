import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class WalkIdDto {
  @ApiProperty()
// @IsString()
  @IsUUID()
  @IsNotEmpty({ message: "El Id del paseo es requerido" })
  walkId: string;
}