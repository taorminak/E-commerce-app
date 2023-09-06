<template>
  <div class="radio-wrapper">
    <div class="radio-button-wrapper">
      <label class="container">
        <input
          :class="{ addressInput: mode }"
          data-type="billingAddress"
          type="checkbox"
          :name="addressId"
          @change="setBillingAddress"
        />
        <div class="checkmark">
          <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
            <title>Checkmark</title>
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="32"
              d="M416 128L192 384l-96-96"
            ></path>
          </svg>
        </div>
      </label>
      <label class="radio-text" for="radio1">{{ billingAddress }}</label>
    </div>
    <div class="radio-button-wrapper">
      <label class="container" :class="{ disabled: isBothAddressChecked }">
        <input
          type="checkbox"
          data-type="shippingAddress"
          :class="{ addressInput: mode }"
          :name="addressId"
          :disabled="isBothAddressChecked"
          @change="setShippingAddress"
        />
        <div class="checkmark">
          <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
            <title>Checkmark</title>
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="32"
              d="M416 128L192 384l-96-96"
            ></path>
          </svg>
        </div>
      </label>
      <label class="radio-text" for="radio2" :class="{ disabled: isBothAddressChecked }">{{ shippingAddress }}</label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const store = useStore();
const props = defineProps<{
  isBothAddressChecked?: boolean;
  shippingAddress?: string;
  billingAddress?: string;
  addressId?: string;
  mode?: string;
  version?: number;
}>();

// eslint-disable-next-line max-lines-per-function
function setShippingAddress(event: Event) {
  const inputElem = event.target as HTMLInputElement;
  const spanShipping = inputElem
    .closest('.address-card')
    ?.querySelector('.address-card__span-block > span[data-span="spanShipping"]') as HTMLSpanElement;
  const allSpans = [...document.querySelectorAll('span[data-span="spanShipping"]')] as HTMLSpanElement[];

  allSpans.forEach((span) => {
    span.style.display = 'none';
  });

  const allInputs = [...document.querySelectorAll("input[data-type='shippingAddress']")] as HTMLInputElement[];

  try {
    const updateCustomer = async () => {
      const res = await store.dispatch('customer/updateCustomer', {
        version: props.version,
        actions: [
          {
            action: 'setDefaultShippingAddress',
            addressId: props.addressId,
          },
        ],
      });

      store.commit('customer/setVersion', res.body.version);
    };

    toast.promise(
      updateCustomer,
      {
        pending: 'Default shipping address is updating',
        success: 'Default shipping address has updated 👌',
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

  spanShipping.style.display = 'inline';

  allInputs.forEach((input: HTMLInputElement) => {
    input.checked = false;
  });
  inputElem.checked = true;
}
// eslint-disable-next-line max-lines-per-function
function setBillingAddress(event: Event) {
  const inputElem = event.target as HTMLInputElement;
  const allSpans = [...document.querySelectorAll('span[data-span="spanBilling"]')] as HTMLSpanElement[];
  const spanBilling = inputElem
    .closest('.address-card')
    ?.querySelector('.address-card__span-block > span[data-span="spanBilling"]') as HTMLSpanElement;

  allSpans.forEach((span) => {
    span.style.display = 'none';
  });

  try {
    const updateCustomer = async () => {
      const res = await store.dispatch('customer/updateCustomer', {
        version: props.version,
        actions: [
          {
            action: 'setDefaultBillingAddress',
            addressId: props.addressId,
          },
        ],
      });

      store.commit('customer/setVersion', res.body.version);
    };

    toast.promise(
      updateCustomer,
      {
        pending: 'Default billing address is updating',
        success: 'Default billing address has updated 👌',
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
  spanBilling.style.display = 'inline';

  const allInputs = [...document.querySelectorAll("input[data-type='billingAddress']")] as HTMLInputElement[];

  allInputs.forEach((input: HTMLInputElement) => {
    input.checked = false;
  });
  inputElem.checked = true;
}
</script>
<style lang="scss" scoped>
.radio-button-wrapper {
  display: flex;
  align-items: center;
  width: 50%;
  gap: 15px;
}
.radio-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  margin-top: 15px;

  & .radio-text {
    color: #fefefecc;
    font-size: 13px;
    @media (max-width: 1200px) {
      font-size: calc(10px + (13 - 10) * ((100vw - 320px) / (1200 - 320)));
    }
    transition: 0.2s;
    cursor: pointer;
    &.disabled {
      opacity: 0.3;
      cursor: no-drop;
    }
  }
}
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  display: none;
  color: white;
}

.container {
  width: 25px;
  display: block;
  height: 25px;
  background-color: #191a1e;
  border-radius: 100%;
  cursor: pointer;
  padding: 5px;
  color: white;
  box-shadow: 1.5px 1.5px 3px #0e0e0e, -1.5px -1.5px 3px rgb(95 94 94 / 25%), inset 0px 0px 0px #0e0e0e,
    inset 0px -0px 0px #5f5e5e;
  &.disabled {
    cursor: no-drop;
  }
}

.container .checkmark {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: 1.5px 1.5px 3px #0e0e0e, -1.5px -1.5px 3px rgb(95 94 94 / 25%), inset 0px 0px 0px #0e0e0e,
    inset 0px -0px 0px #5f5e5e;
  transition: all ease 0.3s;
  padding: 5px;
}

.container .checkmark svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: all ease 0.3s;
}

.container input:checked + .checkmark {
  box-shadow: 0px 0px 0px #0e0e0e, 0px 0px 0px rgb(95 94 94 / 25%), inset 1.5px 1.5px 3px #0e0e0e,
    inset -1px -1px 3px #5f5e5e;
}

.container input:checked + .checkmark svg {
  opacity: 1;
}
</style>
