import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserLoginDto, VerifyTokenDto } from '@puppilots/shared-dtos';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {

  constructor(//@Inject("EMAIL") private emailClient: ClientProxy,
              @Inject("AUTH") private authClient: ClientProxy) {}


  async login(userLogin: UserLoginDto) {
  //  this.emailClient.emit("login", {});
    try {
      const response = this.authClient.send({ cmd: "login" }, userLogin);
      return await firstValueFrom(response);
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  async verifyToken(token: VerifyTokenDto) {
    try {
      const response = this.authClient.send({ cmd: "verify-token" }, token);
      return await firstValueFrom(response);
    } catch(error) {
      throw new HttpException(error.message, error.code);
    }
  }

  getData(): { message: string } {
    return { message: 'Puppilots API 1.0' };
  }
}
