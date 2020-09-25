<template>
  <v-container>
    <CartItemCard v-for="item in cart" :key="item.id" :item="item" />

    <div
      class="text-center"
      :style="
        `position: absolute; top:calc( 50% - ${headerHeight} ); left: 0; width:100%;`
      "
    >
      <em v-if="cart.length <= 0">Your cart is empty</em>
    </div>
  </v-container>
</template>

<script>
import CartItemCard from '@/components/CartItemCard.vue'
import { cart } from '../store/helpers'

export default {
  components: {
    CartItemCard,
  },
  computed: {
    headerHeight() {
      return this.$vuetify.breakpoint.mobile ? `34px` : `64px`
    },
    ...cart,
  },
}
</script>

<style lang="scss" scoped></style>
