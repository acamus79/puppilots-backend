import { Body, Controller, Get } from '@nestjs/common';
import {  MessagePattern } from '@nestjs/microservices';
import { CustomerDto, UserLoginDto } from '@puppilots/shared-dtos';

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

  @MessagePattern({cmd: "create-customer"})
  async create(@Body() customer: CustomerDto){
    return await this.appService.create(customer);
  }

  @MessagePattern({cmd: "update-customer"})
  async update(@Body() customer: CustomerDto){
    return await this.appService.udpdate(customer);
  }

}
