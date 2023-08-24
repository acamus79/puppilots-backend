import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"


export class AceptPilotDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'El identificador del Paseador es requerido' })
  pilotId: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'El identificador del Paseo es requerido' })
  walkId: string
}