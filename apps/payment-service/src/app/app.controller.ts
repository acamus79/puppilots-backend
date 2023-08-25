import { Controller } from '@nestjs/common';

import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { PaymentOrderFrontDto, PaymentOrderCreated, PaypalCapturePayDto, AceptPilotDto } from '@puppilots/shared-dtos';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: "generate-paypal-order" })
  async generatePaypalOrder(data: { paymentOrder: PaymentOrderFrontDto, userId: string}): Promise<PaymentOrderCreated> {
    return await this.appService.createOrder(data.paymentOrder, data.userId);
  }
  @MessagePattern({ cmd: "paypal-capture-pay" })
  async paypalCapturePay(data: { paypalCapturePayDto: PaypalCapturePayDto, userId: string}): Promise<AceptPilotDto> {
    return await this.appService.paypalCapturePay(data.paypalCapturePayDto, data.userId);
  }
}
