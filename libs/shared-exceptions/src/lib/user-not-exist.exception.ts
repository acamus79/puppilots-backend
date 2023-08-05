import { RpcException } from "@nestjs/microservices";

export class UserNotExistException extends RpcException {
  constructor(){
    super({ message: "El usuario ya esta registrado como cliente", code: 400});
  };
}
