import { Body, Controller, Post, Put } from '@nestjs/common';
import { CustomerDto, UserLoginDto } from '@puppilots/shared-dtos';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private readonly appService: CustomerService){}

  @Post("register")
  async createUser(@Body() userNew: UserLoginDto){
   return await this.appService.createUser(userNew);
  }

  @Post()
  async create(@Body() customer: CustomerDto){
    return await this.appService.create(customer);
  }

  @Put()
  async update(@Body() customer: CustomerDto){
    return await this.appService.update(customer);
  }

}
