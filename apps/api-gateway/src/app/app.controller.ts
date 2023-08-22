import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UserLoginDto, VerifyTokenDto } from '@puppilots/shared-dtos';
import { ApiExtraModels } from '@nestjs/swagger';
import { UserPayload } from '@prisma/client';


@Controller("auth")
@ApiExtraModels(UserLoginDto, VerifyTokenDto)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post("login")
  async login(@Body() userLogin: UserLoginDto): Promise<unknown> {
    return await this.appService.login(userLogin);
  }

  @Post("verify-token")
  async verifyToken(@Body() token: VerifyTokenDto): Promise<UserPayload> {
    return await this.appService.verifyToken(token);
  }

}
