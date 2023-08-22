import { ApiProperty } from "@nestjs/swagger";
import { Type } from 'class-transformer';
import { AddressDto } from "./address.dto";

export class CommonUserDto {

  @ApiProperty()
  userId?: string;

  @ApiProperty()
  id?: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  dni: string;

  @ApiProperty()
  phone: string;

  @Type(() => AddressDto) // Indica el tipo del objeto AddressDto
  address: AddressDto;
}
