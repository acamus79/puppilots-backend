import { ApiProperty } from "@nestjs/swagger";
import { Sex, Size } from "@prisma/client";
import { IsNotEmpty, IsUUID } from "class-validator";
export class PuppetDto {
  @ApiProperty()
  @IsNotEmpty({message: 'El nombre es requerido'})
  name: string

  @ApiProperty()
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
