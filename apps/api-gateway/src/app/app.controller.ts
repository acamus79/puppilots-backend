import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UserLoginDto } from '@puppilots/shared-dtos';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post("login")
  async login(@Body() userLogin: UserLoginDto): Promise<any>{
    return this.appService.login(userLogin);
  }
}
