import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RolesGuard } from './guards/roles.guard';
import { PaymentService } from './payment.service';
import { Roles } from './decorators/roles.decorator';
import { Role } from '@prisma/client';
import { UserId } from './decorators/user-id.decorator';

@UseGuards(RolesGuard)
@Controller('payment')
export class PaymentController {

  constructor(private readonly paymentService: PaymentService) {}

/*   @Roles(Role.CUSTOMER)
  @Post('paypal/create')
  async createPaypalOrder(
    @Body() paymentOrder: PaymentOrderDto,
    @UserId() userid: string
  ): Promise<any> {
    return await {message: ""}
  } */
}
