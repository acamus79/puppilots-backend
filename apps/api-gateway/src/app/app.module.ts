import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CustomerController } from '../customer/customer.controller';
import { CustomerModule } from '../customer/customer.module';
import { CustomerService } from '../customer/customer.service';

import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [ClientsModule.register([
    { name: "EMAIL", transport: Transport.TCP },
    { name: "AUTH", transport: Transport.TCP, options: { port: 3001 } },
    //{ name: "PILOT", transport: Transport.TCP, options: { port: 3003 } },
   // { name: "WALK", transport: Transport.TCP, options: { port: 3004 } }
  ]),
  CustomerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
