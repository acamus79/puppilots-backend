import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@puppilots/shared-services';
import { Address, Pilot, Role, User } from '@prisma/client';
import { CommonUserDto, PilotDto } from '@puppilots/shared-dtos';
import { UserExistException, UserNotExistException } from '@puppilots/shared-exceptions';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  // Se importa el servicio de prisma
  constructor(private prismaService: PrismaService) {}

  // Se crea un metodo getData que retorna un objeto con un mensaje
  getData(): { message: string } {
    return { message: 'Hello Pilot API' };
  }
  /**
   * Async method to create a user and pilot
   * @param userNew
   * @returns
   */
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

  /**
   * Async method to get a user and pilot by id
   * @param id
   * @returns CommonUserDto
   */
  async getUserAndPilotById(id: string): Promise<CommonUserDto> {
    // Se busca un usuario por id
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: { id: id },
    });

    const pilot = await this.findPilotOrFail(id);

    // Si el usuario o el pilot no existe se lanza una excepcion
    if (!pilot || !user) {
      throw new NotFoundException();
    }
    // Se retorna un objeto de tipo CommonUserDto
    return this.mapToCommonUserDto(user, pilot, pilot.address);
  }
  /**
   * Async method to update a pilot
   * @param pilotUpdate
   * @returns CommonUserDto
   */
  async udpdate(pilotUpdate: CommonUserDto) : Promise<CommonUserDto>{

    const user = await this.prismaService.user.findUnique({
      where: { id : pilotUpdate['patch']['userId'] }
    });

    const pilot = await this.findPilotOrFail(pilotUpdate['patch']['userId']);

    const pilotModified = await this.prismaService.pilot.update({
      where: {
        id: pilot.id,
      },
      data: {
        name: pilotUpdate['patch'].name,
        lastName: pilotUpdate['patch'].lastName,
        dni: pilotUpdate['patch'].dni,
        phone: pilotUpdate['patch'].phone,
        address: {
          update: {
            country: pilotUpdate['patch']['address'].country,
            city: pilotUpdate['patch'].address.city,
            street: pilotUpdate['patch'].address.street,
            number: pilotUpdate['patch'].address.number,
            floor: pilotUpdate['patch'].address.floor,
            department: pilotUpdate['patch'].address.department,
            latitude: pilotUpdate['patch'].address.latitude,
            longitude: pilotUpdate['patch'].address.latitude,
            references: pilotUpdate['patch'].address.references
          }
        }
      },
    });
    return this.mapToCommonUserDto(user, pilotModified, await this.prismaService.address.findUnique({ where: { id: pilotModified.addressId }}));
  }
  /**
   * Private method to find a pilot by userId
   * @param userId
   * @returns Pilot
   */
  private async findPilotOrFail(userId: string) {
    const pilot = await this.prismaService.pilot.findFirst({
      where: { userId },
      include: { address: true },
    });

    if (!pilot) {
      throw new UserNotExistException();
    }

    return pilot;
  }
  /**
   * Private method to map a user and pilot to a CommonUserDto
   * @param user
   * @param pilot
   * @param address
   * @returns CommonUserDto
   */
  private mapToCommonUserDto(user: User, pilot?: Pilot, address?:Address): CommonUserDto {
    return {
      userId: user.id,
      id: pilot?.id,
      role: user.role,
      email: user.email,
      name: pilot?.name || '',
      lastName: pilot?.lastName || '',
      dni: pilot?.dni || '',
      phone: pilot?.phone || '',
      address: {
        country: address?.country || '',
        city: address?.city || '',
        street: address?.street || '',
        number: address?.number || '',
        floor: address?.floor || '',
        department: address?.department || '',
        latitude: address?.latitude || '',
        longitude: address?.longitude || '',
        references: address?.references || '',
      },
    };
  }

}
