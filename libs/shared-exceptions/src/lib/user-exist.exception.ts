import { RpcException } from "@nestjs/microservices";

export class UserExistException extends RpcException{
  constructor(){
    super({ message: 'El usuario ya existe', code: 409 });
  }
}
