import { Injectable, Logger } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from '@puppilots/shared-services';
import * as bcrypt from 'bcrypt';
import { CustomerDto, UserLoginDto } from '@puppilots/shared-dtos'
import { UserExistException, UserNotExistException } from '@puppilots/shared-exceptions'
import { User } from '@prisma/client'

@Injectable()
export class AppService {

  constructor(private prismaService: PrismaService){}

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async createUser(userNew: UserLoginDto){
    const userExist = await this.prismaService.user.findUnique({
      where: { email: userNew.email }
    });

    if(userExist != null){
      throw new UserExistException();
    }

    const user = await this.prismaService.user.create({
      data: {
        email: userNew.email,
        password: await bcrypt.hash(userNew.password,10),
        role: Role.CUSTOMER,
      },
    });

    const {password, tokenResetPassword, emailConfirmed, ...userCreated} = user;

    return userCreated;
  }

  async create(customer: CustomerDto) {
    const user = await this.prismaService.user.findUnique({
      where: { id: customer.userId }
    });

    if(user == null){
      throw new UserNotExistException();
    }

    const newCustomer = await this.prismaService.costumer.create({
      data: {
        name: customer.name,
        lastName: customer.lastname,
        dni: customer.dni,
        phone: customer.phone,
        user: {
          connect: {
           id: user.id
          },
        },
        address: {
          create: {
            country: customer.address.country,
            city: customer.address.city,
            street: customer.address.street,
            number: customer.address.number,
            floor: customer.address.floor,
            department: customer.address.department,
            latitude: customer.address.latitude,
            longitude: customer.address.latitude,
            references: customer.address.references,
          },
        },
      },
    });

    return newCustomer;
  }
}
