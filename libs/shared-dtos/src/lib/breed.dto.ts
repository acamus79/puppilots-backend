import { ApiProperty } from "@nestjs/swagger";

export class BreedDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

}
