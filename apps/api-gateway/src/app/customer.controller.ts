import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { CustomerDto, UserLoginDto } from '@puppilots/shared-dtos';
import { CustomerService } from './customer.service';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('customer')
@UseGuards(RolesGuard)
export class CustomerController {
  constructor(private readonly appService: CustomerService){}

  @Post("register")
  async createUser(@Body() userNew: UserLoginDto){
    return await this.appService.createUser(userNew);
  }

  @Put()
  @Roles(Role.CUSTOMER)
  async update(@Body() customer: CustomerDto){
    return await this.appService.update(customer);
  }
  
}
