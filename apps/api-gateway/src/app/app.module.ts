import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerController } from './customer.controller';
import { PuppetController } from './puppet.controller';
import { PilotController } from './controller/pilot.controller';
import { ParamertersController } from './controller/parameters.controller';
import { PilotService } from './services/pilot.service';
import { CustomerService } from './customer.service';
import { CountryService } from './services/country.service';
import { PuppetService } from './puppet.service';
import { RolesGuard } from './guards/roles.guard';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '@puppilots/shared-services';
import { BreedService } from './services/breed.service';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'EMAIL', transport: Transport.TCP },
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
    ParamertersController,
  ],
  providers: [
    RolesGuard,
    AppService,
    PilotService,
    CustomerService,
    PuppetService,
    CountryService,
    BreedService,
    PrismaService,
  ],
})
export class AppModule {}
