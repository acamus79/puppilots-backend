import { Injectable, Logger } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from '@puppilots/shared-services';
import * as bcrypt from 'bcrypt';
import { CommonUserDto, CustomerDto, UserLoginDto } from '@puppilots/shared-dtos'
import { UserExistException, UserNotExistException } from '@puppilots/shared-exceptions'

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

    delete user.password;
    delete user.tokenResetPassword;
    delete user.emailConfirmed;
    
    return user;
  }

  async create(customer: CustomerDto) {
    const user = await this.prismaService.user.findUnique({
      where: { id: customer.userId }
    });

    if(user == null){
      throw new UserNotExistException();
    }

    const customerExist = await this.prismaService.costumer.findFirst({
      where: { userId: customer.userId }
    });

    if(customerExist) {
      throw new UserExistException();
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

  async getUserAndCustomerById(id: string){
    Logger.log("Llamando a getUserAndCustomerById del service");
    Logger.log(id);

    const user = await this.prismaService.user.findUnique({
      where: { id: id }
    });

    const customer = await this.prismaService.costumer.findFirst({
      where: { userId: id },
      include: { address: true },
    });

    if (!customer || !user) {
      throw new UserNotExistException();
    }

    const commonUserDto: CommonUserDto = {
      userId: user.id,
      role: user.role,
      email: user.email,
      name: customer?.name || '',
      lastName: customer?.lastName || '',
      dni: customer?.dni || '',
      phone: customer?.phone || '',
      address: {
        country: customer?.address?.country || '',
        city: customer?.address?.city || '',
        street: customer?.address?.street || '',
        number: customer?.address?.number || '',
        floor: customer?.address?.floor || '',
        department: customer?.address?.department || '',
        latitude: customer?.address?.latitude || '',
        longitude: customer?.address?.longitude || '',
        references: customer?.address?.references || '',
      },
    };

    return commonUserDto;
  }


  async udpdate(customerUpdate: CustomerDto){
    const customer = await this.prismaService.costumer.findUnique({
      where: {
        id: customerUpdate.id
      }});

    if (customer == null) {
      throw new UserNotExistException();
    }

    const customerModified = await this.prismaService.costumer.update({
      where: {
        id: customer.id,
      },
      data: {
        name: customerUpdate.name,
        lastName: customerUpdate.lastname,
        dni: customerUpdate.dni,
        phone: customerUpdate.phone,
        address: {
          update: {
            country: customerUpdate.address.country,
            city: customerUpdate.address.city,
            street: customerUpdate.address.street,
            number: customerUpdate.address.number,
            floor: customerUpdate.address.floor,
            department: customerUpdate.address.department,
            latitude: customerUpdate.address.latitude,
            longitude: customerUpdate.address.latitude,
            references: customerUpdate.address.references
          }
        }
      },
    });

    return customerModified;
  }

}
