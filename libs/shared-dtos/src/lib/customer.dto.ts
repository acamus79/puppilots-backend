import { ApiProperty } from "@nestjs/swagger"
import {  IsEmpty, IsUUID } from "class-validator"
import { AddressDto } from "./address.dto"
import { PuppetDto } from "./puppet.dto"

export class CustomerDto {

  @ApiProperty()
  id?: string

  @ApiProperty()
  name: string

  @ApiProperty()
  lastname: string

  @ApiProperty()
  dni: string

  @ApiProperty()
  @IsUUID()
  userId: string

  @ApiProperty()
  phone: string

  @ApiProperty({ type: AddressDto})
  address?: AddressDto

  @ApiProperty({type: PuppetDto})
  puppets: PuppetDto[]
}
