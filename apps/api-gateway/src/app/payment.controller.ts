import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RolesGuard } from './guards/roles.guard';
import { PaymentService } from './payment.service';
import { Roles } from './decorators/roles.decorator';
import { Role } from '@prisma/client';
import { UserId } from './decorators/user-id.decorator';
import { PaymentOrderFrontDto, PaypalCapturePayDto } from '@puppilots/shared-dtos';
import { ApiOperation } from '@nestjs/swagger';

@UseGuards(RolesGuard)
@Controller('payment')
export class PaymentController {

  constructor(private readonly paymentService: PaymentService) {}

  @Roles(Role.CUSTOMER)
  @Post('paypal/create')
  @ApiOperation({ summary: 'Create a paypal order',
                  description: 'Returns a data transfer object with the updated record'})
  async createPaypalOrder(
    @Body() paymentOrder: PaymentOrderFrontDto,
    @UserId() userId: string
  ): Promise<any> {
    return await this.paymentService.paypalCreate(paymentOrder, userId);
  }

  @Roles(Role.CUSTOMER)
  @Post('paypal/capture-pay')
  @ApiOperation({ summary: 'Capture a paypal order',
                  description: 'Returns a data transfer object with the updated record'})
  async capturePaypalPay(
    @Body() paypalCapturePayDto: PaypalCapturePayDto,
    @UserId() userId: string
  ): Promise<any> {
    return await this.paymentService.paypalCapturePayDto(paypalCapturePayDto, userId);
  }
}
