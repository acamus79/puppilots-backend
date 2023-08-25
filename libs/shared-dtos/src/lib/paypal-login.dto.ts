export class PaypalLoginDto {
  scope: string;
  access_token: string;
  token_type: string;
  app_id: string;
  expires_in: number;
  supported_authn_schemes: string[];
  nonce: string;
  client_metadata: Clientmetadata;
}

class Clientmetadata {
  name: string;
  display_name: string;
  logo_uri: string;
  scopes: string[];
  ui_type: string;
}