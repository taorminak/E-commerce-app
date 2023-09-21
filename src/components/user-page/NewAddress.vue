<template>
  <div>
    <form @submit.prevent="submitHandler">
      <h1 class="profile__header">New Address</h1>
      <div class="form-wrapper">
        <label>Street</label>
        <div class="form-control">
          <div class="form-item">
            <input
              id="street"
              type="text"
              placeholder="Enter your street"
              v-model="address.streetName"
              @input="v$.streetName.$validate"
              :class="{ error: v$.streetName.$dirty && v$.streetName.required.$invalid }"
            />
          </div>
          <div class="input-errors" v-if="v$.streetName.$dirty && v$.streetName.required.$invalid">
            <div class="error-msg">Must contain at least one character</div>
          </div>
        </div>
        <label>Country</label>
        <div class="form-control">
          <div class="form-item">
            <vSelect
              :countries="countries"
              :selected="selectedCountry"
              v-model="address.country"
              @select="setCountry"
              :class="{ error: v$.country.$dirty && v$.country.required.$invalid }"
            />
          </div>
          <div class="input-errors" v-if="v$.country.$dirty && v$.country.required.$invalid">
            <div class="error-msg">Must be a valid country from a predefined list</div>
          </div>
        </div>
        <div class="form-control">
          <label>City</label>
          <div class="form-item">
            <input
              id="city"
              type="text"
              placeholder="Your city"
              v-model="address.city"
              @input="v$.city.$validate"
              :class="{ error: v$.city.$dirty && v$.city.validateCity.$invalid }"
            />
          </div>
          <div class="input-errors" v-if="v$.city.$dirty && v$.city.validateCity.$invalid">
            <div class="error-msg">Must contain at least one character and no special characters or numbers</div>
          </div>
        </div>
        <label>Phone number</label>
        <div class="form-control">
          <div class="form-item">
            <input
              id="tel"
              type="text"
              inputmode="tel"
              :placeholder="placeholders.phoneNumberPlaceholder"
              :maxlength="v$.phone.number.minLength.$params.min"
              @input="v$.phone.number.$validate"
              v-model="address.phone.number"
              :class="{
                error:
                  (v$.phone.number.$dirty && v$.phone.number.required.$invalid) ||
                  (v$.phone.number.$dirty && v$.phone.number.minLength.$invalid),
              }"
            />
          </div>
          <div class="input-errors" v-if="v$.phone.number.$dirty && v$.phone.number.required.$invalid">
            <div class="error-msg">Enter your phone number</div>
          </div>
          <div class="input-errors" v-else-if="v$.phone.number.$dirty && v$.phone.number.minLength.$invalid">
            <div class="error-msg">Enter a valid phone number</div>
          </div>
        </div>
        <label for="postalCode">Postal code</label>
        <div class="form-control">
          <div class="form-item">
            <input
              id="postalCode"
              type="text"
              :placeholder="placeholders.postalCodePlaceholder"
              v-model="address.postalCode"
              @input="v$.postalCode.$validate"
              :class="{
                error:
                  (v$.postalCode.$dirty && v$.postalCode.required.$invalid) ||
                  (v$.postalCode.$dirty && v$.postalCode.validatePostalCode.$invalid),
              }"
            />
          </div>
          <div class="input-errors" v-if="v$.postalCode.$dirty && v$.postalCode.required.$invalid">
            <div class="error-msg">Enter your postal code</div>
          </div>
          <div class="input-errors" v-else-if="v$.postalCode.$dirty && v$.postalCode.validatePostalCode.$invalid">
            <div class="error-msg">Must follow the format for the country</div>
          </div>
        </div>
      </div>
      <base-auth-button class="submit-button" type>create</base-auth-button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue';
import { useStore } from 'vuex';
import vSelect from '@/components/auth/registration/SelectForm.vue';
import { Country } from '@/types/auth/SelectFormCountry';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';
import { validateCity, validateCountry, formatPhoneNumber } from '@/utils/auth/validator';

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits(['update:modelValue']);

const store = useStore();
const countries = ref([
  { title: 'RU', value: 'Russian Federation' },
  { title: 'US', value: 'The United States' },
]);
const getVersion = computed(() => store.getters['customer/getVersion']);

const address = reactive({
  streetName: '',
  city: '',
  phone: {
    number: '',
    code: '',
  },
  postalCode: '',
  country: '',
  version: getVersion,
  addressId: '',
});

const rules = computed(() => {
  return {
    country: { required },
    city: { validateCity },
    streetName: { required },
    postalCode: { required, validatePostalCode },
    phone: { number: { required, minLength: minLength(17) } },
  };
});

const placeholders = reactive({
  postalCodePlaceholder: 'Select country',
  phoneNumberPlaceholder: 'Select country',
});

const v$ = useVuelidate(rules, address);

let selectedCountry = ref({ title: '', value: 'Select country' });

watch(selectedCountry, (newValue) => {
  placeholders.postalCodePlaceholder = validateCountry[newValue.title].placeholder;
  placeholders.phoneNumberPlaceholder = validateCountry[newValue.title].phoneMask;
  address.country = newValue.title;
});

watch(
  () => address.phone.number,
  (newValue) => {
    address.phone.number = formatPhoneNumber(newValue, selectedCountry.value.title);
  },
);

function validatePostalCode(postalCode: string) {
  if (selectedCountry.value.title.toUpperCase() === 'RU') {
    return /^[0-9]{6}$/.test(postalCode);
  } else if (selectedCountry.value.title.toUpperCase() === 'US') {
    return /^[0-9]{5}$/.test(postalCode);
  }

  return false;
}
function setCountry(option: Country) {
  selectedCountry.value = option;
  address.phone.number = '';
  address.postalCode = '';
}
// eslint-disable-next-line max-lines-per-function
async function submitHandler() {
  const isFormCorrect = await v$.value.$validate();

  if (!isFormCorrect) return;

  const formData = {
    version: address.version,
    actions: [
      {
        action: 'addAddress',
        address: {
          country: selectedCountry.value?.title,
          postalCode: address.postalCode,
          phone: address.phone.number,
          city: address.city,
          streetName: address.streetName,
        },
      },
    ],
  };

  try {
    const updateCustomer = async () => {
      const res = await store.dispatch('customer/updateCustomer', formData);

      store.commit('customer/setVersion', res.body.version);
      store.commit('customer/addNewAddress', {
        country: selectedCountry.value?.title,
        postalCode: address.postalCode,
        phone: address.phone.number,
        city: address.city,
        streetName: address.streetName,
        id: res.body.addresses[res.body.addresses.length - 1].id,
      });
    };

    toast.promise(
      updateCustomer,
      {
        pending: 'New address is creating',
        success: 'New address has created 👌',
        error: 'Something goes wrong 🤯',
      },
      {
        theme: 'dark',
        icon: '🎉',
        transition: toast.TRANSITIONS.SLIDE,
      },
    );

    const newValue = !props.modelValue;

    emit('update:modelValue', newValue);
  } catch (error) {
    console.log(error);
  }
}
</script>

<style lang="scss" scoped>
$errorColor: #ff3333;
$mainWhiteColor: #fefefe;
$darkBackgroundColor: #010101;

.submit-button {
  margin-top: 10px;
}
.profile {
  &__header {
    font-size: 20px;
    font-weight: 900;
    border-bottom: 1px solid #fefefecc;
    margin-bottom: 20px;
    line-height: 50px;
    transition: 0.5s ease;
    & span {
      font-size: 13px;
      background-color: green;
      color: #fefefecc;
      border-radius: 5px;
      padding: 2px;
    }
    @media (max-width: 600px) {
      font-size: calc(16px + (20 - 16) * ((100vw - 320px) / (600 - 320)));
      margin-bottom: 15px;
      padding-bottom: 15px;
    }
  }
}
.form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  @media (max-width: 1200px) {
    gap: calc(10px + 10 * ((100vw - 320px) / (1200 - 320)));
  }
  & .form-item {
    display: flex;
    align-items: center;
    gap: 10px;
    & svg {
      transition: 0.2s;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
  }
  & .form-control {
    display: flex;
    flex-direction: column;
    gap: 10px;
    & label {
      color: $mainWhiteColor;
      opacity: 0.8;
      white-space: nowrap;
      font-size: 16px;
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
      @media (max-width: 1200px) {
        padding-top: calc(5px + 5 * ((100vw - 320px) / (1200 - 320)));
        padding-bottom: calc(5px + 5 * ((100vw - 320px) / (1200 - 320)));
        padding-left: calc(5px + 10 * ((100vw - 320px) / (1200 - 320)));
        padding-right: calc(5px + 10 * ((100vw - 320px) / (1200 - 320)));
        font-size: calc(13px + 2 * ((100vw - 320px) / (1200 - 320)));
      }
      &.disabled {
        opacity: 0.3;
        border-color: #383636;
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
  }
}
</style>
