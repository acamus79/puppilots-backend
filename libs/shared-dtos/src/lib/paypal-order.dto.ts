export class PaypalOrderDto {
  intent: string;
  purchase_units: Purchaseunit[];
  application_context: Applicationcontext;
}

interface Applicationcontext {
  return_url: string;
  cancel_url: string;
}

interface Purchaseunit {
  items: Item[];
  amount: Amount;
}

interface Amount {
  currency_code: string;
  value: string;
  breakdown: Breakdown;
}

interface Breakdown {
  item_total: Unitamount;
}

interface Item {
  name: string;
  description: string;
  quantity: string;
  unit_amount: Unitamount;
}

interface Unitamount {
  currency_code: string;
  value: string;
}