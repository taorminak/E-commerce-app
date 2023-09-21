import { GetterTree } from 'vuex';
import { CustomerState, GlobalState } from '@/types/interfaces/states';

const getters: GetterTree<CustomerState, GlobalState> = {
  getIsLoggedIn(state) {
    return state.isLoggedIn;
  },
  getCurrentUserFirstName(state) {
    return state.currentUserFirstName;
  },
  getUser(state) {
    return state.user;
  },
  getAddresses(state) {
    const addressObj = [...state.user.address].reverse();

    return addressObj;
  },
  getVersion(state) {
    return state.version;
  },
  getDefaultAddresses(state) {
    return state.defaultAddresses;
  },
};

export default getters;
