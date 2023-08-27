import { Controller, Get } from '@nestjs/common';
import { CountryService } from '../services/country.service';
import { BreedService } from '../services/breed.service';
import { ApiExtraModels, ApiOperation } from '@nestjs/swagger';
import { CountryDto, BreedDto } from '@puppilots/shared-dtos';


@Controller('parameters')
@ApiExtraModels(CountryDto, BreedDto)
export class ParamertersController {
  constructor(
    private readonly countryService: CountryService,
    private readonly breedService: BreedService
    ){}

 /**
  * Esto es una prueba
  * @returns  List of all countries with their cities
  */
  @Get('country')
  @ApiOperation({ summary: 'Gets all countries',
                  description: 'Returns a list of all countries with their cities'
  })
  async findAll(){
    return await this.countryService.findAll();
  }

  @Get('breed')
  @ApiOperation({ summary: 'Gets all dog breeds' })
  async findAllBreeds(){
    return await this.breedService.findAll();
  }

}
