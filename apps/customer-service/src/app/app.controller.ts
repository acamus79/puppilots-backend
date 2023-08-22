import { Body, Controller, Get, Logger } from '@nestjs/common';
import {  MessagePattern, RpcException } from '@nestjs/microservices';
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

  @MessagePattern({cmd: "get-customer"})
  async getCustomer(@Body() id: string){
    try {
      Logger.log("Llamando a getCustomer del controller");
      Logger.log(id);
      return await this.appService.getUserAndCustomerById(id);
    } catch (error) {
      Logger.log("Error en getCustomer del controller");
      Logger.log(error);
      throw new RpcException({message: error.message, code: 400});
    }

  }

}
