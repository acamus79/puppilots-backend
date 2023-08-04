import { ApiProperty } from "@nestjs/swagger"

export class AddressDto {
  @ApiProperty()
  country: string

  @ApiProperty()
  city: string

  @ApiProperty()
  street: string

  @ApiProperty()
  number: string

  @ApiProperty()
  floor?: string

  @ApiProperty()
  department?: string

  @ApiProperty()
  latitude?: string

  @ApiProperty()
  longitude?: string

  @ApiProperty()
  references: string;
}
