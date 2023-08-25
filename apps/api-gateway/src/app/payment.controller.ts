import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RolesGuard } from './guards/roles.guard';
import { PaymentService } from './payment.service';
import { Roles } from './decorators/roles.decorator';
import { Role } from '@prisma/client';
import { UserId } from './decorators/user-id.decorator';
import { PaymentOrderFrontDto } from '@puppilots/shared-dtos';

@UseGuards(RolesGuard)
@Controller('payment')
export class PaymentController {

  constructor(private readonly paymentService: PaymentService) {}

  @Roles(Role.CUSTOMER)
  @Post('paypal/create')
  async createPaypalOrder(
    @Body() paymentOrder: PaymentOrderFrontDto,
    @UserId() userId: string
  ): Promise<any> {
    return await this.paymentService.paypalCreate(paymentOrder, userId);
  }
}
