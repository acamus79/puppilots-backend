import { forwardRef, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppModule } from '../app/app.module';
import { AppService } from '../app/app.service';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  imports: [ClientsModule.register([
    { name: "CUSTOMER", transport: Transport.TCP, options: { port: 3002 } },
    { name: "AUTH", transport: Transport.TCP, options: { port: 3001 } }
  ]),
  ],
  controllers: [CustomerController],
  providers: [CustomerService, AppService],
  exports: [CustomerService]
})
export class CustomerModule {}
