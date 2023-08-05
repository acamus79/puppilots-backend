import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PilotController } from './pilot.controller';
import { PilotService } from './pilot.service';
import { AppService } from '../app/app.service';

@Module({
  imports: [ClientsModule.register([
    { name: "PILOT", transport: Transport.TCP, options: { port: 3003 } },
    { name: "AUTH", transport: Transport.TCP, options: { port: 3001 } }
  ])],
  controllers: [PilotController],
  providers: [PilotService, AppService],
})
export class PilotModule {}
