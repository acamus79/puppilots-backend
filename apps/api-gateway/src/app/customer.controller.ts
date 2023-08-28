import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { CustomerDto, UserLoginDto } from '@puppilots/shared-dtos';
import { CustomerService } from './customer.service';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { Role } from '@prisma/client';
import { ApiOperation } from '@nestjs/swagger';

@Controller('customer')
@UseGuards(RolesGuard)
export class CustomerController {
  constructor(private readonly appService: CustomerService){}

  @Post("register")
  @ApiOperation({ summary: 'Register a new customer',
                  description: 'Returns a token of type JWT, to authenticate in the application.'})
  async createUser(@Body() userNew: UserLoginDto){
    return await this.appService.createUser(userNew);
  }

  @Put()
  @ApiOperation({ summary: 'Update a customer',
                  description: 'Returns a data transfer object with the updated record'})
  @Roles(Role.CUSTOMER)
  async update(@Body() customer: CustomerDto){
    return await this.appService.update(customer);
  }

}
