export interface CheckoutForm {
  id?: string;
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
  streetaddress: string;
  country: string;
  postal: string;
  city: string;
  province: string;
  card: string;
  expiration: string;
  cvv: string;
  date?: string;
}

export interface CheckoutFormErrors {
  firstname?: string;
  lastname?: string;
  email?: string;
  phonenumber?: string;
  streetaddress?: string;
  country?: string;
  postal?: string;
  city?: string;
  province?: string;
  card?: string;
  expiration?: string;
  cvv?: string;
}
