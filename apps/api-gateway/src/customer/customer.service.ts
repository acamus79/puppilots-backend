import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserLoginDto } from '@puppilots/shared-dtos';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CustomerService {
  constructor(@Inject("CUSTOMER") private customerClient: ClientProxy){}

  async createUser(userNew: UserLoginDto) {
    try {
      const result = await this.customerClient.send({ cmd: "create-user-customer"}, userNew);
      return await firstValueFrom(result);
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }
}
