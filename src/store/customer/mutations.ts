import { ServerResponse } from '@/types/interfaces/api';
import { CustomerState, IAddress } from '@/types/interfaces/states';
import { RegisterData } from '@/types/auth/RegisterData';

export default {
  SET_USER(state: CustomerState, body: ServerResponse) {
    const firstNameUser = body.customer.firstName || 'New User';

    state.currentUserId = body.customer.id;
    state.currentUserFirstName = firstNameUser;
    state.isLoggedIn = true;
  },
  SIGN_UP(state: CustomerState, body: ServerResponse) {
    state.currentUserFirstName = body.customer.firstName;
    state.isLoggedIn = true;
  },
  logout(state: CustomerState) {
    state.currentUserId = '';
    state.currentUserFirstName = '';
    state.isLoggedIn = false;
    localStorage.clear();
  },
  setLoggedIn(state: CustomerState, payload: { isLoggedInValue: boolean; hasId: string }) {
    state.isLoggedIn = payload.isLoggedInValue;
    state.currentUserId = payload.hasId;
  },
  getUser(state: CustomerState, payload: RegisterData) {
    state.user.firstName = payload.body.firstName;
    state.user.lastName = payload.body.lastName;
    state.user.email = payload.body.email;
    state.user.dateOfBirth = payload.body.dateOfBirth;
    state.version = payload.body.version;

    if (payload.body.defaultBillingAddressId) state.defaultAddresses.billingId = payload.body.defaultBillingAddressId;

    if (payload.body.defaultShippingAddressId)
      state.defaultAddresses.shippingId = payload.body.defaultShippingAddressId;
    payload.body.addresses.forEach((obj) => {
      const address = {
        streetName: obj.streetName,
        city: obj.city,
        phone: obj.phone,
        postalCode: obj.postalCode,
        country: obj.country,
        id: obj.id ? obj.id : '',
      };

      state.user.address.push(address);
    });
  },
  setVersion(state: CustomerState, payload: number) {
    state.version = payload;
  },
  deleteAddress(state: CustomerState, id: string) {
    state.user.address = state.user.address.filter((obj) => obj.id !== id);
  },
  addNewAddress(state: CustomerState, payload: IAddress) {
    state.user.address.push(payload);
  },
};
