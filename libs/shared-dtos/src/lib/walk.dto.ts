import { ApiProperty } from "@nestjs/swagger"
import { IsDateString, IsNotEmpty, IsString } from "class-validator"

export class WalkDto {

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty({ message: 'La fecha de início es equerida' })
  beginDate: Date

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty({ message: 'La fecha de fin es requerida' })
  endDate: Date

  @ApiProperty()
  @IsString()
  observations: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'El identificador de la Mascota es requerido' })
  puppetId: string

  @ApiProperty()
  pilotId?: string
}
