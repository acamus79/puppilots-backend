import { Body, Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CustomerDto, UserClientDto } from '@puppilots/shared-dtos';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern({cmd: "create-user-and-customer"})
  async createUserAndCustomer(@Body() client: UserClientDto<CustomerDto>){
    return await this.appService.createUserAndCustomer(client);
  }
}
