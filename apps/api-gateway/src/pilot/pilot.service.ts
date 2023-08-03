import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PilotDto, UserClientDto } from '@puppilots/shared-dtos';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PilotService {

  constructor(@Inject("PILOT") private pilotClient: ClientProxy){}

  async createUserAndPilot(userNew: UserClientDto<PilotDto>) {
    try {
      const result = await this.pilotClient.send({ cmd: "create-user-and-pilot"}, userNew);
      return await firstValueFrom(result);
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }
}
