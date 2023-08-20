import { RpcException } from "@nestjs/microservices";

/**
 * A custom exception class that extends the `RpcException` class from the `@nestjs/microservices` package.
 * It is used to handle the scenario when a customer does not exist.
 */
export class CustomerNotExistException extends RpcException {
  constructor(){
    super({ message: "El cliente no existe", code: 404});
  };
}
