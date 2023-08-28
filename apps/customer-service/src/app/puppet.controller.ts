import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Puppets } from '@prisma/client';
import { PuppetDto } from '@puppilots/shared-dtos';
import { PuppetService } from './puppet.service';

@Controller('puppet')
export class PuppetController {
  /**
   * Handles MessagePattern requests related to puppets.
   * Delegates the processing to the PuppetService class.
   */
  constructor(private readonly puppetService: PuppetService) { };

  /**
   * Creates a new puppet.
   * @param data - The puppet data and user ID.
   * @returns The created puppet.
   */
  @MessagePattern({ cmd: "create-puppet" })
  async createPuppet(data: { puppetDto: PuppetDto, userId: string}): Promise<Puppets> {
    return await this.puppetService.createPuppet(data.puppetDto, data.userId);
  }

  /**
   * Updates an existing puppet.
   * @param data - The puppet data, puppet ID, and user ID.
   * @returns The updated puppet.
   */
  @MessagePattern({ cmd: "update-puppet" })
  async updatePuppet(data: { puppetDto: PuppetDto, puppetId: string, userId: string }): Promise<Puppets> {
    return await this.puppetService.updatePuppet(data.puppetDto, data.puppetId, data.userId);
  }

  /**
   * Deletes a puppet.
   * @param data - The puppet ID and user ID.
   */
  @MessagePattern({ cmd: "delete-puppet" })
  async deletePuppet(data: { puppetId: string, userId: string }): Promise<{ success: true }> {
    await this.puppetService.deletePuppet(data.puppetId, data.userId);
    return { success: true };
  }

  /**
   * Retrieves puppets associated with a customer.
   * @param customerId - The customer ID.
   * @returns An array of puppets.
   */
  @MessagePattern({ cmd: "puppets-by-customer" })
  async puppetsByCustomerId(customerId: string): Promise<Puppets[]> {
    return await this.puppetService.getPuppetsByCustomerId(customerId);
  }
}
