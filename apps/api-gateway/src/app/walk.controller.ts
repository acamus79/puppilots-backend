import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RolesGuard } from './guards/roles.guard';
import { WalkService } from './walk.service';
import { Roles } from './decorators/roles.decorator';
import { Role, Walks } from '@prisma/client';
import { UserId } from './decorators/user-id.decorator';
import { AceptPilotDto, WalkDto } from '@puppilots/shared-dtos';

@UseGuards(RolesGuard)
@Controller('walk')
export class WalkController {

  constructor(private readonly walkService: WalkService) {}

  @Roles(Role.CUSTOMER)
  @Post()
  async createWalk(
    @Body() walkDto: WalkDto,
    @UserId() userId: string
  ): Promise<Walks> {
    return await this.walkService.createWalk(walkDto, userId);
  }


  @Roles(Role.PILOT)
  @Get('postulate/:id')
  async postulateWalk(
    @Param('id') walkId: string,
    @UserId() userId: string
  ): Promise<Walks> {
    return await this.walkService.postulateWalk(walkId, userId);
  }

  @Roles(Role.CUSTOMER)
  @Post('acept-pilot')
  async acept(
    @Body() aceptPilotDto: AceptPilotDto,
    @UserId() userId: string
  ): Promise<Walks> {
    return await this.walkService.aceptPilot(aceptPilotDto, userId);
  }
}
