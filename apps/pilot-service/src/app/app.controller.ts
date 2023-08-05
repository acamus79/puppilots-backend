import { Body, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { PilotDto } from '@puppilots/shared-dtos';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern({ cmd: 'create-user-and-pilot' })
  async createUserAndPilot(@Body() client: PilotDto) {
    try {
      return await this.appService.createUserAndPilot(client);
    } catch (error) {
      console.log(error);
      throw new RpcException({message: error.message, code: 400});
    }
  }
}
