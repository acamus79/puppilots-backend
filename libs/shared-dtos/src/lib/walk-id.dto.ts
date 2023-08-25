import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class WalkIdDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty({ message: "El Id del paseo es requerido" })
  walkId: string;
}