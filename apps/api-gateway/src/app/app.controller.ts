import { Headers, Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { UserLoginDto, VerifyTokenDto } from '@puppilots/shared-dtos';
import { ApiExtraModels } from '@nestjs/swagger';
import { Role, UserPayload } from '@prisma/client';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';


@Controller("auth")
@ApiExtraModels(UserLoginDto, VerifyTokenDto)
@UseGuards(RolesGuard)
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

  @Post("verify")
  @Roles(Role.CUSTOMER, Role.PILOT)
  async verify(@Headers('authorization') authHeader: string): Promise<UserPayload> {
    const verifyTokenDto = new VerifyTokenDto();
    verifyTokenDto.token = authHeader.replace('Bearer ', '' );;
    return await this.appService.verifyToken(verifyTokenDto);
  }


}
