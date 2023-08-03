import { RpcException } from "@nestjs/microservices";

export class UnauthorizedTokenException extends RpcException {
  constructor() {
    super({ message: 'Invalid Token', code: 401})
  }
}