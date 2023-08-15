import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import { PuppetService } from './puppet.service';
import { PuppetDto } from 'libs/shared-dtos/src/lib/puppet.dto';
import { CustomerDto } from '@puppilots/shared-dtos';

@Controller('puppet')
export class PuppetController {
  constructor(private readonly puppetService: PuppetService) {}
  @Post()
  async create(@Body() puppet: PuppetDto): Promise<any> {
    return await this.puppetService.create(puppet);
  }

  @Put()
  async update(@Body() puppet: PuppetDto): Promise<any> {
    return await this.puppetService.update(puppet);
  }

  @Delete()
  async delete(@Body() puppet: PuppetDto): Promise<any> {
    return await this.puppetService.delete(puppet)
  }

  @Post('by-customer-id')
  async findPuppetByCustommrId(@Body() customerDto: CustomerDto): Promise<any> {
    return await this.puppetService.findPuppetByCustommrId(customerDto);
  }
}
