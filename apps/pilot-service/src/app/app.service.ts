import { Injectable } from '@nestjs/common';
import { PrismaService } from '@puppilots/shared-services';
import { Role } from '@prisma/client';
import { PilotDto } from '@puppilots/shared-dtos';
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

  async createUserAndPilot(userNew: PilotDto) {
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
              name: userNew.name,
              lastName: userNew.lastName,
              dni: userNew.dni,
              phone: userNew.phone,
              address: {
                create: {
                  country: userNew.address.country,
                  city: userNew.address.city,
                  street: userNew.address.street,
                  number: userNew.address.number,
                  floor: userNew.address.floor,
                  department: userNew.address.department,
                  latitude: userNew.address.latitude,
                  longitude: userNew.address.longitude,
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
