<template>
  <div class="burger-logo">
    <input v-model="isBurgerTrue" type="checkbox" id="checkbox" />
    <label for="checkbox" class="toggle">
      <div class="bars" id="bar1"></div>
      <div class="bars" id="bar2"></div>
      <div class="bars" id="bar3"></div>
    </label>
  </div>
  <transition name="slide" mode="out-in">
    <div class="burger-menu" v-if="isBurgerTrue">
      <ul class="user__wrapper">
        <li class="user__item header">Profile Settings</li>
        <li class="user__item" :class="{ active: isActive === 'Account' }" @click="setProfileOptions('Account')">
          Account
        </li>
        <li
          class="user__item"
          :class="{ active: isActive === 'Billing address' }"
          @click="setProfileOptions('Billing address')"
        >
          Billing address
        </li>
        <li
          class="user__item"
          :class="{ active: isActive === 'Shipping address' }"
          @click="setProfileOptions('Shipping address')"
        >
          Shipping address
        </li>
      </ul>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isBurgerTrue = ref(false);
const profileOptions = ref('');
const isActive = ref('Account');

const emit = defineEmits(['set-option']);

function setProfileOptions(option: string) {
  isBurgerTrue.value = !isBurgerTrue.value;
  profileOptions.value = option;
  isActive.value = option;
  emit('set-option', profileOptions.value);
}
</script>

<style lang="scss" scoped>
.burger-menu {
  position: absolute;
  top: 0;
  left: 0;
  padding: 30px 20px;
  width: 100%;
  height: 100%;
  background-color: #5b5858;
  z-index: 5;
}
.user {
  &__wrapper {
    text-align: left;
  }
  &__item {
    line-height: 50px;
    transition: background-color 0.2s;
    &:not(.header) {
      cursor: pointer;
    }
    &:not(.header):hover {
      background-color: #dfdfe029;
    }
    &.header {
      font-weight: 900;
      font-size: 20px;
    }
    &:not(:last-child) {
      border-bottom: 1px solid #fefefecc;
    }
  }
}
.burger-logo {
  position: relative;
  z-index: 10;
  @media (min-width: 600px) {
    display: none;
  }
}
#checkbox {
  display: none;
}

.toggle {
  position: relative;
  width: calc(25px + (35 - 25) * ((100vw - 320px) / (600 - 320)));
  height: calc(25px + (35 - 25) * ((100vw - 320px) / (600 - 320)));
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: calc(4px + (7 - 4) * ((100vw - 320px) / (600 - 320)));
  transition-duration: 0.5s;
  @media (max-width: 600px) {
  }
}

.bars {
  width: 100%;
  height: calc(2px + (3 - 2) * ((100vw - 320px) / (600 - 320)));
  background-color: #fefefecc;
  border-radius: 4px;
}

#bar2 {
  transition-duration: 0.8s;
}

#bar1,
#bar3 {
  width: 70%;
}

#checkbox:checked + .toggle .bars {
  position: absolute;
  transition-duration: 0.5s;
}

#checkbox:checked + .toggle #bar2 {
  transform: scaleX(0);
  transition-duration: 0.5s;
}

#checkbox:checked + .toggle #bar1 {
  width: 100%;
  transform: rotate(45deg);
  transition-duration: 0.5s;
}

#checkbox:checked + .toggle #bar3 {
  width: 100%;
  transform: rotate(-45deg);
  transition-duration: 0.5s;
}

#checkbox:checked + .toggle {
  transition-duration: 0.5s;
  transform: rotate(180deg);
}

.slide-enter,
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-leave-active,
.slide-enter-active {
  transition: all 0.3s ease;
}
</style>
