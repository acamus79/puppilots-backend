import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomerDto, UserClientDto, UserLoginDto, VerifyTokenDto } from '@puppilots/shared-dtos';
import { ApiExtraModels } from '@nestjs/swagger';


@Controller("auth")
@ApiExtraModels(CustomerDto)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post("login")
  async login(@Body() userLogin: UserLoginDto): Promise<unknown>{
    return await this.appService.login(userLogin);
  }

  @Post("verify-token")
  async verifyToken(@Body() token: VerifyTokenDto): Promise<any> {
    return await this.appService.verifyToken(token);
  }

  @Post("customer")
  async createUserAndCustomer(@Body() userNew: UserClientDto<CustomerDto>){
   return await this.appService.createUserAndCustomer(userNew);
  }
}
