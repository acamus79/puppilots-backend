import { Injectable, Logger } from '@nestjs/common';
import { UserRegisterEvent } from '@puppilots/shared-dtos';
import { EmailService } from './email.service';
import { EmailDto } from '../dto/email.dto';
import { readFileSync } from 'fs';
import path from 'path';
import { firstValueFrom } from 'rxjs';
import { Role } from '@prisma/client';

@Injectable()
export class AppService {
  private readonly FROM = "Puppilots<puppilots@programacion-es.dev>";
  private readonly PATTERN_CLEANING_TEMPLATE = new RegExp("\\r\\n","g");

  constructor(private emailService: EmailService){}

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async sendEmailOfRegister(data: UserRegisterEvent){
    const email = new EmailDto();

    email.from = this.FROM;
    email.to = data.email; // Enter email for test
    email.subject = "Bienvenido a Puppilots 🐕‍🦺";
    email.html = data.role == Role.CUSTOMER ? this.getTemplate("register-client.html") : this.getTemplate("register-pilot.html");
    email.substitutions['email'] = data.email;

    const response = await firstValueFrom(this.emailService.send(email))
                     .then( res => {
                      Logger.log(`Email sent to: ${email.to}`);
                      return res.data
                     })
                     .catch( err => {
                        Logger.error(`Error al enviar correo a ${data.email}.`, err)
                      });
  }

  private getTemplate(fileName: string){
    return readFileSync(path.resolve(`${__dirname}/assets/${fileName}`), "utf-8").replace(this.PATTERN_CLEANING_TEMPLATE, "");;
  }

}
