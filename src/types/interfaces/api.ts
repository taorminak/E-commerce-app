export interface LoginPayload {
  email: string;
  password: string;
}

export interface SingUpPayload {
  body: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    addresses: Addresses[];
    shippingAddresses: number[];
    billingAddresses: number[];
  };
}

interface Customer {
  firstName: string;
  id: string;
}

export interface CustomerSignInResult {
  customer: Customer;
}

interface Addresses {
  country: string;
  city: string;
  streetName: string;
  postalCode: string;
  phone: string;
}

interface ServerCustomerInterface {
  addresses: Addresses[];
  authenticationMode: string;
  billingAddressIds: string[];
  createdAt: string;
  createdBy: {
    clientId: string;
    isPlatformClient: boolean;
  };
  dateOfBirth: string;
  email: string;
  firstName: string;
  id: string;
  isEmailVerified: boolean;
  lastMessageSequenceNumber: number;
  lastModifiedAt: string;
  lastModifiedBy: {
    clientId: string;
    isPlatformClient: boolean;
  };
  lastName: string;
  password: string;
  shippingAddressIds: string[];
  stores: [];
  version: number;
  versionModifiedAt: string;
}

export interface ServerResponse {
  customer: ServerCustomerInterface;
}
