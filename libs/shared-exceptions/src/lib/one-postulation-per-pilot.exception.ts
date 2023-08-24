import { RpcException } from "@nestjs/microservices";

export class OnePostulationPerPilotException extends RpcException {
  constructor(){
    super({ message: "Solo pudes realizar un postulacion por Paseador", code: 404});
  };
}
