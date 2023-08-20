import { ApiProperty } from "@nestjs/swagger";
import { Sex, Size } from "@prisma/client";
import { IsNotEmpty, IsUUID } from "class-validator";

/**
 * A data transfer object (DTO) used for transferring puppet data
 * between different parts of the application.
 */
export class PuppetDto {
  @ApiProperty()
  id?: string

  @ApiProperty()
  @IsNotEmpty({message: 'El nombre es requerido'})
  name: string

  @ApiProperty()
  @IsNotEmpty({message: 'Debe tener un Cliente asignado'})
  @IsUUID()
  customerId: string

  @ApiProperty({enum:[Size.MEDIUM, Size.BIG, Size.SMALL]})
  size: Size

  @ApiProperty()
  breed: string

  @ApiProperty({enum: [Sex.OTHER, Sex.FEMALE, Sex.MALE]})
  sex: Sex

  @ApiProperty()
  observations?: string

}
