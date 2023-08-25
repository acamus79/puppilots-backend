import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentOrderCreated, PaymentOrderFrontDto } from '@puppilots/shared-dtos';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PaymentService {

  constructor(@Inject("PAYMENT") private customerClient: ClientProxy) { }
  async paypalCreate(paymentOrder: PaymentOrderFrontDto, userId: string): Promise<PaymentOrderCreated> {
    const payload = { paymentOrder, userId };
    return await this.sendCommand<PaymentOrderCreated, { paymentOrder: PaymentOrderFrontDto, userId: string}>("generate-paypal-order", payload);
  }

  /**
   * Sends a command to the microservice using the client proxy.
   * @param cmd The command to send.
   * @param payload The payload to send with the command.
   * @returns A promise that resolves to the result of the command.
   * @throws HttpException if an error occurs during the command execution.
   */
  private async sendCommand<T, I>(cmd: string, payload: I): Promise<T> {
    try {
      const result = this.customerClient.send({ cmd }, payload);
      if (cmd.includes('delete')) {
        return
      }
      return await firstValueFrom(result);
    } catch (error) {
      Logger.debug(error)
      throw new HttpException(error.message, error.code);
    }
  }
}
