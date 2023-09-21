<template>
  <div class="user__wrapper">
    <div class="user__header">
      <h1 class="user__settings-header">User Profile</h1>
      <burger-menu @set-option="setProfileOption"></burger-menu>
    </div>
    <div class="user__settings">
      <base-card class="user__profile">
        <profile-settings @set-option="setProfileOption" />
      </base-card>
      <transition mode="out-in">
        <div class="user__info-wrapper" v-if="profileHeader === 'Account' && !isLoading">
          <base-card class="user__info">
            <ProfileInfo />
          </base-card>
        </div>
        <div class="user__info-wrapper" v-else-if="profileHeader === 'Password' && !isLoading">
          <base-card class="user__info">
            <PasswordCard />
          </base-card>
        </div>
        <div class="user__info-wrapper" v-else-if="profileHeader === 'Address' && !isLoading">
          <base-card class="user__info add-address" @click="isNewAddress = !isNewAddress">
            <h1>Add new address</h1>
            <font-awesome-icon :class="{ active: isNewAddress }" icon="fa-solid fa-right-long" />
          </base-card>
          <transition name="new-address">
            <base-card class="user__info" v-if="isNewAddress">
              <NewAddress v-model="isNewAddress" />
            </base-card>
          </transition>
          <transition-group>
            <base-card class="user__info" v-for="address in getAddresses" :key="address.id">
              <AddressCard :address="address" :defaultAddresses="defaultAddresses" />
            </base-card>
          </transition-group>
        </div>
        <div class="user__info-wrapper" v-else>
          <base-card class="user__info">
            <base-spinner title="loading"></base-spinner>
          </base-card>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProfileSettings from '@/components/user-page/ProfileSettings.vue';
import ProfileInfo from '@/components/user-page/ProfileInfo.vue';
import AddressCard from '@/components/user-page/AddressCard.vue';
import BurgerMenu from '@/components/user-page/BurgerMenu.vue';
import NewAddress from '@/components/user-page/NewAddress.vue';
import PasswordCard from '@/components/user-page/PasswordCard.vue';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
let profileHeader = ref('Account');
const isLoading = ref(false);
const getAddresses = computed(() => {
  return store.getters['customer/getAddresses'];
});
const isNewAddress = ref(false);
const defaultAddresses = computed(() => {
  return store.getters['customer/getDefaultAddresses'];
});

function setProfileOption(option: string) {
  profileHeader.value = option;

  if (option === 'Address') {
    getCustomerData();
  }
}

async function getCustomerData() {
  try {
    isLoading.value = true;
    await store.dispatch('customer/getCustomer');
    isLoading.value = false;
  } catch (err) {
    console.log(err);
  }
}
getCustomerData();
</script>

<style lang="scss" scoped>
$mainTextColor: #fefefecc;
.add-address {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: 0.2s;
  & svg {
    transform: rotate(-90deg);
    transition: 0.2s;
    &.active {
      transform: rotate(90deg);
    }
  }
  &:hover {
    opacity: 0.8;
  }
  & h1 {
    font-size: 20px;
    font-weight: 900;
    transition: 0.5s ease;
    @media (max-width: 600px) {
      font-size: calc(16px + (20 - 16) * ((100vw - 320px) / (600 - 320)));
    }
  }
}
.user {
  &__wrapper {
    padding: 50px;
    color: $mainTextColor;
    @media (max-width: 600px) {
      padding: calc(15px + (50 - 15) * ((100vw - 320px) / (600 - 320)));
    }
    &__settings-header {
      font-size: 30px;
      @media (max-width: 600px) {
        font-size: calc(16px + (30 - 16) * ((100vw - 320px) / (600 - 320)));
      }
      text-align: left;
    }
  }
  &__settings {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
  }
  &__profile {
    max-width: 300px;
    width: 100%;
    background: #1c1c1c;
    @media (max-width: 600px) {
      display: none;
    }
  }
  &__info {
    width: 100%;
    background: #1c1c1c;
    &-wrapper {
      width: 100%;
    }
  }
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.v-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.v-enter-active,
.v-leave-active {
  transition: 0.5s ease;
}
.new-address-leave-to,
.new-address-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.new-address-enter-active,
.new-address-leave-active {
  transition: 0.5s ease;
}
</style>
