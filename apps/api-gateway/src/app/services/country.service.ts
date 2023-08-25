import { Injectable } from '@nestjs/common';
import { CountryDto } from '@puppilots/shared-dtos';
import { PrismaService } from '@puppilots/shared-services';


@Injectable()
export class CountryService {

  constructor(private prismaService: PrismaService) {}

  async findAll(): Promise<CountryDto[]> {

    const countries = await this.prismaService.country.findMany(
      {
        include: {
          cities: true
        },
        orderBy: {
          id: 'asc'
        },
      }
    );

    return countries.map(country => {
      return {
        id: country.id,
        name: country.name,
        cities: country.cities.map(city => {
          return {
            id: city.id,
            name: city.name
          }
        })
      }
    });
  }

}
