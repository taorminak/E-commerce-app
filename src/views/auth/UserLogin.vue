<template>
  <base-auth-wrapper v-if="!isLoading">
    <form @submit.prevent="submitHandler">
      <div class="form-wrapper">
        <div class="form-control">
          <div class="label">
            Email
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              v-model.trim="formData.email"
              @input="v$.email.$validate"
              :class="{
                error: (v$.email.$dirty && v$.email.required.$invalid) || (v$.email.$dirty && v$.email.email.$invalid),
              }"
            />
          </div>
          <div class="input-errors" v-if="v$.email.$dirty && v$.email.required.$invalid">
            <div class="error-msg">Email can't be empty</div>
          </div>
          <div class="input-errors" v-else-if="v$.email.$dirty && v$.email.email.$invalid">
            <div class="error-msg">Enter valid email address</div>
          </div>
        </div>
        <div class="form-control">
          <div class="label label-input">
            Password
            <input
              id="password"
              :type="isPasswordHidden ? 'password' : 'text'"
              placeholder="Enter your password"
              v-model.trim="formData.password"
              @input="v$.password.$validate"
              :class="{
                error:
                  (v$.password.$dirty && v$.password.required.$invalid) ||
                  (v$.password.$dirty && v$.password.validatePassword.$invalid),
              }"
            />
            <font-awesome-icon
              class="eye-icon"
              :class="{
                error:
                  (v$.password.$dirty && v$.password.required.$invalid) ||
                  (v$.password.$dirty && v$.password.validatePassword.$invalid),
              }"
              icon="fa-solid fa-eye"
              v-if="!isPasswordHidden"
              @click.capture="isPasswordHidden = !isPasswordHidden"
            />
            <font-awesome-icon
              class="eye-icon"
              :class="{
                error:
                  (v$.password.$dirty && v$.password.required.$invalid) ||
                  (v$.password.$dirty && v$.password.validatePassword.$invalid),
              }"
              icon="fa-solid fa-eye-slash"
              v-else
              @click.capture="isPasswordHidden = !isPasswordHidden"
            />
          </div>
          <div class="input-errors" v-if="v$.password.$dirty && v$.password.required.$invalid">
            <div class="error-msg">Enter password</div>
          </div>
          <div class="input-errors" v-else-if="v$.password.$dirty && v$.password.validatePassword.$invalid">
            <div class="error-msg">
              Password should contain minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1
              number.
            </div>
          </div>
        </div>
      </div>
      <base-auth-button mode="true">login</base-auth-button>
    </form>
    <HaveAnAccountForm mode="login" />
  </base-auth-wrapper>
  <base-spinner title="logging in" v-else></base-spinner>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { reactive, computed, ref, Ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import HaveAnAccountForm from '@/components/auth/registration/HaveAnAccountForm.vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import { validatePassword } from '@/utils/auth/validator';
import { LoginData } from '@/types/auth/LoginData';

const store = useStore();
const router = useRouter();
const isPasswordHidden = ref(true);
const formData: LoginData = reactive({
  email: '',
  password: '',
});
const isLoading: Ref<boolean> = ref(false);

const rules = computed(() => {
  return {
    email: { required, email },
    password: { required, validatePassword },
  };
});

const v$ = useVuelidate(rules, formData);

// eslint-disable-next-line max-lines-per-function
const submitHandler = async () => {
  const isFormCorrect = await v$.value.$validate();

  if (!isFormCorrect) {
    return;
  }
  isLoading.value = true;
  try {
    const res = await store.dispatch('customer/login', {
      email: formData.email,
      password: formData.password,
    });

    localStorage.setItem('isLoggedIn', JSON.stringify(true));
    toast.success(`Welcome back, ` + res.customer.firstName, {
      autoClose: 1000,
      theme: 'dark',
      icon: '🎉',
      transition: toast.TRANSITIONS.SLIDE,
      onClose: () => {
        router.push({
          name: 'home',
        });
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      toast.error(err.message, {
        autoClose: 3000,
        theme: 'dark',
        icon: '🔐',
        transition: toast.TRANSITIONS.SLIDE,
        onClose: () => {
          formData.password = '';
          formData.email = '';
          isLoading.value = false;
          v$.value.$reset();
        },
      });
    }
  }
};
</script>

<style lang="scss" scoped>
$errorColor: #ff3333;
$mainWhiteColor: #fefefe;
$darkBackgroundColor: #010101;
.eye-icon {
  position: absolute;
  color: #fefefecc;
  right: 5%;
  top: 60%;
  z-index: 2;
  cursor: pointer;
  &.error {
    color: $darkBackgroundColor;
  }
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  overflow: hidden;
  & .form-wrapper {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    @media (max-width: 1200px) {
      gap: calc(10px + 10 * ((100vw - 320px) / (1200 - 320)));
    }
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
      & .label {
        position: relative;
        color: $mainWhiteColor;
        opacity: 0.8;
        white-space: nowrap;
        font-size: 16px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        @media (max-width: 1200px) {
          font-size: calc(13px + 3 * ((100vw - 320px) / (1200 - 320)));
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
        padding-right: 15%;
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
  & .form-wrapper-step2 {
    display: flex;
    flex-direction: column;
    & .form-control {
      flex-direction: row;
    }
    & label {
      color: $mainWhiteColor;
      opacity: 0.8;
      white-space: nowrap;
      font-size: 16px;
      @media (max-width: 1200px) {
        font-size: calc(13px + 3 * ((100vw - 320px) / (1200 - 320)));
      }
    }
  }
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }

  50%,
  100% {
    left: 100%;
  }
}
</style>
