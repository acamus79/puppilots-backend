import { RpcException } from "@nestjs/microservices";

/**
 * A custom exception class for handling server errors
 * that occur during the processing of a request.
 */
export class PuppilotsServerErrorException extends RpcException {
  constructor(){
    super({ message: "Error en el servidor al procesar la solicitud", code: 500});
  };
}
