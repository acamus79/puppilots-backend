import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserLoginDto, VerifyTokenDto } from '@puppilots/shared-dtos';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {

  constructor(//@Inject("EMAIL") private emailClient: ClientProxy,
              @Inject("AUTH") private readonly authClient: ClientProxy,
              @Inject("PILOT") private readonly pilotService: ClientProxy,
              @Inject("CUSTOMER") private readonly customerService: ClientProxy
              ) {}

  async login(userLogin: UserLoginDto) {
  //  this.emailClient.emit("login", {});
    try {
      const response = this.authClient.send({ cmd: "login" }, userLogin);
      return await firstValueFrom(response);
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  async verifyToken(token: VerifyTokenDto){
    try {
      const response = this.authClient.send({ cmd: "verify-token" }, token);
      const decodeToken = await firstValueFrom(response);

      if (decodeToken.role === "PILOT") {
        const responsePilot = await this.pilotService.send({ cmd: 'get-pilot' }, decodeToken.sub);
        return await firstValueFrom(responsePilot);
      }
      //return decodeToken;
      return await this.customerService.send({ cmd: 'get-customer' }, decodeToken.sub);
    } catch(error) {
      throw new HttpException(error.message, error.code);
    }
  }

  getData(): { message: string } {
    return { message: 'Puppilots API 1.0' };
  }
}
