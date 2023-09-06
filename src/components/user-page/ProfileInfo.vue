<template>
  <div>
    <h1 class="profile__header">Account information</h1>
    <div class="profile__wrapper">
      <div class="row">
        <div class="form-control">
          <label for="firstName">First name</label>
          <div class="form-item">
            <input
              type="text"
              id="firstName"
              placeholder="First name"
              v-model.trim="data.firstName"
              @input="v$.firstName.$validate"
              :disabled="!isFirstNameEdit"
              :class="{
                disabled: !isFirstNameEdit,
                error:
                  (v$.firstName.$dirty && v$.firstName.required.$invalid) ||
                  (v$.firstName.$dirty && v$.firstName.validateFirstName.$invalid),
              }"
            />
            <font-awesome-icon
              v-if="!isFirstNameEdit"
              @click="isFirstNameEdit = !isFirstNameEdit"
              icon="pen-to-square"
            />
            <div class="form-item" v-else>
              <font-awesome-icon @click="setFirstName($event, 'cancel')" icon="fa-solid fa-xmark" />
              <font-awesome-icon @click="setFirstName($event, 'submit')" icon="fa-solid fa-check" />
            </div>
          </div>
          <div class="input-errors" v-if="v$.firstName.$dirty && v$.firstName.validateFirstName.$invalid">
            <div class="error-msg">Must contain at least one character and no special characters or numbers</div>
          </div>
        </div>
        <div class="form-control">
          <label for="lastName">Last name</label>
          <div class="form-item">
            <input
              id="lastName"
              type="text"
              placeholder="Last name"
              v-model.trim="data.lastName"
              @input="v$.lastName.$validate"
              :disabled="!isLastNameEdit"
              :class="{
                disabled: !isLastNameEdit,
                error:
                  (v$.lastName.$dirty && v$.lastName.required.$invalid) ||
                  (v$.lastName.$dirty && v$.lastName.validateLastName.$invalid),
              }"
            />
            <font-awesome-icon v-if="!isLastNameEdit" @click="isLastNameEdit = !isLastNameEdit" icon="pen-to-square" />
            <div class="form-item" v-else>
              <font-awesome-icon @click="setLastName($event, 'cancel')" icon="fa-solid fa-xmark" />
              <font-awesome-icon @click="setLastName($event, 'submit')" icon="fa-solid fa-check" />
            </div>
          </div>
          <div class="input-errors" v-if="v$.lastName.$dirty && v$.lastName.validateLastName.$invalid">
            <div class="error-msg">Must contain at least one character and no special characters or numbers</div>
          </div>
        </div>
      </div>
      <div class="form-control">
        <label for="email">Email</label>
        <div class="form-item">
          <input
            id="email"
            type="email"
            placeholder="Email"
            v-model.trim="data.email"
            @input="v$.email.$validate"
            :disabled="!isEmailEdit"
            :class="{
              disabled: !isEmailEdit,
              error: (v$.email.$dirty && v$.email.required.$invalid) || (v$.email.$dirty && v$.email.email.$invalid),
            }"
          />
          <font-awesome-icon v-if="!isEmailEdit" @click="isEmailEdit = !isEmailEdit" icon="pen-to-square" />
          <div class="form-item" v-else>
            <font-awesome-icon @click="setEmail($event, 'cancel')" icon="fa-solid fa-xmark" />
            <font-awesome-icon @click="setEmail($event, 'submit')" icon="fa-solid fa-check" />
          </div>
        </div>
        <div class="input-errors" v-if="v$.email.$dirty && v$.email.required.$invalid">
          <div class="error-msg">Email can't be empty</div>
        </div>
        <div class="input-errors" v-else-if="v$.email.$dirty && v$.email.email.$invalid">
          <div class="error-msg">Enter valid email address</div>
        </div>
      </div>
      <div class="form-control">
        <label for="date">Date of birth</label>
        <div class="form-item">
          <input
            id="date"
            type="text"
            placeholder="yyyy-mm-dd"
            maxlength="10"
            minlength="10"
            inputmode="numeric"
            v-model.trim="data.dateOfBirth"
            @input="v$.dateOfBirth.$validate"
            :disabled="!isDateBirthEdit"
            :class="{
              disabled: !isDateBirthEdit,
              error:
                (v$.dateOfBirth.$dirty && v$.dateOfBirth.required.$invalid) ||
                (v$.dateOfBirth.$dirty && v$.dateOfBirth.minLength.$invalid) ||
                (isValidAge.age !== null && isValidAge.age >= 0
                  ? v$.dateOfBirth.$dirty && !isValidAge.isTrue
                  : false) ||
                (isValidAge.age !== null && isValidAge.age >= 0
                  ? v$.dateOfBirth.$dirty && !isValidAge.isTrue
                  : false) ||
                (isValidAge.age !== null ? v$.dateOfBirth.$dirty && isValidAge.age >= 150 : false),
            }"
          />
          <font-awesome-icon v-if="!isDateBirthEdit" @click="isDateBirthEdit = !isDateBirthEdit" icon="pen-to-square" />
          <div class="form-item" v-else>
            <font-awesome-icon @click="setDateOfBirth($event, 'cancel')" icon="fa-solid fa-xmark" />
            <font-awesome-icon @click="setDateOfBirth($event, 'submit')" icon="fa-solid fa-check" />
          </div>
        </div>
        <div class="input-errors" v-if="v$.dateOfBirth.$dirty && v$.dateOfBirth.required.$invalid">
          <div class="error-msg">Enter date of birth</div>
        </div>
        <div class="input-errors" v-else-if="v$.dateOfBirth.$dirty && v$.dateOfBirth.minLength.$invalid">
          <div class="error-msg">Enter a valid date in the format YYYY-MM-DD"</div>
        </div>
        <div
          class="input-errors"
          v-else-if="
            isValidAge.age !== null && isValidAge.age >= 0 ? v$.dateOfBirth.$dirty && !isValidAge.isTrue : false
          "
        >
          <div class="error-msg">Age is below the allowed limit({{ minAge }}). You'r {{ isValidAge.age }} now</div>
        </div>
        <div class="input-errors" v-else-if="v$.dateOfBirth.$dirty && !isValidAge.isTrue">
          <div class="error-msg">Birth date cannot be in the future. Enter a valid date</div>
        </div>
        <div
          class="input-errors"
          v-else-if="isValidAge.age !== null ? v$.dateOfBirth.$dirty && isValidAge.age >= 150 : false"
        >
          <div class="error-msg">Enter an existing date</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, Ref, watch } from 'vue';
import { useStore } from 'vuex';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { validateLastName, validateFirstName, formatDate } from '@/utils/auth/validator';
import { calculateAge } from '@/utils/auth/calculateAge';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';
import { PersonalAccount } from '@/types/auth/RegisterData';

const store = useStore();
const getUser = computed(() => store.getters['customer/getUser']);
const getVersion = computed(() => store.getters['customer/getVersion']);
const isEmailEdit = ref(false);
const isFirstNameEdit = ref(false);
const isLastNameEdit = ref(false);
const isDateBirthEdit = ref(false);
const minAge: Ref<number> = ref(13);
const calcAgeValidator = computed(() => calculateAge(data.dateOfBirth, minAge.value).isTrue);
const isValidAge: Ref<{ isTrue: boolean; age: number | null }> = ref(
  calculateAge(getUser.value.dateOfBirth, minAge.value),
);
const data: PersonalAccount = reactive({
  firstName: getUser.value.firstName,
  lastName: getUser.value.lastName,
  email: getUser.value.email,
  dateOfBirth: getUser.value.dateOfBirth,
  version: getVersion,
});
const rules = computed(() => {
  return {
    firstName: { required, validateFirstName },
    lastName: { required, validateLastName },
    email: { required, email },
    dateOfBirth: { required, minLength: minLength(10), calcAgeValidator },
  };
});
const v$ = useVuelidate(rules, data);

watch(
  () => data.dateOfBirth,
  (newFormDate) => {
    data.dateOfBirth = formatDate(newFormDate);

    if (!v$.value.dateOfBirth.minLength.$invalid) {
      isValidAge.value = calculateAge(data.dateOfBirth, minAge.value);
    }
  },
);

// eslint-disable-next-line max-lines-per-function
async function setFirstName(event: Event, mode: string) {
  if (mode === 'submit') {
    const isFormCorrect = await v$.value.$validate();

    if (!isFormCorrect) return;
    isFirstNameEdit.value = !isFirstNameEdit.value;

    const parentElem = event.currentTarget as HTMLElement;

    const input = parentElem.parentElement?.parentElement?.firstChild as HTMLInputElement;

    const formData = {
      version: data.version,
      actions: [
        {
          action: 'setFirstName',
          firstName: input.value,
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
          pending: 'First name is updating',
          success: 'First name has updated 👌',
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
    isFirstNameEdit.value = !isFirstNameEdit.value;
    data.firstName = getUser.value.firstName;
  }
}
// eslint-disable-next-line max-lines-per-function
async function setLastName(event: Event, mode: string) {
  if (mode === 'submit') {
    const isFormCorrect = await v$.value.$validate();

    if (!isFormCorrect) return;
    isLastNameEdit.value = !isLastNameEdit.value;

    const parentElem = event.currentTarget as HTMLElement;

    const input = parentElem.parentElement?.parentElement?.firstChild as HTMLInputElement;

    const formData = {
      version: data.version,
      actions: [
        {
          action: 'setLastName',
          lastName: input.value,
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
          pending: 'Last name is updating',
          success: 'Last name has updated 👌',
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
    isLastNameEdit.value = !isLastNameEdit.value;
    data.lastName = getUser.value.lastName;
  }
}
// eslint-disable-next-line max-lines-per-function
async function setDateOfBirth(event: Event, mode: string) {
  if (mode === 'submit') {
    const isFormCorrect = await v$.value.$validate();

    if (!isFormCorrect) return;
    isDateBirthEdit.value = !isDateBirthEdit.value;

    const parentElem = event.currentTarget as HTMLElement;

    const input = parentElem.parentElement?.parentElement?.firstChild as HTMLInputElement;

    const formData = {
      version: data.version,
      actions: [
        {
          action: 'setDateOfBirth',
          dateOfBirth: input.value,
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
          pending: 'Date of birth is updating',
          success: 'Date of birth has updated 👌',
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
    isDateBirthEdit.value = !isDateBirthEdit.value;
    data.dateOfBirth = getUser.value.dateOfBirth;
  }
}
// eslint-disable-next-line max-lines-per-function
async function setEmail(event: Event, mode: string) {
  if (mode === 'submit') {
    const isFormCorrect = await v$.value.$validate();

    if (!isFormCorrect) return;
    isEmailEdit.value = !isEmailEdit.value;

    const parentElem = event.currentTarget as HTMLElement;

    const input = parentElem.parentElement?.parentElement?.firstChild as HTMLInputElement;

    const formData = {
      version: data.version,
      actions: [
        {
          action: 'changeEmail',
          email: input.value,
        },
      ],
    };

    store.commit('customer/setVersion', data.version + 1);

    try {
      const updateCustomer = async () => {
        const res = await store.dispatch('customer/updateCustomer', formData);

        store.commit('customer/setVersion', res.body.version);
      };

      toast.promise(
        updateCustomer,
        {
          pending: 'Email is updating',
          success: 'Email has updated 👌',
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
    isEmailEdit.value = !isEmailEdit.value;
    data.email = getUser.value.email;
  }
}
</script>

<style lang="scss" scoped>
$errorColor: #ff3333;
$mainWhiteColor: #fefefe;
$darkBackgroundColor: #010101;
.profile {
  &__header {
    font-size: 20px;
    font-weight: 900;
    border-bottom: 1px solid #fefefecc;
    margin-bottom: 20px;
    line-height: 50px;
    transition: 0.5s ease;
    @media (max-width: 600px) {
      font-size: calc(16px + (20 - 16) * ((100vw - 320px) / (600 - 320)));
      margin-bottom: 15px;
      padding-bottom: 15px;
    }
  }
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
    & .row {
      display: flex;
      flex-direction: row;
      gap: 20px;
      @media (max-width: 768px) {
        flex-direction: column;
      }
    }
  }
}
.form-control {
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (min-width: 768px) {
    width: 100%;
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
  & label {
    color: $mainWhiteColor;
    opacity: 0.8;
    white-space: nowrap;
    font-size: 16px;
    @media (max-width: 600px) {
      font-size: 15px;
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
</style>
