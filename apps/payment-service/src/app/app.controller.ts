import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { PaypalOrderDto, PaymentOrderFrontDto, PaypalOrderCreate, PaymentOrderCreated } from '@puppilots/shared-dtos'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: "generate-paypal-order" })
  async generatePaypalOrder(data: { paymentOrder: PaymentOrderFrontDto, userId: string}): Promise<PaymentOrderCreated> {
    return await this.appService.createOrder(data.paymentOrder, data.userId);
  }
}
