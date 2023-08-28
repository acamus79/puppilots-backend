import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Puppets, Role } from '@prisma/client';
import { PuppetDto } from '@puppilots/shared-dtos';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';
import { PuppetService } from './puppet.service';
import { UserId } from './decorators/user-id.decorator';
import { ApiOperation } from '@nestjs/swagger';

@UseGuards(RolesGuard)
@Controller('puppet')
export class PuppetController {
  /**
   * Handles HTTP requests related to puppets.
   * Performs CRUD operations on puppets using the `PuppetService`.
   * Protected by the `RolesGuard` to ensure only authorized users can access the routes.
   */
  constructor(private readonly puppetService: PuppetService) {};

  /**
   * Creates a new puppet.
   * @param puppet - The puppet data.
   * @param userId - The ID of the user creating the puppet.
   * @returns A promise that resolves to the created puppet.
   */
  @Roles(Role.CUSTOMER)
  @Post()
  @ApiOperation({ summary: 'Register a new pet',
                  description: 'Returns a data transfer object with the updated record'})
  async create(
    @Body() puppet: PuppetDto,
    @UserId() userId: string
  ): Promise<Puppets> {
    return await this.puppetService.create(puppet, userId);
  }

  /**
   * Updates an existing puppet.
   * @param puppet - The updated puppet data.
   * @param puppetId - The ID of the puppet to update.
   * @param userId - The ID of the user updating the puppet.
   * @returns A promise that resolves to the updated puppet.
   */
  @Roles(Role.CUSTOMER)
  @Put(':id')
  @ApiOperation({ summary: 'Update a pet by id',
                  description: 'Returns a data transfer object with the updated record'})
  async update(
    @Body() puppet: PuppetDto,
    @Param('id') puppetId: string,
    @UserId() userId: string
  ): Promise<Puppets> {
    return await this.puppetService.update(puppet, puppetId, userId);
  }

  /**
   * Deletes a puppet.
   * @param puppetId - The ID of the puppet to delete.
   * @param userId - The ID of the user deleting the puppet.
   * @returns A promise that resolves to a success message.
   */
  @Roles(Role.CUSTOMER)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a pet by id (soft delete)',
                  description: 'Returns a message for success'})
  async delete(
    @Param('id') puppetId: string,
    @UserId() userId: string
  ): Promise<{ message: string }> {
    await this.puppetService.delete(puppetId, userId);
    return { message: 'Mascota eliminada correctamente' }
  }

  /**
   * Finds puppets by customer ID.
   * @param customerId - The ID of the customer.
   * @returns A promise that resolves to an array of puppets.
   */
  @Roles(Role.CUSTOMER, Role.PILOT)
  @Get('by-customer-id/:id')
  @ApiOperation({ summary: 'Get a pet by customer id',
                  description: 'Returns a data transfer object with the record'})
  async findPuppetByCustommrId(@Param('id') customerId: string): Promise<Puppets[]> {
    return await this.puppetService.findPuppetByCustommrId(customerId);
  }
}
