import { RpcException } from "@nestjs/microservices";

/**
 * Custom exception class for handling cases where a resource is not found.
 */
export class PuppilotsNotFoundException extends RpcException {
  constructor(){
    super({ message: "No se encuentra el recurso al que quieres acceder", code: 404});
  };
}
