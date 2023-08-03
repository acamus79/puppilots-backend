import { Body, Controller, Post } from '@nestjs/common';
import { PilotDto, UserClientDto } from '@puppilots/shared-dtos';
import { PilotService } from './pilot.service';

@Controller('pilot')
export class PilotController {

  constructor(private appService: PilotService){}

  @Post('register')
  async createUserAndPilot(@Body() userNew: UserClientDto<PilotDto>) {
    return await this.appService.createUserAndPilot(userNew);
  }
}
