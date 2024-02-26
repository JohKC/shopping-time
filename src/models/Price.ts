import { Currency } from "./Currency";

export interface Price {
  currency: Currency;
  amount: number;
}
