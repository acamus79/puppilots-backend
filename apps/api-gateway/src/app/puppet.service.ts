import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices/client';
import { CustomerDto } from '@puppilots/shared-dtos';
import { PuppetDto } from 'libs/shared-dtos/src/lib/puppet.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PuppetService {

  constructor(@Inject("CUSTOMER") private customerClient: ClientProxy) { }
  async create(puppet: PuppetDto): Promise<any> {
    try {
      const puppetCreated = await this.customerClient.send({ cmd: "create-puppet"}, puppet);
      return await firstValueFrom(puppetCreated);
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }
  async update(puppet: PuppetDto): Promise<any> {
    try {
      const puppetUpdated = await this.customerClient.send({ cmd: "updated-puppet"}, puppet);
      return await firstValueFrom(puppetUpdated);
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }
  async delete(puppet: PuppetDto): Promise<any> {
    try {
      const puppetUpdated = await this.customerClient.send({ cmd: "delete-puppet"}, puppet);
      return await firstValueFrom(puppetUpdated);
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }
  async findPuppetByCustommrId(customerDto: CustomerDto): Promise<any> {
    try {
      const puppetsOfCustomer = await this.customerClient.send({ cmd: "puppets-by-customer"}, customerDto);
      return await firstValueFrom(puppetsOfCustomer);
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

}
