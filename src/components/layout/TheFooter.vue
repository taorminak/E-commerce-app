<template>
  <footer>
    <div class="footer_payments">
      <img class="footer-icon" src="@/assets/images/paypal-logo.png" alt="PayPal" />
      <img class="footer-icon" src="@/assets/images/mastercard-logo.png" alt="MasterCard" />
      <img class="footer-icon" src="@/assets/images/mir-logo.png" alt="MIR" />
      <img class="footer-icon" src="@/assets/images/WebMoney_logo.png" alt="WebMoney" />
      <img class="footer-icon" src="@/assets/images/visa-logo.png" alt="Visa" />
      <img class="footer-icon" src="@/assets/images/mastercard-logo.png" alt="MasterCard" />
      <img class="footer-icon" src="@/assets/images/paypal-logo.png" alt="PayPal" />
    </div>
    <div class="footer-columns">
      <div class="footer_column">
        <h3>About Company</h3>
        <ul>
          <li>
            <router-link
              to="/about"
              class="nav-link about"
              :class="{ active: activeLink === 'about' }"
              data-type="about"
              @click="setActiveLink('about')"
              >About us</router-link
            >
          </li>
          <li><a href="#" v-if="showEmptyLinks"></a>Legal Information</li>
          <li><a href="#" v-if="showEmptyLinks"></a>Careers</li>
        </ul>
      </div>

      <div class="footer_column">
        <h3>Terms of Service</h3>
        <ul>
          <li>
            <router-link
              to="/catalog"
              class="nav-link"
              :class="{ active: activeLink === 'catalog' }"
              data-type="catalog"
              @click="setActiveLink('catalog')"
              >Products</router-link
            >
          </li>
          <li>
            <router-link
              to="/#promotions"
              class="nav-link promotions"
              :class="{ active: activeLink === 'promotions' }"
              data-type="promotions"
              @click="setActiveLink('promotions')"
              >Promotions</router-link
            >
          </li>
          <li>
            <router-link
              to="/login"
              class="nav-link"
              :class="{ active: activeLink === 'login' }"
              data-type="login"
              @click="setActiveLink('login')"
              >Personal Account</router-link
            >
          </li>
        </ul>
      </div>
      <div class="footer_column">
        <h3>Shop Info</h3>
        <ul>
          <li><a href="#" v-if="showEmptyLinks"></a>New Products</li>
          <li>
            <router-link
              to="/#reviews"
              class="nav-link reviews"
              :class="{ active: activeLink === 'reviews' }"
              data-type="reviews"
              @click="setActiveLink('reviews')"
              >Reviews</router-link
            >
          </li>
          <li><a href="#" v-if="showEmptyLinks"></a>Our Blog</li>
        </ul>
      </div>
      <div class="footer_column footer_column_image">
        <div>
          <img src="@/assets/images/webmoney.png" alt="Verified WebMoney" />
          <div>Verified <br /><span>WebMoney</span></div>
        </div>
        <div>
          <img src="@/assets/images/SafeBrowsing_Icon.png" alt="Safe Browsing Google" />
          <div>Safe Browsing <br /><span>Google</span></div>
        </div>
      </div>
    </div>
    <div class="footer_bottom">
      <p>
        All sold keys are purchased from official distributors and publishers, including 1C-SoftClub, Buka, New Disc,
        and Enaza.
      </p>
      <div class="footer_bottom_line">
        <div class="footer_bottom_legal"><a href="#" v-if="showEmptyLinks"></a>Legal Information</div>
        <div class="footer_bottom_copywrite">&copy; 2023 Playnchill. All Rights Reserved.</div>
        <div class="footer_bottom_icons">
          <a href="https://www.vk.com" target="_blank">
            <font-awesome-icon :icon="['fab', 'vk']" class="footer_icon" />
          </a>
          <a href="https://www.discord.com" target="_blank">
            <font-awesome-icon :icon="['fab', 'discord']" class="footer_icon icon_discord" />
          </a>
          <a href="https://www.twitter.com" target="_blank">
            <font-awesome-icon :icon="['fab', 'x-twitter']" class="footer_icon" />
          </a>
          <a href="https://www.instagram.com" target="_blank">
            <font-awesome-icon :icon="['fab', 'instagram']" class="footer_icon" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      showEmptyLinks: false,
      activeLink: '',
    };
  },
  methods: {
    setActiveLink(linkType: string) {
      this.activeLink = linkType;
    },
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/global.scss';

.nav-link {
  color: rgba(205, 205, 207, 1);
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: rgba(99, 104, 109, 1);
  }
}

.footer_payments {
  width: 80vw;
  margin: auto;
  margin-bottom: 60px;

  img {
    height: 40px;
    margin-right: 38px;
    margin-top: 60px;
  }
}

.footer-columns {
  width: 80vw;
  margin: auto;
  margin-bottom: 50px;
  margin-top: 20px;
  align-items: flex-start;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
}

.footer_column {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 25px;

  h3 {
    font-size: 20px;
    margin-bottom: 10px;
    font-family: $manrope-font-family;
    font-size: 22px;
    font-weight: 600;
    line-height: 29px;
    letter-spacing: 0em;
    text-align: left;
    color: $white-color;
    cursor: pointer;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 25px;
    align-items: flex-start;
    justify-content: center;
    list-style: none;
    padding: 0;
  }

  img {
    width: 50px;
    margin-top: 10px;
  }

  li {
    margin-bottom: 5px;
    color: rgba(205, 205, 207, 1);
    font-size: 19px;
    font-weight: 400;
    line-height: 25px;
    letter-spacing: 0em;
    text-align: left;
    cursor: pointer;

    &:hover {
      color: #808080;
    }
  }
}

.footer_column_image {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 100px;
  text-align: center;
  flex-wrap: nowrap;
  margin: auto;

  img {
    width: 50px;
    height: auto;
  }

  div {
    font-family: $manrope-font-family;
    font-size: 13px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: center;
    color: $white-color;
  }

  span {
    font-family: $manrope-font-family;
    font-size: 13px;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: center;
  }
}

.footer_bottom {
  width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  color: rgba(99, 104, 109, 1);
  font-family: Inter;
  font-size: 15px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  margin: auto;
  margin-bottom: 200px;

  p {
    margin-bottom: 50px;
  }

  .footer_bottom_line {
    display: flex;
    width: 80vw;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: baseline;
    font-family: Inter;
    font-size: 18px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;

    .footer_bottom_copywrite:hover {
      color: rgba(205, 205, 207, 1);
    }

    .footer_bottom_legal {
      color: rgba(66, 119, 255, 1);
      cursor: pointer;
    }

    .footer_bottom_icons {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      font-size: 21px;
      cursor: pointer;

      .footer_icon {
        color: rgba(255, 255, 255, 0.15);
      }

      .footer_icon:hover {
        color: #808080;
      }

      .icon_discord {
        color: #77be1d;
      }
    }
  }
}

@media (max-width: 768px) {
  .footer_payments,
  .footer-columns {
    width: 90vw;
    margin-left: auto;
    margin-right: auto;
  }

  .footer_column {
    align-items: center;
    text-align: center;
    gap: 10px;

    h3 {
      font-size: 18px;
      margin-bottom: 5px;
      line-height: 24px;
    }

    ul {
      align-items: center;
      justify-content: center;
      gap: 15px;
    }

    img {
      width: 30px;
      height: auto;
    }

    div,
    span {
      font-size: 12px;
      line-height: 16px;
    }
  }

  .footer_column_image {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }

  .footer_payments {
    img {
      height: 25px;
      margin-right: 2px;
      margin-top: 15px;
      margin-bottom: 25px;
    }
  }

  .footer-column ul {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .footer-columns {
    width: 90vw;
    margin: auto;
    margin-bottom: 50px;
    align-items: flex-start;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;

    h3 {
      font-size: 20px;
      font-weight: 600;
      line-height: 26px;
      letter-spacing: 0em;
      text-align: left;
      white-space: nowrap;
    }

    li {
      font-size: 14px;
      font-weight: 400;
      line-height: 18px;
      letter-spacing: 0em;
      text-align: left;
    }
  }

  .footer_column_image {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 0;
    flex-wrap: nowrap;
    margin: auto;

    img {
      width: 40px;
      height: auto;
    }
  }

  .footer_bottom {
    width: 90vw;
    font-size: 12px;
    font-weight: 400;
    line-height: 19px;
    margin: auto;
    margin-bottom: 200px;

    p {
      margin-bottom: 50px;
    }

    .footer_bottom_line {
      display: flex;
      gap: 20px;
      width: 90vw;
      flex-direction: column-reverse;
      flex-wrap: wrap;
      font-size: 18px;

      .footer_bottom_copywrite {
        font-size: 16px;
        &:hover {
          color: rgba(205, 205, 207, 1);
        }

        .footer_bottom_legal {
          color: rgba(66, 119, 255, 1);
          cursor: pointer;
        }

        .footer_bottom_icons {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          font-size: 21px;
          cursor: pointer;

          .footer_icon {
            color: rgba(255, 255, 255, 0.15);
          }

          .footer_icon:hover {
            color: #808080;
          }

          .icon_discord {
            color: #77be1d;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .footer_payments {
    margin-bottom: 40px;
    img {
      max-height: 14px;
      margin-right: 2px;
      margin-top: 15px;
    }
  }
}
</style>
