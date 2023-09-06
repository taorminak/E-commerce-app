<template>
  <header class="header">
    <nav class="top-navigation">
      <div class="menu-button-container">
        <button class="menu-icon" @click="toggleMenu">
          <font-awesome-icon
            :icon="['fas', 'bars']"
            class="menu_bars fa-rotate-transition"
            :class="{ 'fa-rotate-90': showMenu }"
          ></font-awesome-icon>
        </button>
      </div>
      <div class="menu-overlay" v-if="showMenu" @click="toggleMenuAndHide"></div>
      <div class="menu-links" :class="{ active: showMenu }">
        <div class="menu-categories">
          <router-link
            :to="{ name: 'catalog' }"
            class="nav-link"
            :class="{ active: activeLink === 'catalog' }"
            data-type="catalog"
            @click="
              setActiveLink('catalog');
              hideMenu();
            "
            >Products</router-link
          >
          |
          <router-link
            to="/#reviews"
            class="nav-link reviews"
            :class="{ active: activeLink === 'reviews' }"
            data-type="reviews"
            @click="
              setActiveLink('reviews');
              hideMenu();
            "
            >Reviews</router-link
          >
          |
          <router-link
            to="/#promotions"
            class="nav-link promotions"
            :class="{ active: activeLink === 'promotions' }"
            data-type="promotions"
            @click="
              setActiveLink('promotions');
              hideMenu();
            "
            >Promotions</router-link
          >
          |
          <router-link
            :to="{ name: 'about' }"
            class="nav-link about"
            :class="{ active: activeLink === 'about' }"
            data-type="about"
            @click="
              setActiveLink('about');
              hideMenu();
            "
            >About us</router-link
          >
        </div>
      </div>
    </nav>

    <nav class="bottom-navigation">
      <router-link
        to="/"
        class="logo-link nav-link"
        :class="{ active: activeLink === 'logo' }"
        data-type="logo"
        @click="setActiveLink('logo')"
      >
        <img src="../../../public/icon_logo2.png" alt="logo" />
        <span class="link-text">Playnchill</span>
      </router-link>
      <div class="search-input">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Search products"
          class="search-input input"
          list="productSuggestions"
          @input="searchProducts"
        />
        <font-awesome-icon :icon="['fas', 'search']" class="search-icon" @click="handleSearch"></font-awesome-icon>
        <datalist id="productSuggestions">
          <option v-for="(product, index) in productSuggestions" :value="product" :key="index">{{ product }}</option>
        </datalist>
      </div>
      <div>
        <router-link
          v-if="!isLoggedIn"
          :to="{ name: 'signup' }"
          class="nav-link"
          :class="{ active: activeLink === 'signup' }"
          data-type="signup"
          @click="setActiveLink('signup')"
          >Sign up</router-link
        >
        <router-link
          v-if="!isLoggedIn"
          :to="{ name: 'login' }"
          class="nav-link login"
          :class="{ active: activeLink === 'login' }"
          data-type="login"
          @click="setActiveLink('login')"
          >Log in</router-link
        >
        <div v-else>
          <router-link
            :to="{ name: 'userProfile' }"
            class="nav-link logout"
            :class="{ active: activeLink === 'user' }"
            data-type="logout"
            >User Profile</router-link
          >
          <router-link
            to=""
            class="nav-link logout"
            :class="{ active: activeLink === 'logout' }"
            data-type="logout"
            @click="setActiveLink('logout'), logout()"
            >Log out</router-link
          >
        </div>

        |
        <router-link
          :to="{ name: 'cart' }"
          class="nav-link cart-link"
          :class="{ active: activeLink === 'cart' }"
          data-type="cart"
          @click="setActiveLink('cart')"
        >
          <font-awesome-icon :icon="['fas', 'cart-shopping']"></font-awesome-icon>
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { ProductItem } from '@/types/interfaces/productItem';
import { defineComponent } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default defineComponent({
  data() {
    return {
      selectedCurrency: '$',
      selectedLanguage: 'EN',
      searchTerm: '',
      activeLink: '',
      showMenu: false,
      productSuggestions: [] as string[],
    };
  },
  methods: {
    setActiveLink(linkType: string) {
      this.activeLink = linkType;
    },
    logout() {
      this.$store.dispatch('customer/logout');
      toast.success(`Bye bye, ` + this.$store.getters['customer/getCurrentUserFirstName'], {
        autoClose: 1000,
        theme: 'dark',
        icon: '🎉',
        transition: toast.TRANSITIONS.SLIDE,
      });
    },
    toggleMenuAndHide() {
      this.toggleMenu();
      this.hideMenu();
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    hideMenu() {
      this.showMenu = false;
    },
    searchProducts() {
      const searchTerm = this.searchTerm.toLowerCase();
      const products = this.$store.state.products.products || [];

      const filteredProducts = products.filter((product: ProductItem) => {
        const productName = product.name['en-US'].toLowerCase();

        return productName.includes(searchTerm);
      });

      this.productSuggestions = filteredProducts.map((product: ProductItem) => product.name['en-US']);

      if (this.$route.name === 'catalog') {
        this.$store.commit('setProducts', filteredProducts);
      }
    },
    handleSearch() {
      if (this.$route.name === 'catalog') {
        this.searchProducts();

        this.searchTerm = '';
      }
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters['customer/getIsLoggedIn'];
    },
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/global.scss';

.header {
  position: relative;
  height: 157px;
  z-index: 2;
}

.search-input {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 40vw;
  height: 66px;
  border: none;
  box-sizing: border-box;
  outline: none;
  color: $white-color;
  border-radius: 15px;
  background: rgba(196, 196, 196, 0.05);
  &.input {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 40vw;
    height: 66px;
    border: none;
    padding-left: 15px;
    box-sizing: border-box;
    outline: none;
    color: $white-color;
    border-radius: 15px;
    background: rgba(196, 196, 196, 0.05);
  }
}

.search-icon {
  position: absolute;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);
  font-size: 16px;
  color: #ffffff33;
  cursor: pointer;
}

.top-navigation {
  padding-top: 25px;
  height: 34px;
  color: $white-color;

  .language-icon,
  .currency-icon {
    cursor: pointer;
    margin: 0 5px;
  }

  .bottom-navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav-link {
    color: $white-color;
  }
}

.menu-button-container {
  visibility: hidden;
}

nav {
  max-width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: $manrope-font-family;
  margin: 0 auto;
  margin-bottom: 24px;

  a {
    font-weight: bold;
    margin: 10px;
    text-decoration: none;
    color: $white-color;
    font-family: $manrope-font-family;
    font-size: 16px;
    font-weight: 600;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
  }
}

.nav-link.active {
  color: #808080;
  font-weight: 600;
}

nav .nav-link:hover {
  color: #a0a0a0;
}

.cart-link {
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
  color: $white-color;

  &:hover {
    color: #808080;
  }

  &:active {
    color: #a0a0a0;
  }
}
.cart-link img {
  height: 25px;
}
.logo-link {
  display: flex;
  align-items: center;
  font-family: $manrope-font-family;
  font-size: 32px;
  font-weight: 800;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
  text-decoration: none;
  color: inherit;
  margin: 0;
  padding: 0;

  img {
    margin-right: 10px;
    height: 29px;
    color: $white-color;
  }

  .link-text {
    white-space: nowrap;
    color: $white-color;
  }
}

.language-icon {
  color: $white-color;
  font-family: $manrope-font-family;
}

.currency-icon {
  color: $white-color;
}

select {
  background-color: black;
  color: $white-color;
  border: none;
}

option {
  background-color: black;
  color: $white-color;
  padding: 5px;
}

.icon {
  margin-right: 5px;
}

option:checked {
  background-color: #808080;
  font-weight: bold;
}

@media (max-width: 768px) {
  .header {
    height: auto;
    width: 90vw;
    margin: auto;
  }

  nav {
    max-width: 100%;
  }
}

@media (max-width: 380px) {
  .search-input {
    display: none;
  }

  .bottom-navigation {
    width: 90vw;
    margin: auto;
  }

  .link-text {
    width: 90px;
    font-size: 22px;
  }

  .logo-link img {
    width: 20px;
    height: auto;
    margin: 5px;
  }
  .menu-icon {
    position: relative;
    top: 0;
    left: 25px;
    background: none;
    border: none;
    color: $white-color;
    font-size: 24px;
    cursor: pointer;
    z-index: 9999;
    margin: 0;
  }

  .menu_bars {
    position: relative;
    top: 0;
    left: 0;
    color: $white-color;
    z-index: 9998;
  }

  .menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(19, 16, 27, 1);
    z-index: 9997;
  }

  .menu-links {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;

    &.active {
      display: flex;
    }

    .menu-categories {
      position: relative;
      top: 0;
      left: 0;
      z-index: 10001;
      flex-direction: column;
      align-items: flex-start;
      color: white;
      display: flex;

      &.active {
        display: flex;
      }

      .nav-link {
        position: relative;
        top: 0;
        left: 0;
        z-index: 10002;
        color: white;
        text-decoration: none;
        padding: 20px;
        font-size: 28px;
        transition: background-color 0.2s ease;
        font-size: 14px;

        &:hover {
          color: rgba(255, 255, 255, 0.1);
        }
      }
    }
  }

  .menu-button-container {
    display: block;
    position: relative;
    top: 0;
    left: 0;
    z-index: 100000;
    visibility: visible;
  }

  .fa-rotate-90 {
    transform: rotate(90deg);
  }

  .fa-rotate-transition {
    transition: transform 0.3s ease;
  }
}
</style>
