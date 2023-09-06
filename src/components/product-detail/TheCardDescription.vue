<template>
  <div class="description">
    <div class="description__navigation">
      <p
        :class="`description__navigation__item ${choiceNav === 'desc' ? 'active' : ''}`"
        @click="() => (choiceNav = 'desc')"
      >
        Product Description
      </p>
      <p
        :class="`description__navigation__item ${choiceNav === 'req' ? 'active' : ''}`"
        @click="() => (choiceNav = 'req')"
        v-if="props.requirements !== 'undefined'"
      >
        System Requirements
      </p>
    </div>
    <div class="description__separator"></div>
    <div class="description__content">
      <transition name="slide" mode="out-in">
        <p class="description__main" v-if="choiceNav === 'desc'">{{ props.description }}</p>
        <p class="description__require" v-else>{{ props.requirements }}</p>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const choiceNav = ref('desc');
const props = defineProps<{
  description: string;
  requirements: string;
}>();
</script>

<style lang="scss" scoped>
.description {
  display: flex;
  align-items: center;
  flex-direction: column;

  &__navigation {
    width: 100%;
    max-width: 1000px;
    display: flex;

    &__item {
      position: relative;
      z-index: 2;
      color: #868686;
      margin-left: 46px;
      padding-bottom: 22px;
      cursor: pointer;
      font-size: 22px;
      font-weight: 400;
      line-height: 130%;
      border-bottom: 1px solid #13101b;
      transition: all 0.3s linear;
    }

    &__item:hover {
      color: #4277ff;
      border-bottom: 2px solid #4277ff;
    }

    &__item.active,
    &__item:active {
      color: #ffffff;
      border-bottom: 2px solid #ffffff;
    }
  }

  &__separator {
    width: 100%;
    max-width: 1000px;
    height: 1px;
    margin-bottom: 57px;
    background-color: #13101b;
    transform: translateY(-1px);
  }

  &__content {
    width: 100%;
    max-width: 1000px;
    color: #9d9aa6;
    font-size: 17px;
    font-weight: 400;
    line-height: 180%;
  }
}

@media (max-width: 940px) {
  .description__require,
  .description__main {
    max-width: 80%;
    margin: auto;
  }
}
</style>
