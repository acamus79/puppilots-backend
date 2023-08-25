import { Controller, Get } from '@nestjs/common';
import { CountryService } from '../services/country.service';
import { BreedService } from '../services/breed.service';
import { ApiExtraModels } from '@nestjs/swagger';
import { CountryDto, BreedDto } from '@puppilots/shared-dtos';


@Controller('parameters')
@ApiExtraModels(CountryDto, BreedDto)
export class ParamertersController {
  constructor(
    private readonly countryService: CountryService,
    private readonly breedService: BreedService
    ){}

  @Get('country')
  async findAll(){
    return await this.countryService.findAll();
  }

  @Get('breed')
  async findAllBreeds(){
    return await this.breedService.findAll();
  }

}
