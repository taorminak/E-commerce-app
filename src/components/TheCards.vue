<template>
  <div class="card-container">
    <div class="card green">
      <h2>Start Playing Minecraft right now!</h2>
      <div class="game-info__price">
        <span class="game-info__new-price">$49.99</span>
        <span class="game-info__discount">-20%</span>
        <span class="game-info__old-price">$59.99</span>
      </div>
      <div class="game-info__buttons">
        <button class="game-info__button-cart">Add to Cart</button>
        <button class="game-info__button-favourites">Add to Favorites</button>
      </div>
      <img src="../assets/images/minecraft_slide1.png" alt="Yellow Card" class="green-card-img" />
    </div>
    <div class="card red">
      <h2>Play Minecraft Dungeons right now!</h2>
      <div class="game-info__price">
        <span class="game-info__new-price">$49.99</span>
        <span class="game-info__discount">-20%</span>
        <span class="game-info__old-price">$59.99</span>
      </div>
      <div class="game-info__buttons">
        <button class="game-info__button-cart">Add to Cart</button>
        <button class="game-info__button-favourites">Add to Favorites</button>
      </div>
      <img src="../assets/images/minecraft_slide2.png" alt="Red Card" class="red-card-img" />
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/styles/global.scss';

.card-container {
  display: flex;
  width: 80vw;
  justify-content: space-around;
  margin-top: 100px;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 550px;
  height: 360px;
  padding: 50px;
  padding-right: 150px;
  border-radius: 15px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  color: $white-color;

  &:hover {
    transform: translateY(-5px);
  }
}

.green {
  background: linear-gradient(131.39deg, #1dbe53 -11.11%, #ace238 73.42%);
}

.red {
  background: linear-gradient(131.39deg, #ff3d23 -11.11%, #fda828 73.42%);
}

.green-card-img {
  position: relative;
  left: 290px;
  width: 100%;
  max-width: 262px;
  top: -300px;
}

.red-card-img {
  position: relative;
  width: 100%;
  max-width: 432px;
  left: 300px;
  top: -170px;
}

h2 {
  font-family: $manrope-font-family;
  font-size: 36px;
  font-weight: 800;
  line-height: 43px;
  letter-spacing: 0em;
  text-align: left;
}

.game-info__price {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
}

.game-info__new-price {
  width: 114px;
  height: 42px;
  font-family: $manrope-font-family;
  color: $white-color;
  font-size: 32px;
  font-weight: 800;
  line-height: 42px;
  letter-spacing: 0em;
  text-align: left;
}

.game-info__discount {
  width: 51px;
  height: 26px;
  font-family: $manrope-font-family;
  font-size: 20px;
  font-weight: 800;
  line-height: 26px;
  letter-spacing: 0em;
  text-align: left;
}

.game-info__old-price {
  width: 71px;
  height: 26px;
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  font-weight: 600;
  line-height: 26px;
  letter-spacing: 0em;
  text-align: left;
  color: rgba(255, 255, 255, 0.3);
  text-decoration: line-through;
}

.game-info__buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.game-info__button-cart,
.game-info__button-favourites {
  height: 73px;
  padding: 23px 40px 27px 40px;
  border-radius: 15px;
  font-family: $manrope-font-family;
  font-size: 18px;
  font-weight: 600;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: center;
  padding: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;

  &.game-info__button-cart {
    border: none;
    background: rgba(255, 255, 255, 1);
    color: rgba(0, 0, 0, 1);
  }

  &.game-info__button-favourites {
    background: rgba(255, 255, 255, 0.05);
    color: $white-color;
    border: none;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: rgba(0, 0, 0, 0.9);
    border-color: rgba(255, 255, 255, 0.1);
  }
}

@media (max-width: 780px) {
  .green-card-img {
    width: 128px;
    top: -200px;
    left: 180px;
  }

  .red-card-img {
    width: 158px;
    top: -100px;
    left: 160px;
  }

  .game-info__buttons {
    display: none;
  }
  .card-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: space-between;
    gap: 30px;
    margin: auto;
    margin-top: 100px;

    .card {
      width: 310px;
      height: 183px;
      border-radius: 10px;
      padding: 25px;
      padding-right: 38px;
      gap: 20px;

      h2 {
        font-size: 20px;
        font-weight: 800;
        line-height: 24px;
      }

      .game-info__price {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        font-size: 18px;
        font-weight: 800;
        line-height: 23px;
        width: 180px;

        .game-info__new-price,
        .game-info__discount,
        .game-info__old-price {
          font-size: 18px;
          font-weight: 800;
          line-height: 23px;
        }
        .game-info__discount {
          color: rgba(255, 232, 23, 1);
        }

        .game-info__new-price {
          width: 64px;
          height: auto;
        }
      }
    }
  }
}
</style>
