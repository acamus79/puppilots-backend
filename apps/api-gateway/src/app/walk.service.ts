import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Walks } from '@prisma/client';
import { AceptPilotDto, WalkDto } from '@puppilots/shared-dtos';
import { firstValueFrom } from 'rxjs';
import { UserId } from './decorators/user-id.decorator';

@Injectable()
export class WalkService {
  private readonly logger = new Logger(WalkService.name);

  /**
   * WalkService constructor.
   * @param walkClient The client proxy for communicating with the microservice.
   */
  constructor(@Inject("WALK") private walkClient: ClientProxy) { }

  /**
   * Creates a walk by sending a command to the microservice.
   * @param walkDto The WalkDto object.
   * @param userId The user ID.
   * @returns A promise that resolves to a Walks object.
   */
  async createWalk(walkDto: WalkDto, userId: string): Promise<Walks> {
    const payload = { walkDto, userId };
    return await this.sendCommand<Walks, { walkDto: WalkDto , userId: string }>("create-walk", payload);
  }

  async aceptPilot(aceptPilot: AceptPilotDto,userId: string): Promise<Walks> {
    const payload = { aceptPilot, userId };
    return await this.sendCommand<Walks, { aceptPilot: AceptPilotDto , userId: string }>("acept-pilot", payload);
  }

  async postulateWalk(walkId: string, userId: string): Promise<Walks> {
    const payload = { walkId, userId };
    return await this.sendCommand<Walks, { walkId: string , userId: string }>("postulate-walk", payload);
  }

  async getWalksPerPilot(userId: string): Promise<Walks[]> {
    return await this.sendCommand<Walks[], string>("find-walks-per-pilot-active", userId);
  }

  async findWalksPerCityActive(city: string): Promise<Walks[]>{
    return await this.sendCommand<Walks[], string>("find-walks-per-city", city)
  }

  async findWalksOfferPerPilot(userId: string): Promise<Walks[]>{
    return await this.sendCommand<Walks[], string>("find-walks-offer", userId)
  }

  /**
   * Sends a command to the microservice using the client proxy.
   * @param cmd The command to send.
   * @param payload The payload to send with the command.
   * @returns A promise that resolves to the result of the command.
   * @throws HttpException if an error occurs during the command execution.
   */
  private async sendCommand<T, I>(cmd: string, payload: I): Promise<T> {
    try {
      const result = this.walkClient.send({ cmd }, payload);
      if (cmd.includes('delete')) {
        return
      }
      return await firstValueFrom(result);
    } catch (error) {
      this.logger.debug(error)
      throw new HttpException(error.message, error.code);
    }
  }
}
