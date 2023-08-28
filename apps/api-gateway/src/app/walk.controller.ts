import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RolesGuard } from './guards/roles.guard';
import { WalkService } from './walk.service';
import { Roles } from './decorators/roles.decorator';
import { Role, Walks, WalksPilots } from '@prisma/client';
import { UserId } from './decorators/user-id.decorator';
import { WalkDto, WalkIdDto } from '@puppilots/shared-dtos';
import { ApiOperation } from '@nestjs/swagger';

@UseGuards(RolesGuard)
@Controller('walk')
export class WalkController {

  constructor(private readonly walkService: WalkService) {}

  @Roles(Role.CUSTOMER)
  @Post()
  @ApiOperation({ summary: 'Create an offer for a new walk',
                  description: 'Returns a data transfer object with the updated record'})
  async createWalk(
    @Body() walkDto: WalkDto,
    @UserId() userId: string
  ): Promise<Walks> {
    return await this.walkService.createWalk(walkDto, userId);
  }


  @Roles(Role.PILOT)
  @Post('postulate')
  @ApiOperation({ summary: 'Postulate to a walk',
                  description: 'Returns a data transfer object with the updated record'})
  async postulateWalk(
    @Body() walk: WalkIdDto,
    @UserId() userId: string
  ): Promise<Walks> {
    return await this.walkService.postulateWalk(walk.walkId, userId);
  }

  @Roles(Role.PILOT)
  @Get('per-pilot-active')
  @ApiOperation({ summary: 'Get walks per pilot active',
                  description: 'Returns a data transfer object with the updated record'})
  async findWalksPerPilotNotFinished(
    @UserId() userId: string
  ): Promise<Walks[]> {
    return await this.walkService.getWalksPerPilot(userId);
  }

  @Roles(Role.PILOT)
  @Get('city/:city')
  @ApiOperation({ summary: 'Gets a list of all the walks done in a city',
                  description: 'Returns a data transfer object with the updated record'})
  async findWalksPerCityActive(
    @Param('city') city: string
  ): Promise<Walks[]> {
    return await this.walkService.findWalksPerCityActive(city);
  }

  @Roles(Role.PILOT)
  @Get('offer')
  @ApiOperation({ summary: 'Obtain the walks offered according to the city of the authenticated pilot',
                  description: 'Returns a list of data transfer objects with the walks offered but not yet postulated'})
  async findWalksOfferPerPilot(
    @UserId() userId: string
  ): Promise<Walks[]> {
    return await this.walkService.findWalksOfferPerPilot(userId);
  }

  @Roles(Role.CUSTOMER)
  @Post('postulations')
  @ApiOperation({ summary: 'Applying for a walk offer from a pilot',
                  description: 'Returns a data transfer objects with the walks offered'})
  async   findWalksPostulations
  (
    @Body() walkId: string,
    @UserId() userId: string
  ): Promise<WalksPilots[]> {
    return await this.walkService.findWalksPostulations(walkId, userId);
  }

  @Roles(Role.PILOT)
  @Post('start-walk')
  @ApiOperation({ summary: 'Start a walk',
                  description: 'Returns a data transfer object with the updated record'})
  async pilotStartWalk
  (
    @Body() walkId: string,
    @UserId() userId: string
  ): Promise<Walks> {
    return await this.walkService.pilotStartWalk(walkId, userId);
  }

  @Roles(Role.PILOT)
  @Post('end-walk')
  @ApiOperation({ summary: 'End a walk',
                  description: 'Returns a data transfer object with the updated record'})
  async pilotEndWalk
  (
    @Body() walkId: string,
    @UserId() userId: string
  ): Promise<Walks> {
    return await this.walkService.pilotEndWalk(walkId, userId);
  }
}
