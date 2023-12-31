import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CustomerDto, UserLoginDto, UserRegisterEvent } from '@puppilots/shared-dtos';
import { firstValueFrom } from 'rxjs';
import { AppService } from '../app/app.service';
import { Role } from '@prisma/client';

@Injectable()
export class CustomerService {

  constructor(@Inject("CUSTOMER") private customerClient: ClientProxy,
              @Inject("EMAIL") private emailClient: ClientProxy,
              private authService: AppService){}

  async createUser(userNew: UserLoginDto) {
    try {
      const result = this.customerClient.send({ cmd: "create-user-customer" }, userNew);
      await firstValueFrom(result);
      this.emailClient.emit('register', new UserRegisterEvent(userNew.email, Role.CUSTOMER));
      return await this.authService.login({ email: userNew.email, password: userNew.password});
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  async create(customer: CustomerDto) {
    try {
      const result = await this.customerClient.send({cmd: "create-customer"}, customer);

      return await firstValueFrom(result);
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  async update(customer: CustomerDto){
    try {
      const result = await this.customerClient.send({cmd: "update-customer"}, customer);

      return await firstValueFrom(result);
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }
}
