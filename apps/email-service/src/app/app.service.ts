import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  emitMessage(data: string){
    console.log("LLegue");
  }
}
