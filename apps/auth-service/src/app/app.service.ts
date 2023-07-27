import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  login(email: string): string{
    Logger.log("LLegue", email);
    return "jwt";
  }
}
