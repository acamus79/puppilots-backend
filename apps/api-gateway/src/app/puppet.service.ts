import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices/client';
import { PuppetDto } from 'libs/shared-dtos/src/lib/puppet.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PuppetService {
  /**
   * Service responsible for handling operations related to puppets.
   * Uses a ClientProxy to communicate with a microservice responsible for managing customers.
   * @param customerClient The client proxy used to communicate with the microservice responsible for managing customers.
   */
  constructor(@Inject("CUSTOMER") private customerClient: ClientProxy) { }

  /**
   * Creates a new puppet by sending a command to the microservice.
   * @param puppet The puppet object to create.
   * @param userId The ID of the user performing the operation.
   * @returns A promise that resolves to the created puppet.
   */
  async create(puppetDto: PuppetDto, userId: string): Promise<any> {
    const payload = { puppetDto, userId };
    return await this.sendCommand("create-puppet", payload);
  }

  /**
   * Updates an existing puppet by sending a command to the microservice.
   * @param puppet The updated puppet object.
   * @param puppetId The ID of the puppet to update.
   * @param userId The ID of the user performing the operation.
   * @returns A promise that resolves to the updated puppet.
   */
  async update(puppetDto: PuppetDto, puppetId: string, userId: string): Promise<any> {
    const payload = { puppetDto, puppetId, userId }
    return await this.sendCommand("update-puppet", payload);
  }

  /**
   * Deletes a puppet by sending a command to the microservice.
   * @param puppetId The ID of the puppet to delete.
   * @param userId The ID of the user performing the operation.
   * @returns A promise that resolves to the deleted puppet.
   */
  async delete(puppetId: string, userId: string): Promise<any> {
    const payload = { puppetId, userId };
    return await this.sendCommand("delete-puppet", payload);
  }

  /**
   * Finds puppets belonging to a customer by sending a command to the microservice.
   * @param customerId The ID of the customer.
   * @returns A promise that resolves to an array of puppets belonging to the customer.
   */
  async findPuppetByCustommrId(customerId: string): Promise<any> {
    return await this.sendCommand("puppets-by-customer", customerId);
  }

  /**
   * Sends a command to the microservice using the client proxy.
   * @param cmd The command to send.
   * @param payload The payload to send with the command.
   * @returns A promise that resolves to the result of the command.
   * @throws HttpException if an error occurs during the command execution.
   */
  private async sendCommand(cmd: string, payload: any): Promise<any> {
    try {
      const result = this.customerClient.send({ cmd }, payload);
      return await firstValueFrom(result);
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }
}
