import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class PaymentOrderCreated {
  @ApiProperty()
  @IsNotEmpty()
  clientUrl: string;
}
