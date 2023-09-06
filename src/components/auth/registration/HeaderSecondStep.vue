<template>
  <div class="address-wrapper">
    <h2>Shipping address</h2>
    <h2>Billing address</h2>
  </div>
</template>

<script setup lang="ts"></script>
<style lang="scss" scoped>
.address-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  & h2 {
    width: 50%;
    color: #fefefecc;
    font-size: 13px;
    @media (max-width: 1200px) {
      font-size: calc(10px + (13 - 10) * ((100vw - 320px) / (1200 - 320)));
    }
  }

  & h2:first-child {
    text-align: left;
  }

  & h2:last-child {
    text-align: right;
  }
}
</style>
