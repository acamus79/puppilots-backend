import { Injectable, Logger } from '@nestjs/common';
import { Walks, WalksPayload, WalksPilots } from '@prisma/client';
import { AceptPilotDto, WalkDto } from '@puppilots/shared-dtos';
import {
  CustomerNotAuthorizedException,
  CustomerNotExistException,
  InvalidCustomerException,
  OnePostulationPerPilotException,
  PuppilotsServerErrorException,
  UserNotExistException
} from '@puppilots/shared-exceptions';
import { PrismaService } from '@puppilots/shared-services';

/**
 * The `AppService` class is responsible for handling the business logic related to walks in the application.
 * It provides methods for creating walks, accepting pilots for walks, postulating walks,
 * and finding walks based on different criteria.
 */
@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly prismaService: PrismaService) { }


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

  /**
   * Accepts a pilot for a walk and updates the walk with the provided pilot ID.
   * Deactivates all other pilot postulations for the same walk.
   * 
   * @param aceptPilot - An object containing the pilot ID and walk ID.
   * @param userId - The ID of the user performing the action.
   * @returns The updated walk object with the pilot and updated fields.
   * @throws {PuppilotsServerErrorException} If any error occurs during the process.
   */
  async aceptPilot(aceptPilot: AceptPilotDto, userId: string): Promise<Walks> {
    const now = new Date();
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
  /**
   * Creates a new postulation for a walk.
   * 
   * @param {string} walkId - The ID of the walk for which the postulation is being created.
   * @param {string} userId - The ID of the user who is making the postulation.
   * @returns {Promise<WalksPilots>} The newly created postulation for the walk.
   * @throws {PuppilotsServerErrorException} If an error occurs during the pilot retrieval.
   * @throws {OnePostulationPerPilotException} If an error occurs during the creation of the entry in the walksPilots table.
   */
  async postulateWalk(walkId: string, userId: string): Promise<WalksPilots> {
    this.logger.debug({ walkId, userId });
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

    const customer = await this.prismaService.costumer.findFirst({
      where: { userId: userId },
    })
    .catch(() => {
      throw new PuppilotsServerErrorException();
    });

    if (!customer) {
      throw new CustomerNotExistException();
    }

    const puppet = await this.prismaService.puppets.findFirst({
      where: { costumerId: customer.id, id: puppetId },
    })
    .catch(() => {
      throw new PuppilotsServerErrorException();
    });

    if (customer.userId !== userId && !puppet) {
      throw new CustomerNotAuthorizedException();
    }
  }

  async findWalksPerCityActive(cityName: string, userId: string): Promise<Walks[]> {
    const walks: Walks[] = await this.prismaService.$queryRaw`
      SELECT w.*
      FROM walks AS w
      JOIN puppets AS p ON w.puppetId = p.id
      JOIN costumer AS c ON p.costumerId = c.id
      JOIN address AS a ON c.addressId = a.id
      WHERE a.name = ${cityName} AND w.endRealDate != null
    `;
    return walks;
  }

  /**
   * Retrieves a list of available walks for a pilot based on their user ID.
   * 
   * @param userId - The ID of the pilot user.
   * @returns A promise that resolves to an array of Walks objects representing the available walks for the pilot.
   * @throws UserNotExistException if the pilot does not exist for the provided user ID.
   */
  async findWalksOfferPerPilot(userId: string): Promise<Walks[]> {

    // Find the Pilot by the userId
    const pilot = await this.prismaService.pilot.findFirst({
      where: { userId: userId },
      include: {
        address: true
      }
    });

    this.logger.debug(userId);
    this.logger.debug(pilot);

    // If there's no pilot for this user, throw an exception
    if (!pilot) {
      throw new UserNotExistException();
      this.logger.error("El Paseador no existe para este usuario");
    }

    // Find the walks that are active and don't have an assigned pilot
    const walks: Walks[] = await this.prismaService.$queryRaw`
      SELECT w.id as "walkId", wp.active, w.*, p.name as "puppetName", p.breed, p.size,p.sex, c.*,
      a.country, a.city, a.street, a.number, a.floor, a.department, a.latitude,
      a.longitude, a.references
      FROM "Walks" w
      JOIN "Puppets" AS p ON w."puppetId" = p.id
      JOIN "Costumer" AS c ON p."costumerId" = c.id
      JOIN "Address" AS a ON c."addressId" = a.id
      LEFT JOIN "walks_pilots" AS wp ON w."id"= wp."idWalks" AND wp."idPilot"::text = ${pilot.id}
      WHERE a."city" = ${pilot.address.city}
      AND w."endRealDate" is null AND w."pilotId" is null
    `;
    this.logger.debug(pilot.address.city)
    this.logger.debug(walks)

    const mapWalks = walks.map(item => {
      return {
        ...item,
        customerId: item.id,
        id: undefined
      };
    });

    return mapWalks;
  }

  async findWalksPerCityNeedingPilot(cityName: string): Promise<Walks[]> {
    const walks: Walks[] = await this.prismaService.$queryRaw`
      SELECT p.*, p.name as puppetName, c.*, a.*, w.*
      FROM "Walks" w
      JOIN "Puppets" AS p ON w."puppetId" = p.id
      JOIN "Costumer" AS c ON p."costumerId" = c.id
      JOIN "Address" AS a ON c."addressId" = a.id
      WHERE a."city" = ${cityName}
      AND w."endRealDate" is null AND w."pilotId" is not null
    `;
    this.logger.debug(cityName)
    this.logger.debug(walks)

    return walks;

  }

  /**
   * Retrieves a list of unfinished walks for a given pilot by their user ID.
   * 
   * @param userId - The ID of the user (pilot) for whom to find the unfinished walks.
   * @returns An array of Walks objects representing the unfinished walks for the given pilot.
   * @throws UserNotExistException if no pilot is found with the given user ID.
   */
  async findWalksPerPilotNotFinished(userId: string): Promise<Walks[]> {
    const pilot = await this.prismaService.pilot.findFirst({
      where: { userId: userId }
    });

    this.logger.debug(userId);
    this.logger.debug(pilot);

    if (!pilot) {
      throw new UserNotExistException();
      this.logger.error("El Paseador no existe para este usuario");
    }

    const walks: Walks[] = await this.prismaService.walks.findMany({
      where: { pilotId: pilot.id, endRealDate: null },
      include: {
        puppet: {
          include: {
            costumer: {
              include: {
                address: true
              }
            }
          }
        }
      }
    });

    this.logger.debug(walks)
    return walks;
  }

  /**
   * Retrieves the postulations for a specific walk, given the walk ID and user ID.
   * 
   * @param walkId - The ID of the walk for which the postulations are being retrieved.
   * @param userId - The ID of the user who is making the request.
   * @returns An array of WalksPilots objects representing the postulations for the specified walk, including the associated pilots and their addresses.
   * @throws {CustomerNotAuthorizedException} If no walk is found with the specified walkId and userId.
   */
  async findWalksPostulations(walkId: string, userId: string): Promise<WalksPilots[]> {
    this.logger.debug({ walkID: walkId, userId: userId });
    const walk = await this.prismaService.walks.findFirst({
      where: { id: walkId, createdById: userId }
    })
    this.logger.debug("WalkPilot Find:", walk)

    if (!walk) {
      throw new CustomerNotAuthorizedException();
    }

    const walksPilots = await this.prismaService.walksPilots.findMany({
      where: {
        idWalks: walkId
      },
      include: {
        pilots: {
          include: {
            address: true
          }
        },
        walks: true
      }
    });

    return walksPilots;
  }

  async pillotStartWalk(walkId: string, userId: string): Promise<Walks> {
    const startWalk = await this.prismaService.walks.update({
      where: { id: walkId },
      data:{
        beginRealDate: new Date().toISOString(),
        updatedById: userId
      }
    });
    return startWalk;
  }
  
  async pilotEndWalk(walkId: string, userId: string): Promise<Walks> {
    const endWalk = await this.prismaService.walks.update({
      where: { id: walkId },
      data:{
        endRealDate: new Date().toISOString(),
        updatedById: userId
      }
    });
    return endWalk;
  }


}
