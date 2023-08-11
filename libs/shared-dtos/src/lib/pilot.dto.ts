import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEmail, IsStrongPassword,  ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AddressDto } from "./address.dto";
import { Role } from "@prisma/client"

export class PilotDto {
  @IsEmail()
  @ApiProperty()
  email: string

  @ApiProperty()
  @IsStrongPassword({minLength: 6})
  password: string

  @ApiProperty({ enum: [Role.CUSTOMER, Role.PILOT]})
  role: Role

  @ApiProperty( { example: 'Juan' })
  @IsString()
  @IsNotEmpty({ message: 'El Nombre es requerido'})
  name: string;

  @ApiProperty( { example: 'Perez' })
  @IsString()
  @IsNotEmpty({ message: 'El Apellido es requerido'})
  lastName: string;

  @ApiProperty( { example: '12345678' })
  @IsString()
  dni?: string;

  @ApiProperty( { example: '12345678' })
  @IsString()
  @IsNotEmpty({ message: 'El Telefono es requerido'})
  phone: string;

  @ApiProperty({ type: AddressDto })
  @IsNotEmpty({ message: 'La dirección es requerida' }) // Asegura que la dirección no esté vacía
  @ValidateNested() // Realiza validaciones anidadas
  @Type(() => AddressDto) // Indica el tipo del objeto AddressDto
  address: AddressDto;

}
