import { Injectable } from '@nestjs/common';
import { BreedDto } from '@puppilots/shared-dtos';
import { PrismaService } from '@puppilots/shared-services';


@Injectable()
export class BreedService {

  constructor(private prismaService: PrismaService) {}

  async findAll(): Promise<BreedDto[]> {

    const breeds = await this.prismaService.breed.findMany(
      {
        orderBy: {
          id: 'asc'
        },
      }
    );

    return breeds.map(breed => {
      return {
        id: breed.id,
        name: breed.name,
      }
    });
  }
}
