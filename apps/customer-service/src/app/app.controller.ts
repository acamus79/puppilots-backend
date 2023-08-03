import { Body, Controller, Get } from '@nestjs/common';
import {  MessagePattern } from '@nestjs/microservices';
import { UserLoginDto } from '@puppilots/shared-dtos';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern({cmd: "create-user-customer"})
  async createUser(@Body() user: UserLoginDto){
   return await this.appService.createUser(user);
  }
}
