import { Request } from "@nestjs/common";
import { Role } from "@prisma/client";

/**
 * Interface called `Authenticatedrequest` that extends the `Request` interface 
 * from the `@nestjs/common` module.It also imports the `Role` type 
 * from the `@prisma/client` module and defines an interface called `UserPayload`
 */
interface UserPayload {
  sub: string;
  id?: string;
  role: Role;
  [key: string]: any;
}

export interface Authenticatedrequest extends Request {
  user: UserPayload;
}