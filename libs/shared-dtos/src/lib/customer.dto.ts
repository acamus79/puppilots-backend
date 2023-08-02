import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsUUID } from "class-validator"
import { AddressDto } from "./address.dto"
import { PuppetDto } from "./puppet.dto"

export class CustomerDto {
  @ApiProperty()
  name: string

  @ApiProperty()
  lastname: string

  @ApiProperty()
  dni: string

  @ApiProperty()
  phone: string
 // userId: string
  @ApiProperty()
  @IsUUID()
  addressId?: string

  @ApiProperty({ type: AddressDto})
  address?: AddressDto

  @ApiProperty({type: PuppetDto})
  puppets: PuppetDto[]
}
