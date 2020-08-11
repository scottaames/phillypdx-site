<template>
  <v-footer :absolute="!this.$vuetify.breakpoint.mobile" padless color="white">
    <v-container>
      <v-divider class="grey lighten-1"></v-divider>

      <v-row
        no-gutters
        justify="center"
        align="end"
        class="text-body-sm-1 mt-2"
      >
        <v-col cols="4" sm="3" class="text-end">
          Subtotal:
        </v-col>
        <v-col offset="1" cols="3">
          <v-fade-transition leave-absolute>
            <span
              class="transition-fast-out-slow-in"
              :key="`total-${cartPrice}`"
            >
              {{ formatPrice(cartPrice - this.getTip) }}
            </span>
          </v-fade-transition>
        </v-col>
      </v-row>

      <v-row no-gutters justify="center" align="end" class="text-body-sm-1">
        <v-col cols="4" sm="3" class="text-end">
          Tip:
        </v-col>
        <v-col offset="1" cols="3">
          <v-fade-transition leave-absolute>
            <span
              class="transition-fast-out-slow-in"
              :key="`total-${cartPrice}`"
            >
              {{ formatPrice(this.getTip) }}
            </span>
          </v-fade-transition>
        </v-col>
      </v-row>

      <v-row no-gutters justify="center" align="end" class="text-body-sm-1">
        <v-col cols="4" sm="3" class="text-end">
          Tax:
        </v-col>
        <v-col offset="1" cols="3">
          {{ formatPrice(0) }}
        </v-col>
      </v-row>
      <v-row no-gutters justify="center" align="center" class="text-body-2">
        <v-col cols="6" sm="5">
          <v-divider class="grey lighten-1 my-1"></v-divider>
        </v-col>
      </v-row>

      <v-row
        no-gutters
        justify="center"
        class="text-body-sm-1 font-weight-bold"
      >
        <v-col cols="4" sm="3" class="text-end">
          Total:
        </v-col>
        <v-col offset="1" cols="3" class="font-weight-bold">
          <v-fade-transition leave-absolute>
            <span
              class="transition-fast-out-slow-in"
              :key="`total-${cartPrice}`"
            >
              {{ formatPrice(cartPrice) }}
            </span>
          </v-fade-transition>
        </v-col>
      </v-row>
    </v-container>
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

<style lang="scss" scoped></style>
