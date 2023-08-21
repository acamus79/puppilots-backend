import { Body, Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { UserLoginDto, VerifyTokenDto } from '@puppilots/shared-dtos';
import { InvalidCredentialsException } from '@puppilots/shared-exceptions'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern({ cmd: "login" })
  async handleLogin(@Body() userLogin: UserLoginDto) {
    const user = await this.appService.validateUser(userLogin);
    if (!user) {
      throw new InvalidCredentialsException(); // trigger a new exception with message and code
    }

    return this.appService.login(user);
  }

  @MessagePattern({ cmd: "verify-token" })
  async handleVerifyToken(@Body() token: VerifyTokenDto) {
    return await this.appService.verifyToken(token);
  }
}
