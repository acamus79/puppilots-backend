import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class PaymentOrderFrontDto {

  @ApiProperty()
  @IsNumber({}, { message: "Debe ser un número" })
  @IsNotEmpty({ message: "La cantidad deb estar especificada"})
  quantity: number;
  
  @ApiProperty()
  @IsNotEmpty({ message: "El Id del paseo es requerido"})
  walkId: string;

  @ApiProperty()
  @IsNotEmpty({ message: "El Id del paseador es requerido"})
  pilotId: string;

}