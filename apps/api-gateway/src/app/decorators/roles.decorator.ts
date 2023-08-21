import { SetMetadata } from "@nestjs/common";

/**
 * Decorator function used in the NestJS framework to set metadata on a class or method, defining the roles allowed to access it.
 * @param roles - The roles allowed to access the decorated class or method.
 * @returns A decorator function that sets the metadata with the provided roles.
 */
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);