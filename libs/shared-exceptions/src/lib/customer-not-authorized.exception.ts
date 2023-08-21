import { RpcException } from "@nestjs/microservices";

/**
 * A custom exception class for handling cases where a customer
 * is not authorized to perform a certain action.
 */
export class CustomerNotAuthorizedException extends RpcException {
  constructor(){
    super({ message: "El cliente no tiene permisos para ejecutar esta acción", code: 404});
  };
}
