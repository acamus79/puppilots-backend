import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerController } from './customer.controller';
import { PuppetController } from './puppet.controller';
import { PilotController } from './pilot.controller';
import { PilotService } from './pilot.service';
import { CustomerService } from './customer.service';
import { PuppetService } from './puppet.service';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'EMAIL', transport: Transport.TCP },
      { name: 'AUTH', transport: Transport.TCP, options: { port: 3001 } },
      { name: 'CUSTOMER', transport: Transport.TCP, options: { port: 3002 } },
      { name: "PILOT", transport: Transport.TCP, options: { port: 3003 } },
    ]),
  ],
  controllers: [
    AppController,
    CustomerController,
    PuppetController,
    PilotController,
  ],
  providers: [
    AppService,
    PilotService,
    CustomerService,
    PuppetService
  ],
})
export class AppModule {}
