import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserLoginDto } from '@puppilots/shared-dtos';
import { firstValueFrom } from 'rxjs';
import { AppService } from '../app/app.service';

@Injectable()
export class CustomerService {
  constructor(@Inject("CUSTOMER") private customerClient: ClientProxy,
              private authService: AppService){}

  async createUser(userNew: UserLoginDto) {
    try {
      const result = await this.customerClient.send({ cmd: "create-user-customer"}, userNew);
      const customer = await firstValueFrom(result);
      return await this.authService.login({ email: userNew.email, password: userNew.password});
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }
}
