import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomerDto, UserLoginDto } from '@puppilots/shared-dtos';
import { ApiExtraModels } from '@nestjs/swagger';


@Controller()
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

}
