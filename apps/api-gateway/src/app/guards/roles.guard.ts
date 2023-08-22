import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

/**
 * A NestJS guard that implements the `CanActivate` interface to restrict 
 * access to certain routes based on the roles assigned to the user.
 */
@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService
  ) {};
  
  /**
   * Determines if a user has the required role to access a specific route.
   * @param context - The execution context containing information about the current request.
   * @returns A boolean indicating if the user has the required role.
   * @throws UnauthorizedException if the user does not have the required role or if the authorization header is missing.
   */
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if(!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authorization = request.headers['authorization'];

    if (!authorization) {
      // Handle the absence of an authorization header as you see fit
      // For example, you might reject the request
      throw new UnauthorizedException('Usuario no autorizado!');
    }

    const token = authorization.split(' ')[1];
    const decoded = this.jwtService.decode(token);

    Logger.debug({"role user": decoded['role'], "role needed": roles})

    request.user = decoded;

    // Check roles that user need to access to the resources
    const hasRole = () => roles.includes(decoded['role']);

    return hasRole();
  }

}