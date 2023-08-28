import { Controller } from '@nestjs/common';

import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { PaymentOrderFrontDto, PaymentOrderCreated, PaypalCapturePayDto, AceptPilotDto } from '@puppilots/shared-dtos';

/**
 * Controller responsible for handling incoming messages and delegating the processing to the AppService class.
 * @param appService An instance of the AppService class used for processing the messages.
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Handles the "generate-paypal-order" message by calling the createOrder method of the AppService class and returning the result.
   * @param data An object containing the paymentOrder and userId.
   * @returns A Promise that resolves to a PaymentOrderCreated object.
   */
  @MessagePattern({ cmd: "generate-paypal-order" })
  async generatePaypalOrder(data: { paymentOrder: PaymentOrderFrontDto, userId: string}): Promise<PaymentOrderCreated> {
    return await this.appService.createOrder(data.paymentOrder, data.userId);
  }

  /**
   * Handles the "paypal-capture-pay" message by calling the paypalCapturePay method of the AppService class and returning the result.
   * @param data An object containing the paypalCapturePayDto and userId.
   * @returns A Promise that resolves to an AceptPilotDto object.
   */
  @MessagePattern({ cmd: "paypal-capture-pay" })
  async paypalCapturePay(data: { paypalCapturePayDto: PaypalCapturePayDto, userId: string}): Promise<AceptPilotDto> {
    return await this.appService.paypalCapturePay(data.paypalCapturePayDto, data.userId);
  }
}
