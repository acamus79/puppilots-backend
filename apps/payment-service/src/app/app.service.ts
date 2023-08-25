import { Injectable, Logger } from '@nestjs/common';
import { PaymentOrderCreated, PaypalOrderDto, PaymentOrderFrontDto, PaypalLoginDto, PaypalOrderCreate  } from '@puppilots/shared-dtos';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpService } from "@nestjs/axios";
import { first, firstValueFrom } from 'rxjs';
import { PrismaService } from '@puppilots/shared-services';
import { RpcException } from '@nestjs/microservices';
import {
  PuppilotsServerErrorException
} from '@puppilots/shared-exceptions';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly prismaService: PrismaService
    ) {};
  async createOrder(paymentOrder: PaymentOrderFrontDto, userId: string): Promise<PaymentOrderCreated> {
    let data = new PaypalOrderDto();
    let paymentCreated = new PaymentOrderCreated();
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
          }
        }
      })
      .catch(() => {
        throw new PuppilotsServerErrorException();
      });      
    
    } catch(error) {
      this.logger.debug(error);
    }
    return paymentCreated
  }


  async loginPaypal(): Promise<PaypalLoginDto> {
    const paypalAuthToken = process.env.PAYPAL_AUTH_TOKEN;
    const paypalUrl = process.env.PAYPAL_URL
    const data: string = 'grant_type=client_credentials';

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

    return result;


  }
}
