import { ApiProperty } from "@nestjs/swagger";
import { CityDto } from "./city.dto";
import { Type } from 'class-transformer';

export class CountryDto {

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: CityDto, isArray: true })
  @Type(() => CityDto)
  cities: CityDto[];

}
