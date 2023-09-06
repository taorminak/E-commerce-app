<template>
  <div class="checkbox-wrapper">
    <label class="container">
      <input id="checkbox" type="checkbox" :checked="modelValue" @change="isCheckboxTrue" />
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
    <label for="checkbox" class="checkbox-text">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean;
  label: string;
}>();

const emit = defineEmits(['update:modelValue']);

function isCheckboxTrue(e: Event) {
  const checkbox = e.target as HTMLInputElement;

  emit('update:modelValue', checkbox.checked);
}
</script>

<style lang="scss" scoped>
.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100%;
  margin-top: 15px;
  & .checkbox-text {
    color: #fefefecc;
    font-size: 13px;
    @media (max-width: 1200px) {
      font-size: calc(10px + (13 - 10) * ((100vw - 320px) / (1200 - 320)));
    }
    cursor: pointer;
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
