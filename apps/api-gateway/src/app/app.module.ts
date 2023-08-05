import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CustomerModule } from '../customer/customer.module';
import { PilotModule } from '../pilot/pilot.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      // { name: "EMAIL", transport: Transport.TCP },
      { name: 'AUTH', transport: Transport.TCP, options: { port: 3001 } },
      // { name: "WALK", transport: Transport.TCP, options: { port: 3004 } }
    ]),
    CustomerModule,
    PilotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
