import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy, ClientTCP } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable()
export class AppService {

  constructor(@Inject("EMAIL") private emailClient: ClientProxy) {}


  async login(email: string){
    this.emailClient.emit("login", {});

  }

  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
