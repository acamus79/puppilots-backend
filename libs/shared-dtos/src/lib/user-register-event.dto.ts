import { Role } from "@prisma/client";

export class UserRegisterEvent{
  constructor(public email: string, public role: Role){}
}
