import { Injectable, Logger } from '@nestjs/common';
import { PaymentOrderCreated, PaypalOrderDto, PaymentOrderFrontDto, PaypalLoginDto, PaypalOrderCreate, PaypalCapturePayDto, AceptPilotDto, paypalCaptureResponseDto } from '@puppilots/shared-dtos';
import { AxiosRequestConfig } from 'axios';
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from 'rxjs';
import { PrismaService } from '@puppilots/shared-services';
import { RpcException } from '@nestjs/microservices';
import {
  PuppilotsServerErrorException
} from '@puppilots/shared-exceptions';
import { Status } from '@prisma/client';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly prismaService: PrismaService
    ) {};
  async createOrder(paymentOrder: PaymentOrderFrontDto, userId: string): Promise<PaymentOrderCreated> {
    let data = new PaypalOrderDto();
    const paymentCreated = new PaymentOrderCreated();
    const paypalUrl = process.env.PAYPAL_URL;
    try {
      const login = await this.loginPaypal();
      const valorBase =  parseInt(process.env.APP_WALK_PRICE);
      const valorPaseo = valorBase*paymentOrder.quantity;
  
      data = { 
        application_context: {
          cancel_url: "https://puppilots.com/payment/cancel",
          return_url: "https://puppilots.com/payment/return_url"
        },
        intent:"CAPTURE",
        purchase_units: [
          {
            items: [
                {
                    name: "Paseo",
                    description: "Paseo de mascota",
                    quantity: paymentOrder.quantity.toString(),
                    unit_amount: {
                        currency_code: "USD",
                        value: valorBase.toString()
                    }
                }
            ],
            amount: {
                currency_code: "USD",
                value: valorPaseo.toString(),
                breakdown: {
                    item_total: {
                        currency_code: "USD",
                        value: valorPaseo.toString()
                    }
                }
            }
          }
        ]
      };
      const config: AxiosRequestConfig = {
        method: 'post',
        maxBodyLength: Infinity,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  login.access_token,
          'Prefer': 'return=representation', 
        },
      };
      this.logger.debug(data)
      const paypalOrderResponse: PaypalOrderCreate = await firstValueFrom(this.httpService.post(paypalUrl + 'v2/checkout/orders', data, config)).then((resp) => {
        return resp.data
      });

      paymentCreated.clientUrl = paypalOrderResponse.links[1].href;

      // Create Payment in DB
      const walk = await this.prismaService.walks.findFirst({
        where: { id: paymentOrder.walkId }
      });
      if(!walk){
        throw new RpcException("Error no se encontro el walk");
      }
      const custumer = await this.prismaService.costumer.findFirst({
        where: { userId: userId }
      });

      const paymentApp = await this.prismaService.payment.create({
        data: {
          amount: valorPaseo,
          orderId: paypalOrderResponse.id,
          createdBy: {
            connect: {
              id: userId
            }
          },
          walk: {
            connect: {
              id: walk.id
            }
          },
          pilot: {
            connect: {
              id: paymentOrder.pilotId
            }
          },
          costumer: {
            connect: {
              id: custumer.id
            }
          }
        }
      })
      .catch((error) => {
        this.logger.error(error)
        throw new PuppilotsServerErrorException();
      });      
    
    } catch(error) {
      this.logger.debug(error);
    }
    return paymentCreated
  }

  async paypalCapturePay(paypalCapturePayDto: PaypalCapturePayDto, userId: string): Promise<AceptPilotDto> {
    let aceptPilotDto = new AceptPilotDto();
    const paypalUrl = process.env.PAYPAL_URL;

    try {
      const login = await this.loginPaypal();
      const config: AxiosRequestConfig = {
        method: 'post',
        maxBodyLength: Infinity,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  login.access_token,
          'Prefer': 'return=representation', 
        },
      };

      const data = null;
      const paypalCaptureResponse: paypalCaptureResponseDto = await firstValueFrom(
        this.httpService.post(paypalUrl + 'v2/checkout/orders/' + paypalCapturePayDto.paypalToken +'/capture', data, config)
      ).then((resp) => {
        this.logger.error(resp.data)
        return resp.data
      }).catch((error) => {
        this.logger.error(error)
        throw new PuppilotsServerErrorException();
        
      });
      
      this.logger.debug(paypalUrl + 'v2/checkout/orders/' + paypalCapturePayDto.paypalToken +'/capture')

      const payment = await this.prismaService.payment.findFirst({
        where: {orderId: paypalCapturePayDto.paypalToken}
      })
      .catch((error) => {
        this.logger.error(error)
        throw new PuppilotsServerErrorException();
        
      });

      const paymentUpdate = await this.prismaService.payment.update({
        where: { id: payment.id},
        data: {
          status: Status.COMPLETED,
          capturePaymentRaw: JSON.stringify(paypalCaptureResponse)
        },
        include: {
          walk: true
        }
      })
      .catch((error) => {
        this.logger.error(error)
        throw new PuppilotsServerErrorException();
        
      });

      aceptPilotDto = {
        walkId: paymentUpdate.walkId,
        pilotId: paymentUpdate.pilotId,
      };

      this.logger.debug(aceptPilotDto);
      
    } catch(error) {
      this.logger.error(error);
      throw new PuppilotsServerErrorException();
    }

    return aceptPilotDto;
  }


  async loginPaypal(): Promise<PaypalLoginDto> {
    const paypalAuthToken = process.env.PAYPAL_AUTH_TOKEN;
    const paypalUrl = process.env.PAYPAL_URL
    const data = 'grant_type=client_credentials';

    const config: AxiosRequestConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded', 
        'Authorization': 'Basic ' + paypalAuthToken
      },
    };
    const result: PaypalLoginDto = await firstValueFrom(this.httpService.post(paypalUrl + 'v1/oauth2/token', data, config)).then((resp) => {
      return resp.data
    })
    .catch((error) => {
      this.logger.error(error);
      throw new PuppilotsServerErrorException();
    });

    return result;


  }
}
