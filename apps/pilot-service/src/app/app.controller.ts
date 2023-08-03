import { Body, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { UserClientDto, PilotDto } from '@puppilots/shared-dtos';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern({ cmd: 'create-user-and-pilot' })
  async createUserAndPilot(@Body() client: UserClientDto<PilotDto>) {
    console.log("Controlador de piloto");
    try {
      return await this.appService.createUserAndPilot(client);
    } catch (error) {
      throw new RpcException({message: error.message, code: 403});
    }
  }
}
