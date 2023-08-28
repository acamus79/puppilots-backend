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
import { ApiOperation } from '@nestjs/swagger';

@Controller('pilot')
@UseGuards(RolesGuard)
export class PilotController {
  constructor(private appService: PilotService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new pilot',
                  description: 'Returns a token of type JWT, to authenticate in the application.'})
  async createUserAndPilot(@Body(new ValidationPipe()) userNew: PilotDto) {
    return await this.appService.createUserAndPilot(userNew);
  }

  @Get(':id')
  @Roles(Role.PILOT, Role.CUSTOMER)
  @ApiOperation({ summary: 'Get a pilot by id',
                  description: 'Returns a data transfer object with the record'})
  async getUserAndPilotById(@Param('id') userId: string): Promise<CommonUserDto | null> {
    return await this.appService.getUserAndPilotById(userId);
  }

  @Patch(':id')
  @Roles(Role.PILOT)
  @ApiOperation({ summary: 'Update a pilot',
                  description: 'Returns a data transfer object with the updated record'})
  async updateUserAndPilotById(
    @Param('id') userId: string,
    @Body() updatePilot: CommonUserDto): Promise<CommonUserDto | null> {
    return await this.appService.updateUserAndPilotById(userId, updatePilot);
  }

}
