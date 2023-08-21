import { Body, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { CommonUserDto, PilotDto } from '@puppilots/shared-dtos';

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

  @MessagePattern({ cmd: 'get-pilot' })
  async getPilots(@Body() id: string) {
    try {
      return await this.appService.getUserAndPilotById(id);
    } catch (error) {
      console.log(error);
      throw new RpcException({message: error.message, code: 400});
    }
  }

  @MessagePattern({ cmd: 'update-pilot' })
  async updatePilot(@Body() pilot: CommonUserDto) {
    try {
      return await this.appService.udpdate(pilot);
    }
    catch (error) {
      console.log(error);
      throw new RpcException({message: error.message, code: 400});
    }
  }

}
