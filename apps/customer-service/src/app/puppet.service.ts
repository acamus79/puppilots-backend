import { Injectable, Logger } from '@nestjs/common';
import { Puppets } from '@prisma/client';
import {
  CustomerNotAuthorizedException,
  CustomerNotExistException,
  InvalidCustomerException,
  PuppilotsNotFoundException,
  PuppilotsServerErrorException
} from '@puppilots/shared-exceptions';
import { PrismaService } from '@puppilots/shared-services';
import { PuppetDto } from '@puppilots/shared-dtos';

@Injectable()
export class PuppetService {
  private readonly logger = new Logger(PuppetService.name);

  constructor(private readonly prismaService: PrismaService) { }

  /**
   * Create a new puppet.
   * @param puppetDto - The puppet data transfer object.
   * @param userId - The ID of the user.
   * @returns The created puppet.
   * @throws PuppilotsNotFoundException if the puppet is not found.
   * @throws CustomerNotAuthorizedException if the customer is not authorized.
   */
  async createPuppet(puppetDto: PuppetDto, userId: string) {
    await this.authorizeCustomer(puppetDto.customerId, userId);

    const puppet = await this.prismaService.puppets.create({
      data: {
        name: puppetDto.name,
        breed: puppetDto.breed,
        sex: puppetDto.sex,
        size: puppetDto.size,
        observations: puppetDto.observations || '',
        costumer: {
          connect: {
            id: puppetDto.customerId,
          },
        },
      },
    });

    this.logger.debug('Puppet created successfully.');
    return puppet;
  }

  /**
   * Update an existing puppet.
   * @param puppetDto - The puppet data transfer object.
   * @param puppetId - The ID of the puppet.
   * @param userId - The ID of the user.
   * @returns The updated puppet.
   * @throws PuppilotsNotFoundException if the puppet is not found.
   * @throws CustomerNotAuthorizedException if the customer is not authorized.
   */
  async updatePuppet(puppetDto: PuppetDto, puppetId: string, userId: string) {
    await this.authorizeCustomer(puppetDto.customerId, userId);

    const updatedPuppet = await this.prismaService.puppets.update({
      where: { id: puppetId },
      data: {
        name: puppetDto.name,
        breed: puppetDto.breed,
        sex: puppetDto.sex,
        size: puppetDto.size,
        observations: puppetDto.observations || '',
        costumer: {
          connect: {
            id: puppetDto.customerId,
          },
        },
      },
    });

    this.logger.debug('Puppet updated successfully.');
    return updatedPuppet;
  }

  /**
   * Delete a puppet.
   * @param puppetId - The ID of the puppet.
   * @param userId - The ID of the user.
   * @throws PuppilotsNotFoundException if the puppet is not found.
   * @throws CustomerNotAuthorizedException if the customer is not authorized.
   */
  async deletePuppet(puppetId: string, userId: string): Promise<void> {
    const puppet = await this.prismaService.puppets.findUnique({
      where: { id: puppetId },
      include: { costumer: true },
    });

    if (!puppet) {
      throw new PuppilotsNotFoundException();
    }

    if (puppet.costumer.userId !== userId) {
      throw new CustomerNotAuthorizedException();
    }

    await this.prismaService.puppets.update({
      where: { id: puppetId },
      data: {
        deletedAt: new Date(),
      },
    });

    this.logger.debug('Puppet deleted successfully.');
  }

  /**
   * Get puppets by customer ID.
   * @param customerId - The ID of the customer.
   * @returns The puppets associated with the customer.
   * @throws PuppilotsNotFoundException if the customer is not found.
   */
  async getPuppetsByCustomerId(customerId: string): Promise<Puppets[]> {
    const customer = await this.prismaService.costumer.findUnique({
      where: { id: customerId },
    });

    if (!customer) {
      throw new PuppilotsNotFoundException();
    }

    this.logger.debug('Getting all puppets of the Customer.');
    return await this.prismaService.puppets.findMany({
      where: {
        costumerId: customerId,
        deletedAt: null,
      },
    });
  }

  /**
   * Authorize a customer.
   * @param customerId - The ID of the customer.
   * @param userId - The ID of the user.
   * @throws InvalidCustomerException if the customer ID or user ID is invalid.
   * @throws PuppilotsServerErrorException if there is a server error.
   * @throws CustomerNotExistException if the customer does not exist.
   * @throws CustomerNotAuthorizedException if the customer is not authorized.
   */
  async authorizeCustomer(customerId: string, userId: string) {
    if (!customerId || !userId) {
      throw new InvalidCustomerException();
    }

    const customer = await this.prismaService.costumer
      .findUnique({
        where: { id: customerId },
      })
      .catch(() => {
        throw new PuppilotsServerErrorException();
      });

    if (!customer) {
      throw new CustomerNotExistException();
    }

    if (customer.userId !== userId) {
      throw new CustomerNotAuthorizedException();
    }
  }
}
