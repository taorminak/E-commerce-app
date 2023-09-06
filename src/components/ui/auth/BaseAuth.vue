<template>
  <div class="auth__wrapper">
    <div class="auth__header">
      <div class="auth__logo-wrapper">
        <div class="auth__logo">
          <img src="@/assets/icon_logo2.png" alt="main_logo" />
        </div>
        <h1>Playnchill</h1>
      </div>
      <base-auth-button close mode="dark">main</base-auth-button>
    </div>
    <slot class="slot"></slot>
  </div>
</template>

<style lang="scss" scoped>
.auth {
  &__wrapper {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    width: 100%;
    padding: 15px 20px;
    background: #1c1c1c;
    border-radius: 10px;
    border: 1px solid #383636;
    & > *:not(:last-child) {
      margin-bottom: 20px;
      @media (max-width: 1200px) {
        margin-bottom: calc(10px + 10 * ((100vw - 320px) / (1200 - 320)));
      }
    }
  }

  &__logo-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    h1 {
      color: #f3f3f3;
      font-weight: 600;
      font-size: 20px;
      @media (max-width: 1200px) {
        font-size: calc(15px + 5 * ((100vw - 320px) / (1200 - 320)));
      }
    }
  }
  &__logo {
    width: 25px;
    @media (max-width: 1200px) {
      width: calc(20px + 5 * ((100vw - 320px) / (1200 - 320)));
    }
    img {
      height: 100%;
      width: 100%;
    }
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
