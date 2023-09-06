import { Module } from 'vuex';
import { ProductsState, GlobalState } from '@/types/interfaces/states';
import actions from '@/store/products/actions';
import mutations from '@/store/products/mutations';
import getters from '@/store/products/getters';

const productsModule: Module<ProductsState, GlobalState> = {
  state: {
    products: [],
    cart: [],
    priceRange: 200,
    selectedCategories: {
      Merch: { value: '0b7fcf32-3835-4e41-8f49-b2d70f0e997d', selected: true },
      Games: { value: '59fa4bdf-195e-4c48-930b-df4ae9429534', selected: true },
      MOBA: { value: '78c0393f-9fc6-4744-96ef-faf666f9102f', selected: true },
      Shooter: { value: 'b222a2a4-da7e-4088-ab08-57700b9327df', selected: true },
      BattleRoyale: { value: '4c6abd1a-f6fc-4aa5-a271-7cb5ff2e4228', selected: true },
      LifeSimulation: { value: '2be077db-42bc-4b9d-aa6d-a62bcfa11d85', selected: true },
      RPG: { value: '0be1c5d8-7680-4426-96d5-26a6989dd9b4', selected: true },
      ActionAdventure: { value: '5402faca-17a1-4830-b92c-292c16d1568d', selected: true },
      Other: { value: 'missing', selected: true },
    },
  },
  mutations,
  actions,
  getters,
};

export default productsModule;
