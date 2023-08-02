import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class PuppetDto {
  @ApiProperty()
  name: string

  @ApiProperty()
  @IsUUID()
  customerId: string
}
