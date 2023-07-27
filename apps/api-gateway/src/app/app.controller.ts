import { Body, Controller, Get, OnModuleInit, Post } from '@nestjs/common';
import { ClientProxy, ClientTCP } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { UserDto } from '../userDto';

import { AppService } from './app.service';


@Controller()
export class AppController implements OnModuleInit{
  private authClient: ClientProxy;
  constructor(private readonly appService: AppService) {}

  async onModuleInit() {
    this.authClient = new ClientTCP({
      host: "localhost" ,
      port:  3001
    });
    await this.authClient.connect();
  }

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post("login")
  async login(@Body()email: UserDto){
    this.appService.login("email");
    const response = this.authClient.send({ cmd: "login"}, email.email);
    return firstValueFrom(response);
  }
}
