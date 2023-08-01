import { HttpException, HttpStatus } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

export class InvalidCredentialsException extends RpcException {
  constructor() {
    super({ message: 'Invalid credentials', code: 401 });
  }
}
