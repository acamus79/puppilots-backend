import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PilotDto } from '@puppilots/shared-dtos';
import { firstValueFrom } from 'rxjs';
import { AppService } from '../app/app.service';

@Injectable()
export class PilotService {
  constructor(@Inject('PILOT') private pilotClient: ClientProxy, private authService: AppService) {}

  async createUserAndPilot(userNew: PilotDto) {
    try {
      const result = await this.pilotClient.send(
        { cmd: 'create-user-and-pilot' },
        userNew
      );
      await firstValueFrom(result);
      return await this.authService.login({ email: userNew.email, password: userNew.password});
    } catch (error) {
      if (error.message === 'El usuario ya existe') {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }

      throw new HttpException(error.message, error.code);
    }
  }
}
