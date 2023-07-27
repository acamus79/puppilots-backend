import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post("login")
  async login(@Body()email: string){
    return this.appService.login(email);
  }
}
