import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { EventEmitter } from 'stream';

import { AppService } from './app.service';
import { UserRegisterEvent } from '@puppilots/shared-dtos';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @EventPattern("register")
  async handleRegister(data: UserRegisterEvent){
    await this.appService.sendEmailOfRegister(data);
  }
}
