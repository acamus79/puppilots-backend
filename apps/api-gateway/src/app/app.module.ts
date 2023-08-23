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
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { WalkService } from './walk.service';
import { WalkController } from './walk.controller';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'EMAIL', transport: Transport.TCP },
      { name: 'AUTH', transport: Transport.TCP, options: { port: 3001 } },
      { name: 'CUSTOMER', transport: Transport.TCP, options: { port: 3002 } },
      { name: 'PILOT', transport: Transport.TCP, options: { port: 3003 } },
      { name: 'WALK', transport: Transport.TCP, options: { port: 3004 } },
      { name: 'PAYMENT', transport: Transport.TCP, options: { port: 3005 } },
    ]),
    JwtModule.register({
      secret: process.env.AUTH_JWT_SECRET,
    }),
  ],
  controllers: [
    AppController,
    CustomerController,
    PuppetController,
    PilotController,
    PaymentController,
    WalkController,
  ],
  providers: [
    RolesGuard,
    AppService,
    PilotService,
    CustomerService,
    PuppetService,
    PaymentService,
    WalkService,
  ],
})
export class AppModule {}
