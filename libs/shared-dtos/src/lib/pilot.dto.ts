import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from 'class-validator';
import { AddressDto } from "./address.dto";

export class PilotDto {
  @ApiProperty( { example: 'Jhon' })
  @IsString()
  name: string;

  @ApiProperty( { example: 'Doe' })
  @IsString()
  lastName: string;

  @ApiProperty( { example: '12345678' })
  @IsString()
  dni: string;

  @ApiProperty( { example: '12345678' })
  @IsString()
  phone: string;

  @ApiProperty()
  @IsUUID()
  userId?: string;

  @ApiProperty({ type: AddressDto})
  address?: AddressDto

}
