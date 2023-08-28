import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RolesGuard } from './guards/roles.guard';
import { PaymentService } from './payment.service';
import { Roles } from './decorators/roles.decorator';
import { Role, Walks } from '@prisma/client';
import { UserId } from './decorators/user-id.decorator';
import { PaymentOrderFrontDto, PaypalCapturePayDto } from '@puppilots/shared-dtos';
import { PaypalOrderResponse } from './interfaces/paypal-order-response.interface';

@UseGuards(RolesGuard)
@Controller('payment')
export class PaymentController {

  constructor(private readonly paymentService: PaymentService) {}

  @Roles(Role.CUSTOMER)
  @Post('paypal/create')
  async createPaypalOrder(
    @Body() paymentOrder: PaymentOrderFrontDto,
    @UserId() userId: string
  ): Promise<PaypalOrderResponse> {
    return await this.paymentService.paypalCreate(paymentOrder, userId);
  }

  @Roles(Role.CUSTOMER)
  @Post('paypal/capture-pay')
  async capturePaypalPay(
    @Body() paypalCapturePayDto: PaypalCapturePayDto,
    @UserId() userId: string
  ): Promise<Walks> {
    return await this.paymentService.paypalCapturePayDto(paypalCapturePayDto, userId);
  }
}
