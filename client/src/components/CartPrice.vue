<template>
  <v-footer
    class="d-flex justify-center align-center"
    absolute
    padless
    :height="this.$vuetify.breakpoint.mobile ? '110' : '165'"
    width="400"
    color="white"
  >
    <div class="price-container text-center">
      <div class="price-title ">
        Subtotal
      </div>
      <v-fade-transition leave-absolute>
        <div
          class="price-number transition-fast-out-slow-in "
          :key="`total-${cartPrice}`"
        >
          {{ formatPrice(cartPrice - this.getTip) }}
        </div>
      </v-fade-transition>

      <br />

      <div class="price-title">
        Tip
      </div>
      <v-fade-transition leave-absolute>
        <div
          class="price-number transition-fast-out-slow-in "
          :key="`total-${cartPrice}`"
        >
          {{ formatPrice(this.getTip) }}
        </div>
      </v-fade-transition>

      <br />

      <div class="price-title">
        Tax
      </div>
      <div class="price-number">
        {{ formatPrice(0) }}
      </div>

      <br />
      <br />

      <div class="price-title price-title--total">
        Total
      </div>

      <v-fade-transition leave-absolute>
        <div
          class="price-number price-number--total transition-fast-out-slow-in"
          :key="`total-${cartPrice}`"
        >
          {{ formatPrice(cartPrice) }}
        </div>
      </v-fade-transition>
    </div>
  </v-footer>
</template>

<script>
import { cart, cartPrice } from '../store/helpers'

export default {
  methods: {
    formatPrice(amount) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)
    },
  },

  watch: {
    //cart: 'getTipAmount',
  },
  computed: {
    getTip() {
      let tip = 0
      if (this.cart.length > 0) {
        this.cart.forEach((item) => {
          if (item.name == 'tip') {
            tip = Number(item.price)
          }
        })
      }

      return tip
    },
    ...cart,
    ...cartPrice,
  },
}
</script>

<style lang="scss">
.price-container {
  font-weight: 400;
  letter-spacing: 0.1666666667em !important;
  line-height: 1rem;
  text-transform: uppercase;
  font-family: 'Roboto', sans-serif !important;
  font-size: 0.78rem !important;
  position: relative;
  width: 55vw;
  height: 80px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.price-title {
  position: absolute;
  display: inline-block;
  width: 50%;
  right: 50%;
  text-align: start;
  &--total {
    font-size: 1rem !important;
    font-weight: 600;
  }
}
.price-number {
  position: absolute;
  display: inline-block;
  width: 50%;
  left: 50%;
  text-align: end;
  &--total {
    font-size: 1rem !important;
    font-weight: 600;
  }
}

@media screen and (min-width: 651px) {
  .price-container {
    font-size: 0.82rem !important;
    line-height: 1.333333rem;
    position: relative;
    width: 190px !important;
    height: 133px;
    padding-top: 16px;
    padding-bottom: 16px;
  }
  .price-title {
    position: absolute;
    display: inline-block;
    width: 50%;
    right: 50%;
    text-align: start;
  }
  .price-number {
    position: absolute;
    display: inline-block;
    width: 50%;
    left: 50%;
    text-align: end;
  }
}
</style>
