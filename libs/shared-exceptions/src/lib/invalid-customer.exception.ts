import { RpcException } from "@nestjs/microservices";

/**
 * A custom exception class that extends the `RpcException` class from the `@nestjs/microservices` package.
 * It is used to handle and throw exceptions related to invalid customers or users.
 */
export class InvalidCustomerException extends RpcException {
  constructor(){
    super({ message: "Cliente o usuario invalido", code: 404});
  };
}
