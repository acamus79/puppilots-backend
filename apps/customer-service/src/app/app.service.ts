import { Injectable, Logger } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from '@puppilots/shared-services';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from '@puppilots/shared-dtos'
import { UserExistException } from '@puppilots/shared-exceptions'

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

}
