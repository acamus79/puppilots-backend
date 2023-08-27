import {  Controller, Get, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { AppService } from './app.service';
import { AceptPilotDto, UserLoginDto, WalkDto } from '@puppilots/shared-dtos'
import { Walks, WalksPilots } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: "create-walk" })
  async createWalk(data: { walkDto: WalkDto, userId: string }): Promise<Walks> {
    return await this.appService.createWalk(data.walkDto, data.userId);
  }

  @MessagePattern({ cmd: "acept-pilot" })
  async aceptPilot(data: { aceptPilot: AceptPilotDto , userId: string }): Promise<Walks> {
    return await this.appService.aceptPilot(data.aceptPilot, data.userId);
  }

  @MessagePattern({ cmd: "postulate-walk" })
  async postulateWalk(data: { walkId: string , userId: string }): Promise<WalksPilots> {
    return await this.appService.postulateWalk(data.walkId, data.userId);
  }

  @MessagePattern({ cmd: "find-walks-per-city" })
  async findWalksPerCity(city: string): Promise<Walks[]> {
    return await this.appService.findWalksPerCityNeedingPilot(city);
  }

  @MessagePattern({ cmd: "find-walks-per-pilot-active" })
  async findWalksPerPilotNotFinished( userId: string ): Promise<Walks[]> {
    return await this.appService.findWalksPerPilotNotFinished(userId);
  }

  @MessagePattern({ cmd: "find-walks-offer" })
  async findWalksOfferPerPilot( userId: string ): Promise<Walks[]> {
    return await this.appService.findWalksOfferPerPilot(userId);
  }


}
