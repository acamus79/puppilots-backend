import {
  Body,
  Controller,
  Get,
  Post,
  ValidationPipe,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { PilotDto, CommonUserDto } from '@puppilots/shared-dtos';
import { PilotService } from '../services/pilot.service';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('pilot')
@UseGuards(RolesGuard)
export class PilotController {
  constructor(private appService: PilotService) {}

  @Post('register')
  async createUserAndPilot(@Body(new ValidationPipe()) userNew: PilotDto) {
    return await this.appService.createUserAndPilot(userNew);
  }

  @Get(':id')
  @Roles(Role.PILOT, Role.CUSTOMER)
  async getUserAndPilotById(@Param('id') userId: string): Promise<CommonUserDto | null> {
    return await this.appService.getUserAndPilotById(userId);
  }

  @Patch(':id')
  @Roles(Role.PILOT)
  async updateUserAndPilotById(
    @Param('id') userId: string,
    @Body() updatePilot: CommonUserDto): Promise<CommonUserDto | null> {
    return await this.appService.updateUserAndPilotById(userId, updatePilot);
  }

}
