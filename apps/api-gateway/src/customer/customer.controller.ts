import { Body, Controller, Post } from '@nestjs/common';
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
  async createCustomer(@Body() customer: CustomerDto){
    return await this.appService.create(customer);
  }
}
