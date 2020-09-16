<template>
  <div>
    <v-fab-transition mode="out-in">
      <v-btn
        v-if="delayedShow"
        color="orangish"
        class="cart-button"
        fixed
        dark
        top
        right
        style="z-index:999;"
        :large="!this.$vuetify.breakpoint.mobile"
        fab
        @click="drawer = !drawer"
      >
        <v-badge :content="getCartLength" :color="getBadgeColor" right>
          <v-icon color="white"> mdi-cart-outline</v-icon>
        </v-badge>
      </v-btn>
    </v-fab-transition>

    <v-navigation-drawer
      absolute
      temporary
      v-model="drawer"
      color="blue-grey lighten-5"
      bottom
      right
      mobile-breakpoint="650"
      max-width="400"
      width="400"
      min-height="600"
      style="z-index:1000;"
      hide-overlay
      light
    >
      <v-list-item two-line class="white">
        <v-list-item-title class="text-h5 text-center font-weight-medium">
          <v-icon @click="drawer = false" class="float-left" left
            >{{
              this.$vuetify.breakpoint.mobile
                ? 'mdi-chevron-down'
                : 'mdi-chevron-right'
            }}
          </v-icon>

          <span class="mr-6">Order Cart</span>
        </v-list-item-title>
      </v-list-item>

      <CartItems v-if="drawer" />

      <CartPrice v-if="drawer" />
    </v-navigation-drawer>
  </div>
</template>

<script>
import CartItems from '@/components/CartItems.vue'
import CartPrice from '@/components/CartPrice.vue'
import { cart, cartPrice } from '../store/helpers'

export default {
  components: {
    CartItems,
    CartPrice,
  },
  data: () => ({
    badgeColor: 'red',
    drawer: false,
    delayedShow: false,
  }),
  watch: {
    cart: 'animateCartBtn',
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.delayedShow = true
      }, 750)
    })
  },
  methods: {
    animateCartBtn() {
      let cartIcon = document.querySelector('.cart-button')
      cartIcon.classList.add('cart-anim')
      //cartIcon.style.color = 'yellow'
      setTimeout(() => {
        cartIcon.classList.remove('cart-anim')
        //cartIcon.style.color = 'white'
      }, 1000)
    },
    moveFabLeft() {
      if (this.drawer) {
        return 400
      }
      return 0
    },
  },

  computed: {
    getBadgeColor() {
      return this.getCartLength > 0 ? 'tertiary' : 'red'
    },
    getCartLength() {
      if (this.cart.length <= 0) {
        return String(0)
      }
      if (this.cart.filter((item) => item.name === 'tip').length > 0) {
        return this.cart.length - 1
      }
      return this.cart.length
    },
    ...cart,
    ...cartPrice,
  },
}
</script>

<style lang="scss">
@import '../sass/animations.scss';

.cart-header {
  font-size: 1.5rem !important;
  font-weight: 500;

  line-height: 1.2rem;
  text-transform: uppercase;
  font-family: 'Roboto', sans-serif !important;
}

@media screen and (min-width: 601px) {
  .cart {
    //top: calc(64px + 5vh) !important;
    top: calc(64px + 150px) !important;
    //margin: auto 0;
  }
}
.v-data-table tbody tr.v-data-table__expanded__content {
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.35),
    -1 -1px -2px rgba(0, 0, 0, 0.13) inset !important;
}
</style>
