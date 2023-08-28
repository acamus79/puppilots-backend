import {  Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { AppService } from './app.service';
import { AceptPilotDto, WalkDto } from '@puppilots/shared-dtos'
import { Walks, WalksPilots } from '@prisma/client';

/**
 * The AppController class is responsible for handling incoming messages
 * and delegating the requests to the appropriate methods in the AppService class.
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Creates a new walk by calling the createWalk method in the AppService class.
   * @param data - An object containing the walkDto and userId.
   * @returns A Promise that resolves to the created walk.
   */
  @MessagePattern({ cmd: "create-walk" })
  async createWalk(data: { walkDto: WalkDto, userId: string }): Promise<Walks> {
    return await this.appService.createWalk(data.walkDto, data.userId);
  }

  /**
   * Accepts a pilot for a walk by calling the aceptPilot method in the AppService class.
   * @param data - An object containing the aceptPilot and userId.
   * @returns A Promise that resolves to the accepted walk.
   */
  @MessagePattern({ cmd: "acept-pilot" })
  async aceptPilot(data: { aceptPilot: AceptPilotDto , userId: string }): Promise<Walks> {
    return await this.appService.aceptPilot(data.aceptPilot, data.userId);
  }

  /**
   * Postulates for a walk by calling the postulateWalk method in the AppService class.
   * @param data - An object containing the walkId and userId.
   * @returns A Promise that resolves to the postulated walk.
   */
  @MessagePattern({ cmd: "postulate-walk" })
  async postulateWalk(data: { walkId: string , userId: string }): Promise<WalksPilots> {
    return await this.appService.postulateWalk(data.walkId, data.userId);
  }

  /**
   * Finds walks per city needing a pilot by calling the findWalksPerCityNeedingPilot method in the AppService class.
   * @param city - The city to search for walks.
   * @returns A Promise that resolves to an array of walks per city.
   */
  @MessagePattern({ cmd: "find-walks-per-city" })
  async findWalksPerCity(city: string): Promise<Walks[]> {
    return await this.appService.findWalksPerCityNeedingPilot(city);
  }

  /**
   * Finds walks per pilot that are not finished by calling the findWalksPerPilotNotFinished method in the AppService class.
   * @param userId - The ID of the pilot.
   * @returns A Promise that resolves to an array of walks per pilot.
   */
  @MessagePattern({ cmd: "find-walks-per-pilot-active" })
  async findWalksPerPilotNotFinished( userId: string ): Promise<Walks[]> {
    return await this.appService.findWalksPerPilotNotFinished(userId);
  }

  /**
   * Finds walks available for a pilot by calling the findWalksOfferPerPilot method in the AppService class.
   * @param userId - The ID of the pilot.
   * @returns A Promise that resolves to an array of available walks.
   */
  @MessagePattern({ cmd: "find-walks-offer" })
  async findWalksOfferPerPilot( userId: string ): Promise<Walks[]> {
    return await this.appService.findWalksOfferPerPilot(userId);
  }

  /**
   * Finds walk postulations by calling the findWalksPostulations method in the AppService class.
   * @param data - An object containing the walkId and userId.
   * @returns A Promise that resolves to an array of walk postulations.
   */
  @MessagePattern({ cmd: "find-walk-postulations" })
  async findWalksPostulations( data: { walkId: string, userId: string} ): Promise<WalksPilots[]> {
    const walkId = data.walkId['walkId'];
    return await this.appService.findWalksPostulations(walkId, data.userId);
  }

  /**
   * Method that handles incoming messages with the command "pilot-start-walk".
   * Starts a walk using the provided walkId and userId.
   * @param data - An object containing the walkId and userId for starting a walk.
   * @returns A Promise that resolves to a Walks object representing the started walk.
   */
  @MessagePattern({ cmd: "pilot-start-walk" })
  async startWalk(data: { walkId: string, userId: string }): Promise<Walks> {
    const walkId = data.walkId['walkId'];
    return await this.appService.pillotStartWalk(walkId, data.userId);
  }
 
  /**
   * Method that handles incoming messages with the command "pilot-end-walk".
   * Ends a walk based on the provided walkId and userId.
   * @param data - An object containing the walkId and userId for ending a walk.
   * @returns A Promise that resolves to a Walks object representing the ended walk.
   */
  @MessagePattern({ cmd: "pilot-end-walk" })
  async endWalk(data: { walkId: string, userId: string }): Promise<Walks> {
    const walkId = data.walkId['walkId'];
    return await this.appService.pilotEndWalk(walkId, data.userId);
  }
}
