import { Body, Controller, Get, HttpException, Logger, Post, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { UserLoginDto } from '@puppilots/shared-dtos';
import { RpcException } from '@nestjs/microservices';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post("login")
  async login(@Body() userLogin: UserLoginDto): Promise<any>{
      return await this.appService.login(userLogin);
  }
}
