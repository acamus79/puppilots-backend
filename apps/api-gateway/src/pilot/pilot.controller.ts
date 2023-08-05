import {
  Body,
  Controller,
  HttpException,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { PilotDto } from '@puppilots/shared-dtos';
import { PilotService } from './pilot.service';

@Controller('pilot')
export class PilotController {
  constructor(private appService: PilotService) {}

  @Post('register')
  async createUserAndPilot(@Body(new ValidationPipe()) userNew: PilotDto) {
    return await this.appService.createUserAndPilot(userNew);
  }
}
