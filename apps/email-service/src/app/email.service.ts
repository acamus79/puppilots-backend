import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { Observable, catchError } from "rxjs";
import { EmailDto } from "../dto/email.dto";

@Injectable()
export class EmailService {

   requestConfig: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${process.env.AUTH_TOKEN_SEND_IT_SIMPLE}`
    }
  };

  constructor(private readonly httpService: HttpService){}

   send(content: EmailDto){
    return this.httpService.post("https://api.envialosimple.email/api/v1/mail/send", content, this.requestConfig);
  }

}
