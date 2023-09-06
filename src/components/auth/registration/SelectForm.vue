<template>
  <div class="select">
    <p
      class="title"
      :class="{ active: selected.value !== 'Select country' }"
      @click="areOptionsVisible = !areOptionsVisible"
      v-click-out-side="hideSelect"
    >
      {{ selected.value }}
    </p>
    <div class="select__options-wrapper" v-if="areOptionsVisible">
      <p class="select__option" v-for="option in countries" :key="option.title" @click="selectOption(option)">
        {{ option.value }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { Country } from '@/types/auth/SelectFormCountry';

defineProps<{
  countries: Country[];
  selected: Country;
}>();

const emit = defineEmits(['select']);

const areOptionsVisible: Ref<boolean> = ref(false);

function selectOption(option: Country) {
  areOptionsVisible.value = false;
  emit('select', option);
}
function hideSelect() {
  areOptionsVisible.value = false;
}
</script>

<style lang="scss">
.select {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  color: rgb(117, 117, 117, 0.8);
  font-size: 15px;
  width: 100%;
  border-radius: 6px;
  background: #010110;
  transition: 0.2s;

  &.disabled {
    opacity: 0.3;
    cursor: no-drop;
    & .title {
      pointer-events: none;
    }
  }

  &.error {
    border: 1px solid #ff3333;
    background: #ffe6e6;
  }
  &__option {
    cursor: pointer;
    padding: 10px 15px;
    transition: 0.3s;
    @media (max-width: 1200px) {
      padding-top: calc(5px + 5 * ((100vw - 320px) / (1200 - 320)));
      padding-bottom: calc(5px + 5 * ((100vw - 320px) / (1200 - 320)));
      padding-left: calc(5px + 10 * ((100vw - 320px) / (1200 - 320)));
      padding-right: calc(5px + 10 * ((100vw - 320px) / (1200 - 320)));
      font-size: calc(11px + 4 * ((100vw - 320px) / (1200 - 320)));
    }

    &:not(:last-child) {
      border-bottom: 1px solid #383636;
    }
    &:not(:last-child):hover {
      background: rgba(255, 255, 255, 0.5);
      color: #fefefe;
    }
    &:last-child {
      border-radius: 0 0 6px 6px;
    }
    &:last-child:hover {
      background: rgba(255, 255, 255, 0.5);
      color: #fefefe;
    }
  }
  &__options-wrapper {
    position: absolute;
    top: 32px;
    right: 0;
    width: 100%;
    border-left: 1px solid #383636;
    border-right: 1px solid #383636;
    border-bottom: 1px solid #383636;
    border-radius: 0 0 6px 6px;
    background: #010110;
    z-index: 2;
    @media (max-width: 1200px) {
      top: calc(25px + 7 * ((100vw - 320px) / (1200 - 320)));
    }
  }
}
.title {
  text-align: left;
  padding: 10px 15px;
  border: 1px solid #383636;
  border-radius: 6px;
  line-height: normal;
  font-size: 15px;
  width: 100%;
  // background: #010110;
  cursor: pointer;
  @media (max-width: 1200px) {
    padding-top: calc(5px + 5 * ((100vw - 320px) / (1200 - 320)));
    padding-bottom: calc(5px + 5 * ((100vw - 320px) / (1200 - 320)));
    padding-left: calc(5px + 10 * ((100vw - 320px) / (1200 - 320)));
    padding-right: calc(5px + 10 * ((100vw - 320px) / (1200 - 320)));
    font-size: calc(13px + 2 * ((100vw - 320px) / (1200 - 320)));
  }
  &.active {
    color: #fefefe;
  }
}
</style>
