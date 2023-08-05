import { RpcException } from "@nestjs/microservices";

export class UserNotExistException extends RpcException {
  constructor(){
    super({ message: "El usuario no existe", code: 404});
  };
}
