<template>
  <form class="password-wrapper" @submit.prevent="submitHandler">
    <div class="form-control">
      <label class="label-input" for="password"
        >Current password
        <input
          id="password"
          type="text"
          placeholder="Enter your password"
          v-model.trim="formData.currentPassword"
          @input="v$.currentPassword.$validate"
          :class="{
            error:
              (v$.currentPassword.$dirty && v$.currentPassword.required.$invalid) ||
              (v$.currentPassword.$dirty && v$.currentPassword.validatePassword.$invalid),
          }"
        />
      </label>
      <div class="input-errors" v-if="v$.currentPassword.$dirty && v$.currentPassword.required.$invalid">
        <div class="error-msg">Enter password</div>
      </div>
      <div class="input-errors" v-else-if="v$.currentPassword.$dirty && v$.currentPassword.validatePassword.$invalid">
        <div class="error-msg">
          Password should contain minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number.
        </div>
      </div>
    </div>
    <div class="form-control">
      <label class="label-input" for="password"
        >New password
        <input
          id="password"
          type="text"
          placeholder="Enter your password"
          v-model.trim="formData.newPassword"
          @input="v$.newPassword.$validate"
          :class="{
            error:
              (v$.newPassword.$dirty && v$.newPassword.required.$invalid) ||
              (v$.newPassword.$dirty && v$.newPassword.validatePassword.$invalid) ||
              (v$.newPassword.$dirty && !v$.newPassword.isPasswordConfirmed.$invalid),
          }"
        />
      </label>
      <div class="input-errors" v-if="v$.newPassword.$dirty && v$.newPassword.required.$invalid">
        <div class="error-msg">Enter password</div>
      </div>
      <div class="input-errors" v-else-if="v$.newPassword.$dirty && v$.newPassword.validatePassword.$invalid">
        <div class="error-msg">
          Password should contain minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number.
        </div>
      </div>
    </div>
    <div class="form-control">
      <label class="label-input" for="password"
        >Confirm password
        <input
          id="password"
          type="text"
          placeholder="Enter your password"
          v-model.trim="formData.confirmPassword"
          @input="v$.confirmPassword.$validate"
          :class="{
            error:
              (v$.confirmPassword.$dirty && v$.confirmPassword.required.$invalid) ||
              (v$.confirmPassword.$dirty && v$.confirmPassword.validatePassword.$invalid),
          }"
        />
      </label>
      <div class="input-errors" v-if="v$.confirmPassword.$dirty && v$.confirmPassword.required.$invalid">
        <div class="error-msg">Enter password</div>
      </div>
      <div class="input-errors" v-else-if="v$.confirmPassword.$dirty && v$.confirmPassword.validatePassword.$invalid">
        <div class="error-msg">
          Password should contain minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number.
        </div>
      </div>
    </div>
    <base-auth-button type>save</base-auth-button>
  </form>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { reactive, computed } from 'vue';
import { required } from '@vuelidate/validators';
import { validatePassword } from '@/utils/auth/validator';
import { useStore } from 'vuex';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const store = useStore();
const formData = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
});

const rules = computed(() => {
  return {
    currentPassword: { required, validatePassword },
    newPassword: { required, validatePassword, isPasswordConfirmed },
    confirmPassword: { required, validatePassword, isPasswordConfirmed },
  };
});

const isPasswordConfirmed = computed(() => {
  return formData.newPassword === formData.confirmPassword;
});

const v$ = useVuelidate(rules, formData);

// eslint-disable-next-line max-lines-per-function
async function submitHandler() {
  const isFormCorrect = await v$.value.$validate();

  if (isFormCorrect) return;

  try {
    const updateCustomer = async () => {
      const customer = await store.dispatch('customer/getCustomer');
      const id = customer.body.id;
      const version = customer.body.version;
      const newPassword = formData.newPassword;
      const currentPassword = formData.currentPassword;

      const body = {
        id,
        version,
        currentPassword,
        newPassword,
      };

      const res = await store.dispatch('customer/changePassword', body);

      store.commit('customer/setVersion', res.body.version);
    };

    toast.promise(
      updateCustomer,
      {
        pending: 'Password is updating',
        success: 'Password has updated 👌',
        error: 'The given current password does not match 🤯',
      },
      {
        theme: 'dark',
        icon: '🎉',
        transition: toast.TRANSITIONS.SLIDE,
      },
    );
  } catch (err) {
    console.log(err);
  }
}
</script>

<style lang="scss" scoped>
$errorColor: #ff3333;
$mainWhiteColor: #fefefe;
$darkBackgroundColor: #010101;

.password-wrapper {
  display: flex;
  flex-direction: column;
  gap: 15px;
  & .form-control {
    display: flex;
    flex-direction: column;
    gap: 10px;
    & div {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;
    }
    & .input-errors {
      & .error-msg {
        color: $errorColor;
        text-align: left;
        font-size: 13px;
        @media (max-width: 1200px) {
          font-size: calc(10px + 3 * ((100vw - 320px) / (1200 - 320)));
        }
      }
    }
    & label {
      color: $mainWhiteColor;
      opacity: 0.8;
      white-space: nowrap;
      font-size: 16px;
      @media (max-width: 1200px) {
        font-size: calc(13px + 3 * ((100vw - 320px) / (1200 - 320)));
      }

      &.label-input {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
    }
    & input:-webkit-autofill,
    & input:-webkit-autofill:focus {
      transition: background-color 0s 600000s, color 0s 600000s;
    }
    & input::-webkit-outer-spin-button,
    & input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    /* Firefox */
    & input[type='number'] {
      -moz-appearance: textfield;
      appearance: textfield;
    }
    & input {
      width: 100%;
      padding: 10px 15px;
      border-radius: 6px;
      font-family: inherit;
      background: $darkBackgroundColor;
      border: 1px solid #383636;
      color: $mainWhiteColor;
      font-size: 15px;
      transition: 0.2s;
      @media (max-width: 1200px) {
        padding-top: calc(5px + 5 * ((100vw - 320px) / (1200 - 320)));
        padding-bottom: calc(5px + 5 * ((100vw - 320px) / (1200 - 320)));
        padding-left: calc(5px + 10 * ((100vw - 320px) / (1200 - 320)));
        padding-right: calc(5px + 10 * ((100vw - 320px) / (1200 - 320)));
        font-size: calc(13px + 2 * ((100vw - 320px) / (1200 - 320)));
      }
      &.disabled {
        opacity: 0.3;
        cursor: no-drop;
      }
      &.error {
        color: $errorColor;
        border: 1px solid $errorColor;
        background: #ffe6e6;
      }
      &::placeholder {
        opacity: 0.8;
      }
      &:focus {
        outline: none;
        border-color: $mainWhiteColor;
      }
    }
  }
}
</style>
