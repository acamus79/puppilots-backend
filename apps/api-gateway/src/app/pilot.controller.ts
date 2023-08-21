import {
  Body,
  Controller,
  Get,
  Post,
  ValidationPipe,
  Param,
  Patch,
} from '@nestjs/common';
import { PilotDto, CommonUserDto } from '@puppilots/shared-dtos';
import { PilotService } from './pilot.service';

@Controller('pilot')
export class PilotController {
  constructor(private appService: PilotService) {}

  @Post('register')
  async createUserAndPilot(@Body(new ValidationPipe()) userNew: PilotDto) {
    return await this.appService.createUserAndPilot(userNew);
  }

  @Get(':id')
  async getUserAndPilotById(@Param('id') userId: string): Promise<CommonUserDto | null> {
    return await this.appService.getUserAndPilotById(userId);
  }

  @Patch(':id')
  async updateUserAndPilotById(
    @Param('id') userId: string,
    @Body() updatePilot: CommonUserDto): Promise<CommonUserDto | null> {
    return await this.appService.updateUserAndPilotById(userId, updatePilot);
  }

}
