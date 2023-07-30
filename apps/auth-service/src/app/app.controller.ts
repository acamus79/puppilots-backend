import { Body, Controller, Get } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { AppService } from './app.service';
import { UserLoginDto } from '@puppilots/shared-dtos';
import { InvalidCredentialsException } from '@puppilots/shared-exceptions'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern({cmd: "login"})
  async handleLogin(@Body() userLogin: UserLoginDto){
    const user = await this.appService.validateUser(userLogin);
    if(!user) {
      throw new InvalidCredentialsException(); // Lanzar una excepción con mensaje y código de error
    }

    return this.appService.login(user);
  }
}
