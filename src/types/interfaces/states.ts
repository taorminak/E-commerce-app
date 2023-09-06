import { ProductItem } from '@/types/interfaces/productItem';
import { CartItem } from '@/types/interfaces/cartItem';

export interface CustomerState {
  isLoggedIn: boolean;
  currentUserFirstName: string;
  currentUserId: string;
  version: number;
  defaultAddresses: {
    billingId: string;
    shippingId: string;
  };
  user: {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    address: IAddress[];
  };
}

export interface IAddress {
  streetName: string;
  city: string;
  phone: string;
  postalCode: string;
  country: string;
  id: string;
}

export interface GlobalState {
  customer: CustomerState;
  products: ProductsState;
}

export interface ProductsState {
  products: ProductItem[];
  cart: CartItem[];
  priceRange: number;
  selectedCategories: {
    [key: string]: {
      value: string;
      selected: boolean;
    };
  };
}
