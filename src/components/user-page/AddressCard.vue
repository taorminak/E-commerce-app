<template>
  <div class="address-card">
    <div class="address-card__header">
      <div class="address-card__header-row">
        <h1 class="profile__header">Address</h1>
        <font-awesome-icon @click="deleteAddress" icon="fa-solid fa-xmark"></font-awesome-icon>
      </div>
      <div class="address-card__span-block">
        <span class="address-span" data-span="spanBilling">Default billing address</span>
        <span class="address-span" data-span="spanShipping">Default shipping address</span>
      </div>
    </div>

    <div class="form-wrapper">
      <div class="form-block">
        <div class="form-block__item">
          <label>Street</label>
          <div class="form-control">
            <div class="form-item">
              <input
                id="street"
                type="text"
                placeholder="Your street"
                v-model="address.streetName"
                @input="v$.streetName.$validate"
                :disabled="!isStreetEdit"
                :class="{ disabled: !isStreetEdit, error: v$.streetName.$dirty && v$.streetName.required.$invalid }"
              />
              <font-awesome-icon v-if="!isStreetEdit" @click="isStreetEdit = !isStreetEdit" icon="pen-to-square" />
              <div class="form-item" v-else>
                <font-awesome-icon @click="setStreetName($event, 'cancel')" icon="fa-solid fa-xmark" />
                <font-awesome-icon @click="setStreetName($event, 'submit')" icon="fa-solid fa-check" />
              </div>
            </div>
            <div class="input-errors" v-if="v$.streetName.$dirty && v$.streetName.required.$invalid">
              <div class="error-msg">Must contain at least one character</div>
            </div>
          </div>
        </div>
        <div class="form-block__item">
          <label>City</label>
          <div class="form-control">
            <div class="form-item">
              <input
                id="city"
                type="text"
                placeholder="Your city"
                v-model="address.city"
                @input="v$.city.$validate"
                :disabled="!isCityEdit"
                :class="{ disabled: !isCityEdit, error: v$.city.$dirty && v$.city.validateCity.$invalid }"
              />
              <font-awesome-icon v-if="!isCityEdit" @click="isCityEdit = !isCityEdit" icon="pen-to-square" />
              <div class="form-item" v-else>
                <font-awesome-icon @click="setCity($event, 'cancel')" icon="fa-solid fa-xmark" />
                <font-awesome-icon @click="setCity($event, 'submit')" icon="fa-solid fa-check" />
              </div>
            </div>
            <div class="input-errors" v-if="v$.city.$dirty && v$.city.validateCity.$invalid">
              <div class="error-msg">Must contain at least one character and no special characters or numbers</div>
            </div>
          </div>
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
            :disabled="!isSelectEdit"
            :class="{ disabled: !isSelectEdit, error: v$.country.$dirty && v$.country.required.$invalid }"
          />
          <font-awesome-icon v-if="!isSelectEdit" @click="isSelectEdit = !isSelectEdit" icon="pen-to-square" />
          <div class="form-item" v-else>
            <font-awesome-icon @click="setCountryToData($event, 'cancel')" icon="fa-solid fa-xmark" />
            <font-awesome-icon @click="setCountryToData($event, 'submit')" icon="fa-solid fa-check" />
          </div>
        </div>
        <div class="input-errors" v-if="v$.country.$dirty && v$.country.required.$invalid">
          <div class="error-msg">Must be a valid country from a predefined list</div>
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
            :disabled="!isPhoneEdit"
            :class="{
              disabled: !isPhoneEdit,
              error:
                (v$.phone.number.$dirty && v$.phone.number.required.$invalid) ||
                (v$.phone.number.$dirty && v$.phone.number.minLength.$invalid) ||
                v$.phone.number.isCountryMatchPhoneNumber.$invalid,
            }"
          />
          <font-awesome-icon v-if="!isPhoneEdit" @click="isPhoneEdit = !isPhoneEdit" icon="pen-to-square" />
          <div class="form-item" v-else>
            <font-awesome-icon @click="setPhone($event, 'cancel')" icon="fa-solid fa-xmark" />
            <font-awesome-icon @click="setPhone($event, 'submit')" icon="fa-solid fa-check" />
          </div>
        </div>
        <div class="input-errors" v-if="v$.phone.number.$dirty && v$.phone.number.required.$invalid">
          <div class="error-msg">Enter your phone number</div>
        </div>
        <div class="input-errors" v-else-if="v$.phone.number.$dirty && v$.phone.number.minLength.$invalid">
          <div class="error-msg">Enter a valid phone number</div>
        </div>
        <div class="input-errors" v-else-if="v$.phone.number.isCountryMatchPhoneNumber.$invalid">
          <div class="error-msg">Incorrect number. It doesn't match your country</div>
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
            :disabled="!isPostalCodeEdit"
            :class="{
              disabled: !isPostalCodeEdit,
              error:
                (v$.postalCode.$dirty && v$.postalCode.required.$invalid) ||
                (v$.postalCode.$dirty && v$.postalCode.validatePostalCode.$invalid),
            }"
          />
          <font-awesome-icon
            v-if="!isPostalCodeEdit"
            @click="isPostalCodeEdit = !isPostalCodeEdit"
            icon="pen-to-square"
          />
          <div class="form-item" v-else>
            <font-awesome-icon @click="setPostalCode($event, 'cancel')" icon="fa-solid fa-xmark" />
            <font-awesome-icon @click="setPostalCode($event, 'submit')" icon="fa-solid fa-check" />
          </div>
        </div>
        <div class="input-errors" v-if="v$.postalCode.$dirty && v$.postalCode.required.$invalid">
          <div class="error-msg">Enter your postal code</div>
        </div>
        <div class="input-errors" v-else-if="v$.postalCode.$dirty && v$.postalCode.validatePostalCode.$invalid">
          <div class="error-msg">Must follow the format for the country</div>
        </div>
      </div>
    </div>
    <div class="checkboxes">
      <VSetDefaultButtonsVue
        shippingAddress="Set as default shipping address"
        billingAddress="Set as default billing address"
        :addressId="address.id"
        :version="version"
        mode="inputAddress"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import VSetDefaultButtonsVue from '../auth/registration/VSetDefaultButtons.vue';
import vSelect from '@/components/auth/registration/SelectForm.vue';
import { Country } from '@/types/auth/SelectFormCountry';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';
import { validateCity, validateCountry, formatPhoneNumber } from '@/utils/auth/validator';
import { DataFormAddress } from '@/types/auth/RegisterData';

const props = defineProps<{
  address: DataFormAddress;
  version: number;
  defaultAddresses: {
    billingId: string;
    shippingId: string;
  };
}>();

const store = useStore();
const countries = ref([
  { title: 'RU', value: 'Russian Federation' },
  { title: 'US', value: 'The United States' },
]);
const isSelectEdit = ref(false);
const isCityEdit = ref(false);
const isPostalCodeEdit = ref(false);
const isPhoneEdit = ref(false);
const isStreetEdit = ref(false);
const address = reactive({
  streetName: props.address.streetName,
  city: props.address.city,
  phone: {
    number: props.address.phone,
    code: props.address.country,
  },
  postalCode: props.address.postalCode,
  country: props.address.country,
  version: props.version,
  id: props.address.id,
});
const rules = computed(() => {
  return {
    country: { required },
    city: { validateCity },
    streetName: { required },
    postalCode: { required, validatePostalCode },
    phone: { number: { required, minLength: minLength(17), isCountryMatchPhoneNumber } },
  };
});
const placeholders = reactive({
  postalCodePlaceholder: validateCountry[address.country].placeholder,
  phoneNumberPlaceholder: validateCountry[address.country].phoneMask,
});

const v$ = useVuelidate(rules, address);

let selectedCountry = ref(
  countries.value.find((obj) => obj.title === address.country) || { title: '', value: 'Select country' },
);

watch(selectedCountry, (newValue) => {
  placeholders.postalCodePlaceholder = validateCountry[newValue.title].placeholder;
  placeholders.phoneNumberPlaceholder = validateCountry[newValue.title].phoneMask;
  address.country = newValue.title;
});

watch(
  () => address.phone.number,
  (newValue) => {
    if (isCountryMatchPhoneNumber()) {
      address.phone.number = formatPhoneNumber(newValue, selectedCountry.value.title);
    }
  },
);

function isCountryMatchPhoneNumber() {
  return address.phone.code === address.country;
}

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
}
// eslint-disable-next-line max-lines-per-function
async function setCountryToData(event: Event, mode: string) {
  if (mode === 'submit') {
    const isFormCorrect = await v$.value.$validate();

    if (!isFormCorrect) return;

    isSelectEdit.value = !isSelectEdit.value;

    const formData = {
      version: address.version,
      actions: [
        {
          action: 'changeAddress',
          addressId: address.id,
          address: {
            country: selectedCountry.value?.title,
            streetName: address.streetName,
            phone: address.phone.number,
            city: address.city,
            postalCode: address.postalCode,
          },
        },
      ],
    };

    address.phone.code = selectedCountry.value?.title;

    try {
      const updateCustomer = async () => {
        const res = await store.dispatch('customer/updateCustomer', formData);

        store.commit('customer/setVersion', res.body.version);
      };

      toast.promise(
        updateCustomer,
        {
          pending: 'Country is updating',
          success: 'Country has updated 👌',
          error: 'Something goes wrong 🤯',
        },
        {
          theme: 'dark',
          icon: '🎉',
          transition: toast.TRANSITIONS.SLIDE,
        },
      );
    } catch (error) {
      console.log(error);
    }
  } else if (mode === 'cancel') {
    isSelectEdit.value = !isSelectEdit.value;

    selectedCountry.value = countries.value.find((obj) => obj.title === props.address.country) || {
      title: '',
      value: 'Select country',
    };
  }
}
// eslint-disable-next-line max-lines-per-function
async function setStreetName(event: Event, mode: string) {
  if (mode === 'submit') {
    const isFormCorrect = await v$.value.$validate();

    if (!isFormCorrect) return;
    isStreetEdit.value = !isStreetEdit.value;

    const parentElem = event.currentTarget as HTMLElement;

    const input = parentElem.parentElement?.parentElement?.firstChild as HTMLInputElement;

    const formData = {
      version: address.version,
      actions: [
        {
          action: 'changeAddress',
          addressId: address.id,
          address: {
            country: selectedCountry.value?.title,
            streetName: input.value,
            phone: address.phone.number,
            city: address.city,
            postalCode: address.postalCode,
          },
        },
      ],
    };

    try {
      const updateCustomer = async () => {
        const res = await store.dispatch('customer/updateCustomer', formData);

        store.commit('customer/setVersion', res.body.version);
      };

      toast.promise(
        updateCustomer,
        {
          pending: 'Street name is updating',
          success: 'Street name has updated 👌',
          error: 'Something goes wrong 🤯',
        },
        {
          theme: 'dark',
          icon: '🎉',
          transition: toast.TRANSITIONS.SLIDE,
        },
      );
    } catch (error) {
      console.log(error);
    }
  } else if (mode === 'cancel') {
    isStreetEdit.value = !isStreetEdit.value;

    address.streetName = props.address.streetName;
  }
}
// eslint-disable-next-line max-lines-per-function
async function setCity(event: Event, mode: string) {
  if (mode === 'submit') {
    const isFormCorrect = await v$.value.$validate();

    if (!isFormCorrect) return;
    isCityEdit.value = !isCityEdit.value;

    const parentElem = event.currentTarget as HTMLElement;

    const input = parentElem.parentElement?.parentElement?.firstChild as HTMLInputElement;

    const formData = {
      version: address.version,
      actions: [
        {
          action: 'changeAddress',
          addressId: address.id,
          address: {
            country: selectedCountry.value?.title,
            city: input.value,
            postalCode: address.postalCode,
            phone: address.phone.number,
            streetName: address.streetName,
          },
        },
      ],
    };

    try {
      const updateCustomer = async () => {
        const res = await store.dispatch('customer/updateCustomer', formData);

        store.commit('customer/setVersion', res.body.version);
      };

      toast.promise(
        updateCustomer,
        {
          pending: 'City is updating',
          success: 'City has updated 👌',
          error: 'Something goes wrong 🤯',
        },
        {
          theme: 'dark',
          icon: '🎉',
          transition: toast.TRANSITIONS.SLIDE,
        },
      );
    } catch (error) {
      console.log(error);
    }
  } else if (mode === 'cancel') {
    isCityEdit.value = !isCityEdit.value;

    address.city = props.address.city;
  }
}
// eslint-disable-next-line max-lines-per-function
async function setPostalCode(event: Event, mode: string) {
  if (mode === 'submit') {
    const isFormCorrect = await v$.value.$validate();

    if (!isFormCorrect) return;
    isPostalCodeEdit.value = !isPostalCodeEdit.value;

    const parentElem = event.currentTarget as HTMLElement;

    const input = parentElem.parentElement?.parentElement?.firstChild as HTMLInputElement;

    const formData = {
      version: address.version,
      actions: [
        {
          action: 'changeAddress',
          addressId: address.id,
          address: {
            country: selectedCountry.value?.title,
            postalCode: input.value,
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
      };

      toast.promise(
        updateCustomer,
        {
          pending: 'Postal code is updating',
          success: 'Postal code has updated 👌',
          error: 'Something goes wrong 🤯',
        },
        {
          theme: 'dark',
          icon: '🎉',
          transition: toast.TRANSITIONS.SLIDE,
        },
      );
    } catch (error) {
      console.log(error);
    }
  } else if (mode === 'cancel') {
    isPostalCodeEdit.value = !isPostalCodeEdit.value;

    address.postalCode = props.address.postalCode;
  }
}
// eslint-disable-next-line max-lines-per-function
async function setPhone(event: Event, mode: string) {
  if (mode === 'submit') {
    const isFormCorrect = await v$.value.$validate();

    if (!isFormCorrect) return;
    isPhoneEdit.value = !isPhoneEdit.value;

    const parentElem = event.currentTarget as HTMLElement;

    const input = parentElem.parentElement?.parentElement?.firstChild as HTMLInputElement;

    const formData = {
      version: address.version,
      actions: [
        {
          action: 'changeAddress',
          addressId: address.id,
          address: {
            country: selectedCountry.value?.title,
            phone: input.value,
            city: address.city,
            postalCode: address.postalCode,
            streetName: address.streetName,
          },
        },
      ],
    };

    try {
      const updateCustomer = async () => {
        const res = await store.dispatch('customer/updateCustomer', formData);

        store.commit('customer/setVersion', res.body.version);
      };

      toast.promise(
        updateCustomer,
        {
          pending: 'Phone number is updating',
          success: 'Phone number has updated 👌',
          error: 'Something goes wrong 🤯',
        },
        {
          theme: 'dark',
          icon: '🎉',
          transition: toast.TRANSITIONS.SLIDE,
        },
      );
    } catch (error) {
      console.log(error);
    }
  } else if (mode === 'cancel') {
    isPhoneEdit.value = !isPhoneEdit.value;

    address.phone.number = props.address.phone;
  }
}

async function deleteAddress() {
  const formData = {
    version: address.version,
    actions: [
      {
        action: 'removeAddress',
        addressId: props.address.id,
      },
    ],
  };

  try {
    const updateCustomer = async () => {
      const res = await store.dispatch('customer/updateCustomer', formData);

      store.commit('customer/setVersion', res.body.version);
    };

    toast.promise(
      updateCustomer,
      {
        pending: 'Address is deleting',
        success: 'Address has deleted 👌',
        error: 'Something goes wrong 🤯',
      },
      {
        theme: 'dark',
        icon: '🎉',
        transition: toast.TRANSITIONS.SLIDE,
      },
    );
    store.commit('customer/deleteAddress', props.address.id);
  } catch (error) {
    console.log(error);
  }
}

function getDefaultAddresses() {
  const shippingId = props.defaultAddresses.shippingId;
  const billingId = props.defaultAddresses.billingId;

  if (address.id === shippingId) {
    const inputElemShipping = document.querySelector(
      `input[name="${shippingId}"][data-type="shippingAddress"]`,
    ) as HTMLInputElement;

    inputElemShipping.checked = true;

    const spanShipping = inputElemShipping
      .closest('.address-card')
      ?.querySelector('.address-card__span-block > span[data-span="spanShipping"]') as HTMLSpanElement;

    spanShipping.style.display = 'inline';
  }

  if (address.id === billingId) {
    const inputElemBilling = document.querySelector(
      `input[name="${billingId}"][data-type="billingAddress"]`,
    ) as HTMLInputElement;

    inputElemBilling.checked = true;

    const spanBilling = inputElemBilling
      .closest('.address-card')
      ?.querySelector('.address-card__span-block > span[data-span="spanBilling"]') as HTMLSpanElement;

    spanBilling.style.display = 'inline';
  }
}
onMounted(() => {
  getDefaultAddresses();
});
</script>

<style lang="scss" scoped>
$errorColor: #ff3333;
$mainWhiteColor: #fefefe;
$darkBackgroundColor: #010101;

.address-card {
  position: relative;
  &__span-block {
    flex-wrap: wrap;
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  &__header {
    border-bottom: 1px solid #fefefecc;
    margin-bottom: 20px;
    padding-bottom: 15px;
    &-row {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    & .address-span {
      display: none;
    }
    .profile {
      &__header {
        font-size: 20px;
        font-weight: 900;
        line-height: 50px;
        transition: 0.5s ease;

        @media (max-width: 600px) {
          font-size: calc(16px + (20 - 16) * ((100vw - 320px) / (600 - 320)));
        }
      }
    }
    & svg {
      position: absolute;
      right: 0;
      top: 20px;
      transition: 0.2s;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
    & span {
      font-size: 13px;
      background-color: green;
      color: #fefefecc;
      border-radius: 5px;
      padding: 2px;
    }
  }
}

.checkboxes {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form-block {
  display: flex;
  gap: 15px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
  &__item {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
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
