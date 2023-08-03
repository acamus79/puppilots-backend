import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  imports: [ClientsModule.register([
    { name: "CUSTOMER", transport: Transport.TCP, options: { port: 3002 } },
  ])],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService]
})
export class CustomerModule {}
