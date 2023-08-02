import { Injectable, Logger } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from '@puppilots/shared-services';
import * as bcrypt from 'bcrypt';
import { UserClientDto, CustomerDto } from '@puppilots/shared-dtos'
import { UserExistException } from '@puppilots/shared-exceptions'

@Injectable()
export class AppService {

  constructor(private prismaService: PrismaService){}

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async createUserAndCustomer(userNew: UserClientDto<CustomerDto>){
    const userExist = await this.prismaService.user.findUnique({
      where: { email: userNew.email }
    });

    const customerExist = await this.prismaService.costumer.findFirst({
      where: { dni: userNew.client.dni }
    });

    if(userExist != null || customerExist != null){
      throw new UserExistException();
    }

    const userAndCustomer = await this.prismaService.user.create({
      data: {
        email: userNew.email,
        password: await bcrypt.hash(userNew.password,10),
        role: Role.CUSTOMER,
        costumer : {
          create: [
            {
              name: userNew.client.name,
              lastName: userNew.client.lastname,
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

    const {password, ...userCreated} = userAndCustomer;

    return userCreated;
  }

}
