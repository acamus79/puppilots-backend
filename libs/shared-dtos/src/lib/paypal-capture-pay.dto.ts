import { IsNotEmpty, IsString } from "class-validator";

export class PaypalCapturePayDto {
  @IsString()
  @IsNotEmpty({ message: "El token del pago de paypal es requerido" })
  paypalToken: string;
}