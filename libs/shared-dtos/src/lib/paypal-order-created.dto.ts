export interface PaypalOrderCreate {
  id: string;
  intent: string;
  status: string;
  purchase_units: Purchaseunit[];
  create_time: string;
  links: Link[];
}

interface Link {
  href: string;
  rel: string;
  method: string;
}

interface Purchaseunit {
  reference_id: string;
  amount: Amount;
  payee: Payee;
}

interface Payee {
  email_address: string;
  merchant_id: string;
}

interface Amount {
  currency_code: string;
  value: string;
}