<template>
  <div>
    <div class="user__wrapper">
      <div class="user__item header">Profile Settings</div>
      <div class="user__item" :class="{ active: isActive === 'Account' }" @click="setProfileOptions('Account')">
        Personal info
      </div>
      <div class="user__item" :class="{ active: isActive === 'Password' }" @click="setProfileOptions('Password')">
        Change password
      </div>
      <div class="user__item" :class="{ active: isActive === 'Address' }" @click="setProfileOptions('Address')">
        Addresses
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const profileOptions = ref('');
const isActive = ref('Account');

const emit = defineEmits(['set-option']);

function setProfileOptions(option: string) {
  profileOptions.value = option;
  isActive.value = option;
  emit('set-option', profileOptions.value);
}
</script>

<style lang="scss" scoped>
$errorColor: #ff3333;
$mainWhiteColor: #fefefe;
$darkBackgroundColor: #010101;
.user {
  &__wrapper {
    text-align: left;
  }
  &__item {
    line-height: 50px;
    transition: 0.2s;
    &.active {
      background-color: #dfdfe029;
    }
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
</style>
