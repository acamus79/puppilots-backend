export interface paypalCaptureResponseDto {
  id: string;
  status: string;
  purchase_units: Purchaseunit[];
  payer: Payer;
  links: Link[];
}

interface Payer {
  name: Name2;
  email_address: string;
  payer_id: string;
  address: Address2;
}

interface Address2 {
  country_code: string;
}

interface Name2 {
  given_name: string;
  surname: string;
}

interface Purchaseunit {
  reference_id: string;
  shipping: Shipping;
  payments: Payments;
}

interface Payments {
  captures: Capture[];
}

interface Capture {
  id: string;
  status: string;
  amount: Amount;
  final_capture: boolean;
  seller_protection: Sellerprotection;
  seller_receivable_breakdown: Sellerreceivablebreakdown;
  links: Link[];
  create_time: string;
  update_time: string;
}

interface Link {
  href: string;
  rel: string;
  method: string;
}

interface Sellerreceivablebreakdown {
  gross_amount: Amount;
  paypal_fee: Amount;
  net_amount: Amount;
}

interface Sellerprotection {
  status: string;
  dispute_categories: string[];
}

interface Amount {
  currency_code: string;
  value: string;
}

interface Shipping {
  name: Name;
  address: Address;
}

interface Address {
  address_line_1: string;
  admin_area_2: string;
  admin_area_1: string;
  postal_code: string;
  country_code: string;
}

interface Name {
  full_name: string;
}