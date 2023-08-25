import { ApiProperty } from "@nestjs/swagger";
import { Walks } from "@prisma/client";
import { IsNotEmpty } from "class-validator";

export class PaymentOrderCreated {
  @ApiProperty()
  @IsNotEmpty()
  clientUrl: string;
}