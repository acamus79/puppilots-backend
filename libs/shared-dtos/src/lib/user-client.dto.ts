import { ApiProperty } from "@nestjs/swagger"
import { Role } from "@prisma/client"
import { IsEmail, IsStrongPassword } from "class-validator"
import { CustomerDto } from "./customer.dto"
import { PilotDto } from "./pilot.dto"


export class UserClientDto<T extends CustomerDto | PilotDto> {
  @IsEmail()
  @ApiProperty()
  email: string

  @ApiProperty()
  @IsStrongPassword({minLength: 6})
  password: string

  @ApiProperty({ enum: [Role.CUSTOMER, Role.PILOT]})
  role: Role

  @ApiProperty()
  client: T
}

