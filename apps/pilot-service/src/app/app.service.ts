import { Injectable } from '@nestjs/common';
import { PrismaService } from '@puppilots/shared-services';
import { Role } from '@prisma/client';
import { UserClientDto, PilotDto } from '@puppilots/shared-dtos';
import { UserExistException } from '@puppilots/shared-exceptions';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  // Se importa el servicio de prisma
  constructor(private prismaService: PrismaService) {}

  // Se crea un metodo getData que retorna un objeto con un mensaje
  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  // Se crea un metodo createUserAndPilot que recibe un objeto de tipo UserClientDto<PilotDto>
  // y retorna un objeto de tipo UserAndPilotDto
  async createUserAndPilot(userNew: UserClientDto<PilotDto>) {
    // Se busca un usuario por email
    const userExist = await this.prismaService.user.findUnique({
      where: { email: userNew.email },
    });
    // Si el usuario existe y su rol es PILOT se lanza una excepcion
    if (userExist) {
      throw new UserExistException();
    }

    // Se crea un usuario y se retorna un objeto de tipo UserAndPilotDto
    const userAndPilot = await this.prismaService.user.create({
      data: {
        email: userNew.email,
        password: await bcrypt.hash(userNew.password, 10),
        role: Role.PILOT,
        pilot: {
          create: [
            {
              name: userNew.client.name,
              lastName: userNew.client.lastName,
              dni: userNew.client.dni,
              phone: userNew.client.phone,
              address: {
                create: {
                  country: userNew.client.address.country,
                  city: userNew.client.address.city,
                  street: userNew.client.address.street,
                  number: userNew.client.address.number,
                  floor: userNew.client.address.floor,
                  department: userNew.client.address.department,
                  latitude: userNew.client.address.latitude,
                  longitude: userNew.client.address.longitude,
                },
              },
            },
          ],
        },
      },
    });

    // Se retorna un objeto de tipo UserAndPilotDto omitiendo el password
    const { password, ...userCreated } = userAndPilot;
    return userCreated;
  }
}
