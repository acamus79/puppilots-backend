import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { AppService } from './app.service';
import {
  CustomerDto,
  PilotDto,
  UserClientDto,
  UserLoginDto,
} from '@puppilots/shared-dtos';
import { ApiExtraModels } from '@nestjs/swagger';

@ApiExtraModels(CustomerDto, PilotDto, UserClientDto, UserLoginDto)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post('login')
  async login(@Body() userLogin: UserLoginDto): Promise<unknown> {
    console.log('Controlador de login');
    return await this.appService.login(userLogin);
  }

  @Post('customer')
  async createUserAndCustomer(@Body() userNew: UserClientDto<CustomerDto>) {
    return await this.appService.createUserAndCustomer(userNew);
  }

  @Post('pilot')
  async createUserAndPilot(@Body() userNew: UserClientDto<PilotDto>) {
    console.log('Controlador de piloto en el Gateway');
    return await this.appService.createUserAndPilot(userNew);
  }
}
