import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PilotController } from './pilot.controller';
import { PilotService } from './pilot.service';

@Module({
  imports: [ClientsModule.register([
    { name: "PILOT", transport: Transport.TCP, options: { port: 3003 } },
  ])],
  controllers: [PilotController],
  providers: [PilotService],
})
export class PilotModule {}
