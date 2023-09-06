export interface DataFormAddress {
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  id?: string;
}

interface BodyForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  addresses: DataFormAddress[];
  billingAddresses: number[];
  shippingAddresses: number[];
  version: number;
  defaultBillingAddressId?: string;
  defaultShippingAddressId?: string;
}

export interface RegisterData {
  body: BodyForm;
}

export interface PersonalAccount {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  version: number;
}
