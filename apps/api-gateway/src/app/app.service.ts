import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CustomerDto, PilotDto, UserClientDto, UserLoginDto } from '@puppilots/shared-dtos';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {

  constructor(@Inject("EMAIL") private emailClient: ClientProxy,
              @Inject("AUTH") private authClient: ClientProxy,
              @Inject("CUSTOMER") private customerClient: ClientProxy,
              @Inject("PILOT") private pilotClient: ClientProxy,
              @Inject("WALK") private walkClient: ClientProxy) {}


  async login(userLogin: UserLoginDto){
    this.emailClient.emit("login", {});
    try {
      const response = this.authClient.send({ cmd: "login" }, userLogin);
      return await firstValueFrom(response);
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  async createUserAndCustomer(userNew: UserClientDto<CustomerDto>) {
    try {
      const result = await this.customerClient.send({ cmd: "create-user-and-customer"}, userNew);
      return await firstValueFrom(result);
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  async createUserAndPilot(userNew: UserClientDto<PilotDto>) {
    console.log("Servicio de piloto en el Gateway");
    try {
      const result = await this.pilotClient.send({ cmd: "create-user-and-pilot"}, userNew);
      return await firstValueFrom(result);
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
