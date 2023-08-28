import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class PaymentOrderFrontDto {
 
  @ApiProperty()
  @IsNotEmpty({ message: "El Id del paseo es requerido"})
  walkId: string;

  @ApiProperty()
  @IsNotEmpty({ message: "El Id del paseador es requerido"})
  pilotId: string;

}