import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RolesGuard } from './guards/roles.guard';
import { WalkService } from './walk.service';
import { Roles } from './decorators/roles.decorator';
import { Role, Walks } from '@prisma/client';
import { UserId } from './decorators/user-id.decorator';
import { AceptPilotDto, WalkDto, WalkIdDto } from '@puppilots/shared-dtos';

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
  @Post('postulate')
  async postulateWalk(
    @Body() walk: WalkIdDto,
    @UserId() userId: string
  ): Promise<Walks> {
    return await this.walkService.postulateWalk(walk.walkId, userId);
  }

/*   @Roles(Role.CUSTOMER)
  @Post('acept-pilot')
  async acept(
    @Body() aceptPilotDto: AceptPilotDto,
    @UserId() userId: string
  ): Promise<Walks> {
    return await this.walkService.aceptPilot(aceptPilotDto, userId);
  } */

  @Roles(Role.PILOT)
  @Get('per-pilot-active')
  async findWalksPerPilotNotFinished(
    @UserId() userId: string
  ): Promise<Walks[]> {
    return await this.walkService.getWalksPerPilot(userId);
  }

  @Roles(Role.PILOT)
  @Get('city/:city')
  async findWalksPerCityActive(
    @UserId() userId: string,
    @Param('city') city: string
  ): Promise<Walks[]> {
    return await this.walkService.findWalksPerCityActive(city);
  }

  @Roles(Role.PILOT)
  @Get('offer')
  async findWalksOfferPerPilot(
    @UserId() userId: string
  ): Promise<Walks[]> {
    return await this.walkService.findWalksOfferPerPilot(userId);
  }
}
