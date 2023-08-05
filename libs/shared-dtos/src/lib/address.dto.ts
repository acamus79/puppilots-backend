import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"


export class AddressDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'El país es requerido' })
  country: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'La ciudad es requerida' })
  city: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'La calle es requerida' })
  street: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'El número es requerido' })
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
  references?: string
}
