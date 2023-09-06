import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import BaseAuth from '@/components/ui/auth/BaseAuth.vue';
import BaseButton from '@/components/ui/auth/BaseButton.vue';
import BaseSpinner from '@/components/ui/BaseSpinner.vue';
import BaseCard from '@/components/ui/user-page/BaseCard.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faPenToSquare,
  faRightLong,
  faDollarSign,
  faSearch,
  faCartShopping,
  faBars,
  faEye,
  faEyeSlash,
  faCheck,
  faHeart,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
library.add(
  faCheck,
  faPenToSquare,
  faDollarSign,
  faSearch,
  faCartShopping,
  faBars,
  faRightLong,
  faXTwitter,
  faVk,
  faInstagram,
  faDiscord,
  faEye,
  faEyeSlash,
  faXmark,
  faHeart,
  faXmark,
);
import { clickOutSide as vClickOutSide } from '@mahdikhashan/vue3-click-outside';
import { faDiscord, faInstagram, faVk, faXTwitter } from '@fortawesome/free-brands-svg-icons';

const app = createApp(App);

app.component('base-auth-button', BaseButton);
app.component('base-auth-wrapper', BaseAuth);
app.component('base-spinner', BaseSpinner);
app.component('base-card', BaseCard);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(store);
app.use(router);
app.directive('click-out-side', vClickOutSide);
app.mount('#app');
