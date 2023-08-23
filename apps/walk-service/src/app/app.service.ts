import { Injectable, Logger } from '@nestjs/common';
import { Walks, WalksPilots } from '@prisma/client';
import { AceptPilotDto, WalkDto } from '@puppilots/shared-dtos';
import {
  CustomerNotAuthorizedException,
  CustomerNotExistException,
  InvalidCustomerException, OnePostulationPerPilotException, PuppilotsServerErrorException
} from '@puppilots/shared-exceptions';
import { PrismaService } from '@puppilots/shared-services';
import { isNotIn } from 'class-validator';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly prismaService: PrismaService) {}


  /**
   * Creates a walk by saving the provided `WalkDto` object to the database.
   * @param walkDto - The `WalkDto` object containing the walk details.
   * @param userId - The ID of the user.
   * @returns A promise that resolves to the created walk.
   */
  async createWalk(walkDto: WalkDto, userId: string): Promise<Walks> {
    this.authorizeCustomer(walkDto.puppetId, userId);

    const walk = await this.prismaService.walks.create({
      data: {
        beginDate: walkDto.beginDate,
        endDate: walkDto.endDate,
        observations: walkDto.observations || '',
        puppet: {
          connect: {
            id: walkDto.puppetId,
          },
        },
        createdBy: {
          connect: { id: userId },
        },
      },
    })
    .catch(() => {
      throw new PuppilotsServerErrorException();
    });

    this.logger.debug('Walk created successfully');
    return walk;
  }

  async aceptPilot(aceptPilot: AceptPilotDto , userId: string): Promise<Walks> {
    let now = new Date();
    const walk = await this.prismaService.walks.update({
      where: { id: aceptPilot.walkId },
      data: {
        updatedAt: now.toISOString(),
        updatedBy: {
          connect: { id: userId },
        },
        pilot: {
          connect: { id: aceptPilot.pilotId },
        },
      }
    })
    .catch((error) => {
      this.logger.debug(error);

      throw new PuppilotsServerErrorException();
    });

    // activate change to false in all
    await this.prismaService.walksPilots.updateMany({
      where: { idWalks: aceptPilot.walkId },
      data: {
        active: false
      }
    })
    .catch(() => {
      throw new PuppilotsServerErrorException();
    });

    this.logger.debug('Pilot acepted successfully.');

    return walk;
  }

  async postulateWalk(walkId: string , userId: string): Promise<WalksPilots> {
    this.logger.debug({walkId, userId});
    const pilot = await this.prismaService.pilot.findFirst({
      where: { userId: userId }
    })
    .catch(() => {
      throw new PuppilotsServerErrorException();
    });

    const walkPilot = await this.prismaService.walksPilots.create({
      data: { 
        idPilot: pilot.id,
        idWalks: walkId
      },
    })
    .catch(() => {
      throw new OnePostulationPerPilotException();
    });

    this.logger.debug('Postulation created successfully.');

    return walkPilot;
  }

  /**
   * Authorizes a customer by checking if the customer ID and user ID are valid,
   * if the customer exists, and if the customer is authorized to perform the action.
   * @param puppetId - The ID of the puppet.
   * @param userId - The ID of the user.
   * @throws InvalidCustomerException if the customer ID or user ID is invalid.
   * @throws PuppilotsServerErrorException if there is a server error.
   * @throws CustomerNotExistException if the customer does not exist.
   * @throws CustomerNotAuthorizedException if the customer is not authorized.
   */
  async authorizeCustomer(puppetId: string, userId: string) {
    if (!puppetId || !userId) {
      throw new InvalidCustomerException();
    }

    const customer = await this.prismaService.costumer
      .findFirst({
        where: { userId: userId },
      })
      .catch(() => {
        throw new PuppilotsServerErrorException();
      });

    if (!customer) {
      throw new CustomerNotExistException();
    }

    const puppet = await this.prismaService.puppets
      .findFirst({
        where: { costumerId: customer.id, id: puppetId },
      })
      .catch(() => {
        throw new PuppilotsServerErrorException();
      });

    if (customer.userId !== userId && !puppet) {
      throw new CustomerNotAuthorizedException();
    }
  }
}
