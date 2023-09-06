<template>
  <div class="reviews-container">
    <div class="reviews-heading">
      <h2>Reviews</h2>
      <button @click="showReviewForm = true" class="leave-review-button">
        <span>Leave a Review</span>
        <span class="arrow-icon">→</span>
      </button>
    </div>

    <div class="reviews-list">
      <div class="average-rating">
        <span class="average-rating-heading">Our Rating:</span>
        <div class="average-stars">{{ generateStars(calculateAverageRating()) }}</div>
        <span class="average-rating-length">Based on {{ reviews.length }} reviews</span>
      </div>
      <div v-for="(review, index) in reviews" :key="index" class="review-card">
        <div class="review-stars">{{ generateStars(review.rating) }}</div>
        <div class="review-details">
          <div class="review-name">{{ review.name }}</div>
          <div class="review-title">{{ review.title }}</div>
          <div class="review-comment">{{ review.comment }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Review } from '@/types/interfaces/reviews';

export default defineComponent({
  data() {
    return {
      showReviewForm: false,
      reviews: [
        { rating: 5, name: 'John Doe', title: 'Great Game!', comment: 'I loved this game!' },
        { rating: 5, name: 'Emily Brown', title: 'Highly Recommended', comment: "One of the best games I've played." },
        { rating: 4, name: 'Jane Smith', title: 'Enjoyable Experience', comment: 'Had a lot of fun playing.' },
        { rating: 4, name: 'Alex Johnson', title: 'Decent Game', comment: 'It was a great experience.' },
        {
          rating: 5,
          name: 'Michael Williams',
          title: 'Very nice',
          comment: 'Was very easy to purchase and start playing.',
        },
      ] as Review[],
    };
  },
  methods: {
    generateStars(rating: number) {
      const fullStars = '★'.repeat(rating);
      const emptyStars = '☆'.repeat(5 - rating);

      return fullStars + emptyStars;
    },
    calculateAverageRating(): number {
      const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRating / this.reviews.length;

      return Math.round(averageRating);
    },
  },
});
</script>

<style lang="scss">
@import '@/assets/styles/global.scss';

.reviews-container {
  width: 80vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: auto;
  margin-bottom: 50px;
  align-items: center;

  .reviews-heading {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;

    h2 {
      font-family: $manrope-font-family;
      color: $white-color;
      font-size: 32px;
      font-weight: 600;
      line-height: 42px;
      letter-spacing: 0em;
      text-align: left;
      margin-top: 15px;
      margin-bottom: 15px;
    }

    .leave-review-button {
      display: flex;
      align-items: center;
      background: transparent;
      border: 2px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 10px 15px;
      cursor: pointer;
      color: #007bff;
      cursor: pointer;

      &:hover {
        background-color: rgba(0, 123, 255, 0.1);
        border-color: #007bff;
        color: #0056b3;
      }

      span {
        color: #007bff;
      }

      .arrow-icon {
        margin-left: 8px;
        color: #007bff;
      }
    }
  }

  .average-rating {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    font-family: $roboto-font-family;
    font-size: 24px;
    font-weight: 500;
    line-height: 28px;
    letter-spacing: 0em;
    margin-top: 20px;

    .average-rating-length {
      font-family: $roboto-font-family;
      font-size: 15px;
      font-weight: 400;
      line-height: 18px;
      letter-spacing: 0em;
      text-align: center;
      color: $white-color;
      text-align: left;
    }

    .average-rating-heading {
      font-family: $roboto-font-family;
      font-size: 20px;
      font-weight: 600;
      margin-right: 10px;
      color: $white-color;
      white-space: nowrap;
      text-align: left;
    }

    .average-stars {
      font-size: 20px;
      color: $white-color;
      display: flex;
      align-items: center;
      background: rgba(119, 190, 29, 1);
      border: 2px solid #fff;
      border-radius: 4px;
      text-align: left;

      .filled-star {
        margin-right: 3px;
        color: #ffcc00;
      }
      .empty-star {
        margin-right: 3px;
        color: #ccc;
      }
    }
  }

  .reviews-list {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin: 0;
    margin-top: 20px;
  }

  .review-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    padding: 15px;
    border: none;
    border-radius: 5px;
    max-width: 300px;
    width: 100%;
    height: 150px;
    color: white;

    .review-stars {
      font-size: 15px;
      margin-bottom: 10px;
      width: 117px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(119, 190, 29, 1);
      border: 2px solid #fff;
      border-radius: 4px;
    }

    .review-details {
      font-family: $roboto-font-family;
      font-size: 15px;
      font-weight: 400;
      line-height: 18px;
      letter-spacing: 0em;
      text-align: center;

      .review-name {
        font-weight: bold;
        margin-bottom: 5px;
      }

      .review-title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 5px;
      }

      .review-comment {
        margin-top: 10px;
        text-align: center;
      }
    }
  }
}
@media (max-width: 768px) {
  .average-rating {
    margin-top: 10px;
  }

  .reviews-list {
    flex-direction: column;
    align-items: center;
  }

  .review-card {
    max-width: 90%;
    height: auto;
  }

  .reviews-container {
    .reviews-list {
      flex-direction: column;
      align-items: center;

      .average-rating {
        margin-bottom: 20px;
      }

      .review-card {
        max-width: 100%;
        margin: 10px 0;
        border: 1px solid white;
      }
    }
  }
}
</style>
