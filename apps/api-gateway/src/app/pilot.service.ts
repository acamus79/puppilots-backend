import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PilotDto, CommonUserDto } from '@puppilots/shared-dtos';
import { firstValueFrom } from 'rxjs';
import { AppService } from '../app/app.service';



@Injectable()
export class PilotService {
  constructor(@Inject('PILOT') private pilotClient: ClientProxy,
              @Inject('EMAIL') private emailClient: ClientProxy,
              private authService: AppService) {}

  async createUserAndPilot(userNew: PilotDto) {
    try {
      const result = await this.pilotClient.send(
        { cmd: 'create-user-and-pilot' },
        userNew
      );
      await firstValueFrom(result);
     // await this.emailClient.emit('register', new UserRegisterEvent(userNew.email, Role.PILOT));

      return await this.authService.login({ email: userNew.email, password: userNew.password});
    } catch (error) {
      if (error.message === 'El usuario ya existe') {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }
      throw new HttpException(error.message, error.code);
    }
  }

  async getUserAndPilotById(id: string) {
    try {
      const result = await this.pilotClient.send({ cmd: 'get-pilot' }, id);
      return await firstValueFrom(result);
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  async updateUserAndPilotById(id: string, patch: CommonUserDto) {
    try {
      patch.userId = id;
      const result = await this.pilotClient.send(
        { cmd: 'update-pilot' },
        { patch }
      );
      return await firstValueFrom(result);
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

}
