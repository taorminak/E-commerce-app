<template>
  <base-auth-wrapper v-if="!isLoading">
    <form @submit.prevent="submitHandler">
      <transition mode="out-in" :name="transitionName">
        <div class="form-wrapper" v-if="activePhase === 1">
          <div class="form-control">
            <label for="firstName"><strong>First name</strong> </label>
            <input
              id="firstName"
              type="text"
              placeholder="Enter your first name"
              v-model.trim="formData.body.firstName"
              @input="v$.body.firstName.$validate"
              :class="{
                error:
                  (v$.body.firstName.$dirty && v$.body.firstName.required.$invalid) ||
                  (v$.body.firstName.$dirty && v$.body.firstName.validateFirstName.$invalid),
              }"
            />
            <div class="input-errors" v-if="v$.body.firstName.$dirty && v$.body.firstName.validateFirstName.$invalid">
              <div class="error-msg">Must contain at least one character and no special characters or numbers</div>
            </div>
          </div>
          <div class="form-control">
            <label for="lastName"><strong>Last name</strong></label>
            <input
              id="lastName"
              type="text"
              placeholder="Enter your last name"
              v-model.trim="formData.body.lastName"
              @input="v$.body.lastName.$validate"
              :class="{
                error:
                  (v$.body.lastName.$dirty && v$.body.lastName.required.$invalid) ||
                  (v$.body.lastName.$dirty && v$.body.lastName.validateLastName.$invalid),
              }"
            />
            <div class="input-errors" v-if="v$.body.lastName.$dirty && v$.body.lastName.validateLastName.$invalid">
              <div class="error-msg">Must contain at least one character and no special characters or numbers</div>
            </div>
          </div>
          <div class="form-control">
            <label for="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              v-model.trim="formData.body.email"
              @input="v$.body.email.$validate"
              :class="{
                error:
                  (v$.body.email.$dirty && v$.body.email.required.$invalid) ||
                  (v$.body.email.$dirty && v$.body.email.email.$invalid),
              }"
            />
            <div class="input-errors" v-if="v$.body.email.$dirty && v$.body.email.required.$invalid">
              <div class="error-msg">Email can't be empty</div>
            </div>
            <div class="input-errors" v-else-if="v$.body.email.$dirty && v$.body.email.email.$invalid">
              <div class="error-msg">Enter valid email address</div>
            </div>
          </div>
          <div class="form-control">
            <label class="label-input" for="password"
              >Password
              <input
                id="password"
                :type="isPasswordHidden ? 'password' : 'text'"
                placeholder="Enter your password"
                v-model.trim="formData.body.password"
                @input="v$.body.password.$validate"
                :class="{
                  error:
                    (v$.body.password.$dirty && v$.body.password.required.$invalid) ||
                    (v$.body.password.$dirty && v$.body.password.validatePassword.$invalid),
                }"
              />
              <font-awesome-icon
                class="eye-icon"
                :class="{
                  error:
                    (v$.body.password.$dirty && v$.body.password.required.$invalid) ||
                    (v$.body.password.$dirty && v$.body.password.validatePassword.$invalid),
                }"
                icon="fa-solid fa-eye"
                v-if="!isPasswordHidden"
                @click.capture="isPasswordHidden = !isPasswordHidden"
              />
              <font-awesome-icon
                class="eye-icon"
                :class="{
                  error:
                    (v$.body.password.$dirty && v$.body.password.required.$invalid) ||
                    (v$.body.password.$dirty && v$.body.password.validatePassword.$invalid),
                }"
                icon="fa-solid fa-eye-slash"
                v-else
                @click.capture="isPasswordHidden = !isPasswordHidden"
              />
            </label>
            <div class="input-errors" v-if="v$.body.password.$dirty && v$.body.password.required.$invalid">
              <div class="error-msg">Enter password</div>
            </div>
            <div class="input-errors" v-else-if="v$.body.password.$dirty && v$.body.password.validatePassword.$invalid">
              <div class="error-msg">
                Password should contain minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1
                number.
              </div>
            </div>
          </div>
          <div class="form-control">
            <label for="date">Date of birth</label>
            <input
              id="date"
              type="text"
              v-model.trim="formData.body.dateOfBirth"
              placeholder="yyyy-mm-dd"
              maxlength="10"
              minlength="10"
              inputmode="numeric"
              @input="v$.body.dateOfBirth.$validate"
              :class="{
                error:
                  (v$.body.dateOfBirth.$dirty && v$.body.dateOfBirth.required.$invalid) ||
                  (v$.body.dateOfBirth.$dirty && v$.body.dateOfBirth.minLength.$invalid) ||
                  (isValidAge.age !== null && isValidAge.age >= 0
                    ? v$.body.dateOfBirth.$dirty && !isValidAge.isTrue
                    : false) ||
                  (isValidAge.age !== null && isValidAge.age >= 0
                    ? v$.body.dateOfBirth.$dirty && !isValidAge.isTrue
                    : false) ||
                  (isValidAge.age !== null ? v$.body.dateOfBirth.$dirty && isValidAge.age >= 150 : false),
              }"
            />
            <div class="input-errors" v-if="v$.body.dateOfBirth.$dirty && v$.body.dateOfBirth.required.$invalid">
              <div class="error-msg">Enter date of birth</div>
            </div>
            <div class="input-errors" v-else-if="v$.body.dateOfBirth.$dirty && v$.body.dateOfBirth.minLength.$invalid">
              <div class="error-msg">Enter a valid date in the format YYYY-MM-DD"</div>
            </div>
            <div
              class="input-errors"
              v-else-if="
                isValidAge.age !== null && isValidAge.age >= 0
                  ? v$.body.dateOfBirth.$dirty && !isValidAge.isTrue
                  : false
              "
            >
              <div class="error-msg">Age is below the allowed limit({{ minAge }}). You'r {{ isValidAge.age }} now</div>
            </div>
            <div class="input-errors" v-else-if="v$.body.dateOfBirth.$dirty && !isValidAge.isTrue">
              <div class="error-msg">Birth date cannot be in the future. Enter a valid date</div>
            </div>
            <div
              class="input-errors"
              v-else-if="isValidAge.age !== null ? v$.body.dateOfBirth.$dirty && isValidAge.age >= 150 : false"
            >
              <div class="error-msg">Enter an existing date</div>
            </div>
          </div>
        </div>
        <div class="form-wrapper-step2" v-else>
          <VHeader />
          <div class="form-wrapper">
            <label>Street</label>
            <div class="form-control">
              <div>
                <input
                  id="street"
                  type="text"
                  placeholder="Enter your street"
                  v-model.trim="formData.body.addresses[0].streetName"
                  @input="v$.body.addresses[0].streetName.$validate"
                  :class="{
                    error: v$.body.addresses[0].streetName.$dirty && v$.body.addresses[0].streetName.required.$invalid,
                  }"
                />
                <div
                  class="input-errors"
                  v-if="v$.body.addresses[0].streetName.$dirty && v$.body.addresses[0].streetName.required.$invalid"
                >
                  <div class="error-msg">Must contain at least one character</div>
                </div>
              </div>
              <div>
                <input
                  id="street"
                  type="text"
                  placeholder="Enter your street"
                  v-model.trim="formData.body.addresses[1].streetName"
                  @input="v$.body.addresses[1].streetName.$validate"
                  :disabled="checkGroup.isCheckboxTrue"
                  :class="{
                    error:
                      v$.body.addresses[1].streetName.$dirty &&
                      v$.body.addresses[1].streetName.required.$invalid &&
                      !checkGroup.isCheckboxTrue,
                    disabled: checkGroup.isCheckboxTrue,
                  }"
                />
                <div
                  class="input-errors"
                  v-if="
                    v$.body.addresses[1].streetName.$dirty &&
                    v$.body.addresses[1].streetName.required.$invalid &&
                    !checkGroup.isCheckboxTrue
                  "
                >
                  <div class="error-msg">Must contain at least one character</div>
                </div>
              </div>
            </div>
            <label>City</label>
            <div class="form-control">
              <div>
                <input
                  id="city"
                  type="text"
                  placeholder="Enter your city"
                  v-model.trim="formData.body.addresses[0].city"
                  @input="v$.body.addresses[0].city.$validate"
                  :class="{
                    error: v$.body.addresses[0].city.$dirty && v$.body.addresses[0].city.validateCity.$invalid,
                  }"
                />
                <div
                  class="input-errors"
                  v-if="v$.body.addresses[0].city.$dirty && v$.body.addresses[0].city.validateCity.$invalid"
                >
                  <div class="error-msg">Must contain at least one character and no special characters or numbers</div>
                </div>
              </div>
              <div>
                <input
                  id="city"
                  type="text"
                  placeholder="Enter your city"
                  v-model.trim="formData.body.addresses[1].city"
                  @input="v$.body.addresses[1].city.$validate"
                  :disabled="checkGroup.isCheckboxTrue"
                  :class="{
                    error:
                      v$.body.addresses[1].city.$dirty &&
                      v$.body.addresses[1].city.validateCity.$invalid &&
                      !checkGroup.isCheckboxTrue,
                    disabled: checkGroup.isCheckboxTrue,
                  }"
                />
                <div
                  class="input-errors"
                  v-if="
                    v$.body.addresses[1].city.$dirty &&
                    v$.body.addresses[1].city.validateCity.$invalid &&
                    !checkGroup.isCheckboxTrue
                  "
                >
                  <div class="error-msg">Must contain at least one character and no special characters or numbers</div>
                </div>
              </div>
            </div>
            <label>Country</label>
            <div class="form-control">
              <div>
                <vSelect
                  :countries="countries"
                  :selected="selectedCountry.shippingCountry"
                  @select="setShippingCountry"
                  @input="v$.body.addresses[0].country.$validate"
                  :class="{
                    error: v$.body.addresses[0].country.$dirty && v$.body.addresses[0].country.required.$invalid,
                  }"
                />
                <div
                  class="input-errors"
                  v-if="v$.body.addresses[0].country.$dirty && v$.body.addresses[0].country.required.$invalid"
                >
                  <div class="error-msg">Must be a valid country from a predefined list</div>
                </div>
              </div>
              <div>
                <vSelect
                  :countries="countries"
                  :selected="selectedCountry.billingCountry"
                  @select="setBillingCountry"
                  @input="v$.body.addresses[1].country.$validate"
                  :class="{
                    error:
                      v$.body.addresses[1].country.$dirty &&
                      v$.body.addresses[1].country.required.$invalid &&
                      !checkGroup.isCheckboxTrue,
                    disabled: checkGroup.isCheckboxTrue,
                  }"
                />
                <div
                  class="input-errors"
                  v-if="
                    v$.body.addresses[1].country.$dirty &&
                    v$.body.addresses[1].country.required.$invalid &&
                    !checkGroup.isCheckboxTrue
                  "
                >
                  <div class="error-msg">Must be a valid country from a predefined list</div>
                </div>
              </div>
            </div>
            <label>Phone number</label>
            <div class="form-control">
              <div>
                <input
                  id="tel"
                  type="text"
                  inputmode="tel"
                  :maxlength="v$.body.addresses[0].phone.minLength.$params.min"
                  :placeholder="placeholders.phoneNumberShippingPlaceholder"
                  v-model="formData.body.addresses[0].phone"
                  @input="v$.body.addresses[0].phone.$validate"
                  :class="{
                    error:
                      (v$.body.addresses[0].phone.$dirty && v$.body.addresses[0].phone.required.$invalid) ||
                      (v$.body.addresses[0].phone.$dirty && v$.body.addresses[0].phone.minLength.$invalid),

                    disabled: selectedCountry.shippingCountry.value === 'Select country',
                  }"
                  :disabled="selectedCountry.shippingCountry.value === 'Select country'"
                />
                <div
                  class="input-errors"
                  v-if="v$.body.addresses[0].phone.$dirty && v$.body.addresses[0].phone.required.$invalid"
                >
                  <div class="error-msg">Enter your phone number</div>
                </div>
                <div
                  class="input-errors"
                  v-else-if="v$.body.addresses[0].phone.$dirty && v$.body.addresses[0].phone.minLength.$invalid"
                >
                  <div class="error-msg">Enter a valid phone number</div>
                </div>
              </div>
              <div>
                <input
                  id="tel"
                  type="text"
                  inputmode="tel"
                  :maxlength="v$.body.addresses[1].phone.minLength.$params.min"
                  :placeholder="placeholders.phoneNumberBillingPlaceholder"
                  v-model="formData.body.addresses[1].phone"
                  @input="v$.body.addresses[1].phone.$validate"
                  :class="{
                    error:
                      (v$.body.addresses[1].phone.$dirty &&
                        v$.body.addresses[1].phone.required.$invalid &&
                        !checkGroup.isCheckboxTrue) ||
                      (v$.body.addresses[1].phone.$dirty &&
                        v$.body.addresses[1].phone.minLength.$invalid &&
                        !checkGroup.isCheckboxTrue),

                    disabled: selectedCountry.billingCountry.value === 'Select country' || checkGroup.isCheckboxTrue,
                  }"
                  :disabled="selectedCountry.billingCountry.value === 'Select country' || checkGroup.isCheckboxTrue"
                />
                <div
                  class="input-errors"
                  v-if="
                    v$.body.addresses[1].phone.$dirty &&
                    v$.body.addresses[1].phone.required.$invalid &&
                    !checkGroup.isCheckboxTrue
                  "
                >
                  <div class="error-msg">Enter your phone number</div>
                </div>
                <div
                  class="input-errors"
                  v-else-if="
                    v$.body.addresses[1].phone.$dirty &&
                    v$.body.addresses[1].phone.minLength.$invalid &&
                    !checkGroup.isCheckboxTrue
                  "
                >
                  <div class="error-msg">Enter a valid phone number</div>
                </div>
              </div>
            </div>
            <label for="postalCode">Postal code</label>
            <div class="form-control">
              <div>
                <input
                  id="postalCode"
                  type="text"
                  v-model.trim="formData.body.addresses[0].postalCode"
                  @input="v$.body.addresses[0].postalCode.$validate"
                  :class="{
                    error:
                      (v$.body.addresses[0].postalCode.$dirty && v$.body.addresses[0].postalCode.required.$invalid) ||
                      (v$.body.addresses[0].postalCode.$dirty &&
                        v$.body.addresses[0].postalCode.validateShippingPostalCode.$invalid),
                    disabled: selectedCountry.shippingCountry.value === 'Select country',
                  }"
                  :disabled="selectedCountry.shippingCountry.value === 'Select country'"
                  :placeholder="placeholders.postalCodeShippingPlaceholder"
                />
                <div
                  class="input-errors"
                  v-if="v$.body.addresses[0].postalCode.$dirty && v$.body.addresses[0].postalCode.required.$invalid"
                >
                  <div class="error-msg">Enter your postal code</div>
                </div>
                <div
                  class="input-errors"
                  v-else-if="
                    v$.body.addresses[0].postalCode.$dirty &&
                    v$.body.addresses[0].postalCode.validateShippingPostalCode.$invalid
                  "
                >
                  <div class="error-msg">Must follow the format for the country</div>
                </div>
              </div>
              <div>
                <input
                  id="postalCode"
                  type="text"
                  v-model.trim="formData.body.addresses[1].postalCode"
                  @input="v$.body.addresses[1].postalCode.$validate"
                  :class="{
                    error:
                      (v$.body.addresses[1].postalCode.$dirty &&
                        v$.body.addresses[1].postalCode.required.$invalid &&
                        !checkGroup.isCheckboxTrue) ||
                      (v$.body.addresses[1].postalCode.$dirty &&
                        v$.body.addresses[1].postalCode.validateBillingPostalCode.$invalid &&
                        !checkGroup.isCheckboxTrue),
                    disabled: selectedCountry.billingCountry.value === 'Select country' || checkGroup.isCheckboxTrue,
                  }"
                  :disabled="selectedCountry.billingCountry.value === 'Select country' || checkGroup.isCheckboxTrue"
                  :placeholder="placeholders.postalCodeBillingPlaceholder"
                />
                <div
                  class="input-errors"
                  v-if="
                    v$.body.addresses[1].postalCode.$dirty &&
                    v$.body.addresses[1].postalCode.required.$invalid &&
                    !checkGroup.isCheckboxTrue
                  "
                >
                  <div class="error-msg">Enter your postal code</div>
                </div>
                <div
                  class="input-errors"
                  v-else-if="
                    v$.body.addresses[1].postalCode.$dirty &&
                    v$.body.addresses[1].postalCode.validateBillingPostalCode.$invalid &&
                    !checkGroup.isCheckboxTrue
                  "
                >
                  <div class="error-msg">Must follow the format for the country</div>
                </div>
              </div>
            </div>
          </div>
          <VCheckbox
            v-model="checkGroup.isCheckboxTrue"
            label="Set shipping address same as billing address"
            v-if="activePhase !== 1"
          />
          <VSetDefaultButtons
            :isBothAddressChecked="checkGroup.isCheckboxTrue"
            shippingAddress="Set as default address"
            billingAddress="Set as default address"
            v-if="activePhase !== 1"
          />
        </div>
      </transition>
      <base-auth-button v-if="!isLastPage" @click.prevent="goToStep(2, 'next')" mode="true">continue</base-auth-button>
      <div class="button-wrapper" v-else>
        <base-auth-button @click="goToStep(1, 'back')">back</base-auth-button>
        <base-auth-button type>submit</base-auth-button>
        <span class="underline"></span>
      </div>
    </form>
    <HaveAnAccountForm mode="signup" />
  </base-auth-wrapper>
  <base-spinner title="signing up" v-else></base-spinner>
</template>

<script setup lang="ts">
import { reactive, ref, Ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import HaveAnAccountForm from '@/components/auth/registration/HaveAnAccountForm.vue';
import VCheckbox from '@/components/auth/registration/AddressCheckbox.vue';
import VHeader from '@/components/auth/registration/HeaderSecondStep.vue';
import VSetDefaultButtons from '@/components/auth/registration/VSetDefaultButtonsAuth.vue';
import vSelect from '@/components/auth/registration/SelectForm.vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';
import { RegisterData } from '@/types/auth/RegisterData';
import { Country } from '@/types/auth/SelectFormCountry';
import { calculateAge } from '@/utils/auth/calculateAge';
import {
  validateLastName,
  validatePassword,
  validateFirstName,
  formatDate,
  validateCity,
  validateCountry,
  formatPhoneNumber,
} from '@/utils/auth/validator';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const router = useRouter();
const activePhase: Ref<number> = ref(1);
const transitionName: Ref<string> = ref('');
const minAge: Ref<number> = ref(13);
const isLoading: Ref<boolean> = ref(false);
const checkGroup = reactive({
  isCheckboxTrue: true,
});
const isPasswordHidden = ref(true);
const isValidAge: Ref<{ isTrue: boolean; age: number | null }> = ref({ isTrue: false, age: null });
const placeholders = reactive({
  postalCodeBillingPlaceholder: 'Select country',
  phoneNumberBillingPlaceholder: 'Select country',
  postalCodeShippingPlaceholder: 'Select country',
  phoneNumberShippingPlaceholder: 'Select country',
});

const countries = ref([
  { title: 'RU', value: 'Russian Federation' },
  { title: 'US', value: 'The United States' },
]);

const selectedCountry = reactive({
  shippingCountry: { title: '', value: 'Select country' },
  billingCountry: { title: '', value: 'Select country' },
});

const store = useStore();

const formData: RegisterData = reactive({
  body: {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    version: 1,
    addresses: [
      {
        country: '',
        city: '',
        streetName: '',
        postalCode: '',
        phone: '',
      },
      {
        country: '',
        city: '',
        streetName: '',
        postalCode: '',
        phone: '',
      },
    ],
    shippingAddresses: [0],
    billingAddresses: [1],
  },
});

const calcAgeValidator = computed(() => calculateAge(formData.body.dateOfBirth, minAge.value).isTrue);

const rules = computed(() => {
  return {
    body: {
      firstName: { required, validateFirstName },
      lastName: { required, validateLastName },
      email: { required, email },
      password: { required, validatePassword },
      dateOfBirth: { required, minLength: minLength(10), calcAgeValidator },
      addresses: [
        {
          country: { required },
          city: { validateCity },
          streetName: { required },
          postalCode: { required, validateShippingPostalCode },
          phone: { required, minLength: minLength(17) },
        },
        {
          country: { required },
          city: { validateCity },
          streetName: { required },
          postalCode: { required, validateBillingPostalCode },
          phone: { required, minLength: minLength(17) },
        },
      ],
    },
  };
});

const v$ = useVuelidate(rules, formData);

const isLastPage = computed(() => {
  return activePhase.value === 2;
});

watch(
  () => formData.body.dateOfBirth,
  (newFormDate) => {
    formData.body.dateOfBirth = formatDate(newFormDate);

    if (!v$.value.body.dateOfBirth.minLength.$invalid) {
      isValidAge.value = calculateAge(formData.body.dateOfBirth, minAge.value);
    }
  },
);

watch(
  () => selectedCountry.billingCountry,
  (newValue) => {
    placeholders.postalCodeBillingPlaceholder = validateCountry[newValue.title].placeholder;
    placeholders.phoneNumberBillingPlaceholder = validateCountry[newValue.title].phoneMask;
    formData.body.addresses[1].country = newValue.title;
  },
);

watch(
  () => selectedCountry.shippingCountry,
  (newValue) => {
    if (newValue.title !== '') {
      placeholders.postalCodeShippingPlaceholder = validateCountry[newValue.title.toUpperCase()].placeholder;
      placeholders.phoneNumberShippingPlaceholder = validateCountry[newValue.title.toUpperCase()].phoneMask;
      formData.body.addresses[0].country = newValue.title;
    }
  },
);

watch(
  () => formData.body.addresses[1].phone,
  (newValue) => {
    formData.body.addresses[1].phone = formatPhoneNumber(newValue, selectedCountry.billingCountry.title);
  },
);

watch(
  () => formData.body.addresses[0].phone,
  (newValue) => {
    formData.body.addresses[0].phone = formatPhoneNumber(newValue, selectedCountry.shippingCountry.title);
  },
);

watch(
  () => checkGroup.isCheckboxTrue,
  (newValue) => {
    if (newValue === true) {
      formData.body.addresses[1].streetName = '';
      formData.body.addresses[1].city = '';
      formData.body.addresses[1].country = '';
      formData.body.addresses[1].postalCode = '';
      formData.body.addresses[1].phone = '';
      v$.value.body.addresses[1].$reset();
    }
  },
);

function validateBillingPostalCode(postalCode: string) {
  if (selectedCountry.billingCountry.title.toUpperCase() === 'RU') {
    return /^[0-9]{6}$/.test(postalCode);
  } else if (selectedCountry.billingCountry.title.toUpperCase() === 'US') {
    return /^[0-9]{5}$/.test(postalCode);
  }

  return false;
}

function validateShippingPostalCode(postalCode: string) {
  if (selectedCountry.shippingCountry.title.toUpperCase() === 'RU') {
    return /^[0-9]{6}$/.test(postalCode);
  } else if (selectedCountry.shippingCountry.title.toUpperCase() === 'US') {
    return /^[0-9]{5}$/.test(postalCode);
  }

  return false;
}

function goToStep(value: number, transitionValue?: string) {
  if (value === 2) {
    v$.value.body.firstName.$validate();
    v$.value.body.lastName.$validate();
    v$.value.body.email.$validate();
    v$.value.body.password.$validate();
    v$.value.body.dateOfBirth.$validate();
  }

  if (v$.value.$errors.length && value !== 1) {
    return;
  }
  activePhase.value = value;

  if (transitionValue) transitionName.value = transitionValue;
}

function setBillingCountry(option: Country) {
  selectedCountry.billingCountry = option;
  formData.body.addresses[1].postalCode = '';
  formData.body.addresses[1].phone = '';
}

function setShippingCountry(option: Country) {
  selectedCountry.shippingCountry = option;
  formData.body.addresses[0].postalCode = '';
  formData.body.addresses[0].phone = '';
}

function setShippingDataAsBilling() {
  return {
    body: {
      email: formData.body.email,
      password: formData.body.password,
      firstName: formData.body.firstName,
      lastName: formData.body.lastName,
      dateOfBirth: formData.body.dateOfBirth,
      addresses: [
        {
          country: formData.body.addresses[0].country.toUpperCase(),
          city: formData.body.addresses[0].city,
          streetName: formData.body.addresses[0].streetName,
          postalCode: formData.body.addresses[0].postalCode,
          phone: formData.body.addresses[0].phone,
        },
        {
          country: formData.body.addresses[0].country.toUpperCase(),
          city: formData.body.addresses[0].city,
          streetName: formData.body.addresses[0].streetName,
          postalCode: formData.body.addresses[0].postalCode,
          phone: formData.body.addresses[0].phone,
        },
      ],
      shippingAddresses: [0],
      billingAddresses: [1],
    },
  };
}

// eslint-disable-next-line max-lines-per-function
async function submitHandler() {
  if (checkGroup.isCheckboxTrue) {
    const isFormCorrect = await v$.value.body.addresses[0].$validate();

    if (!isFormCorrect) return;
    isLoading.value = true;
    try {
      const res = await store.dispatch('customer/singUp', setShippingDataAsBilling());

      localStorage.setItem('isLoggedIn', JSON.stringify(true));
      store.dispatch('cart/createCart');
      toast.success(`Welcome , ` + res.customer.firstName, {
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
        toast.error(`${err.message} Try to log in or use another email address.`, {
          autoClose: 3000,
          theme: 'dark',
          icon: '🔐',
          transition: toast.TRANSITIONS.SLIDE,
          onClose: () => {
            isLoading.value = false;
            v$.value.$reset();
          },
        });
      }
    }
  } else {
    const isFormCorrect = await v$.value.$validate();

    if (!isFormCorrect) return;
    isLoading.value = true;
    try {
      const res = await store.dispatch('customer/singUp', formData);

      toast.success(`Welcome , ` + res.customer.firstName, {
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
            isLoading.value = false;
            v$.value.$reset();
          },
        });
      }
    }
  }
}
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

.button-wrapper {
  display: flex;
  position: relative;
  max-width: 100%;
  width: 100%;
  overflow: hidden;
  @media (max-width: 1200px) {
    max-width: calc(85% + 15 * ((100vw - 320px) / (1200 - 320)));
  }
  & .underline {
    position: absolute;
    display: block;
  }
  & .underline:nth-child(3) {
    bottom: 2px;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, $mainWhiteColor);
    animation: btn-anim1 3s linear infinite;
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

.back-enter-from {
  opacity: 0;
  transform: translateX(50px);
}

.back-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

.next-leave-to {
  opacity: 0;
  transform: translateX(50px);
}

.next-enter-from {
  opacity: 0;
  transform: translateX(-50px);
}
.back-enter-active,
.next-enter-active {
  transition: all 1s ease-out;
}
.back-leave-active,
.next-leave-active {
  transition: all 1s ease-in;
}

.back-enter-to,
.back-leave-from,
.next-enter-to,
.next-leave-from {
  opacity: 1;
  transform: translateY(0);
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
