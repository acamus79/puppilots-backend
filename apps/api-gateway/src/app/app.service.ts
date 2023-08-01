import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserLoginDto } from '@puppilots/shared-dtos';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {

  constructor(@Inject("EMAIL") private emailClient: ClientProxy,
              @Inject("AUTH") private authClient: ClientProxy,
              @Inject("CUSTOMER") private customerClient: ClientProxy) {}


  async login(userLogin: UserLoginDto){
    this.emailClient.emit("login", {});
    const response = this.authClient.send({ cmd: "login"}, userLogin);
    return firstValueFrom(response);
  }

  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
