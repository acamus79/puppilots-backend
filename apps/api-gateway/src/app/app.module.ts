import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ClientsModule.register([
    { name: "EMAIL", transport: Transport.TCP }
  ])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
