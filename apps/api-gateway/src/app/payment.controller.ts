import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RolesGuard } from './guards/roles.guard';
import { PaymentService } from './payment.service';
import { Roles } from './decorators/roles.decorator';
import { Role, Walks } from '@prisma/client';
import { UserId } from './decorators/user-id.decorator';
import { PaymentOrderFrontDto, PaypalCapturePayDto } from '@puppilots/shared-dtos';
import { PaypalOrderResponse } from './interfaces/paypal-order-response.interface';
import { ApiOperation } from '@nestjs/swagger';


@UseGuards(RolesGuard)
@Controller('payment')
export class PaymentController {

  constructor(private readonly paymentService: PaymentService) {}

  @Roles(Role.CUSTOMER)
  @Post('paypal/create')
  @ApiOperation({ summary: 'Creates a PayPal order based on the provided payment details and user ID',
                  description: 'Returns a data transfer object with the updated record'})
  async createPaypalOrder(
    @Body() paymentOrder: PaymentOrderFrontDto,
    @UserId() userId: string
  ): Promise<PaypalOrderResponse> {
    return await this.paymentService.paypalCreate(paymentOrder, userId);
  }

  @Roles(Role.CUSTOMER)
  @Post('paypal/capture-pay')
  @ApiOperation({ summary: 'Captures a PayPal payment by sending a request to the PayPal API',
                  description: 'Returns a data transfer object with the updated record'})
  async capturePaypalPay(
    @Body() paypalCapturePayDto: PaypalCapturePayDto,
    @UserId() userId: string
  ): Promise<Walks> {
    return await this.paymentService.paypalCapturePayDto(paypalCapturePayDto, userId);
  }
}
