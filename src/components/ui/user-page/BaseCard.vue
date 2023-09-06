<template>
  <div class="card-wrapper">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.card-wrapper {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(255, 255, 255, 0.26);
  padding: 20px;
  margin: 30px auto;
  max-width: 40rem;
  @media (max-width: 600px) {
    margin: calc(20px + (30 - 20) * ((100vw - 320px) / (600 - 320))) auto;
  }
}
</style>
