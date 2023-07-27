import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {

  constructor(@Inject("EMAIL") private emailClient: ClientProxy,
              @Inject("AUTH") private authClient: ClientProxy) {}


  async login(email: string){
    this.emailClient.emit("login", {});
    const response = this.authClient.send({ cmd: "login"}, email);
    return firstValueFrom(response);
  }

  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
