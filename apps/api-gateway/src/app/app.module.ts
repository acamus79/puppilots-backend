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
import { RolesGuard } from './guards/roles.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'AUTH', transport: Transport.TCP, options: { port: 3001 } },
      { name: 'CUSTOMER', transport: Transport.TCP, options: { port: 3002 } },
      { name: "PILOT", transport: Transport.TCP, options: { port: 3003 } },
    ]),
    JwtModule.register({
      secret: process.env.AUTH_JWT_SECRET
    })
  ],
  controllers: [
    AppController,
    CustomerController,
    PuppetController,
    PilotController,
  ],
  providers: [
    RolesGuard,
    AppService,
    PilotService,
    CustomerService,
    PuppetService,
  ],
})
export class AppModule {}
