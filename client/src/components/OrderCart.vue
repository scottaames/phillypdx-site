<template>
  <v-card class="rounded-tr-0 rounded-br-0">
    <v-navigation-drawer
      fixed
      :mini-variant.sync="mini"
      right
      permanent
      clipped
      color="white"
      light
      class="cart elevation-8"
      :height="getNavHeight"
      max-width="500"
      width="400"
    >
      <v-list-item class="px-2" style="background:#28602F">
        <v-list-item-avatar>
          <v-icon color="white">mdi-cart</v-icon>
        </v-list-item-avatar>
        <v-list-item-title
          class="text-h6 text-center font-weight-regular white--text"
        >
          My Cart
        </v-list-item-title>
        <v-list-item-action>
          <v-btn small icon class="pr-2" @click.stop="mini = !mini">
            <v-icon size="28" color="white">mdi-chevron-right</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <CartTable v-if="!mini" />

      <CartPrice v-if="!mini" />
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import CartTable from '@/components/CartTable.vue'
import CartPrice from '@/components/CartPrice.vue'

export default {
  components: {
    CartTable,
    CartPrice,
  },
  data: () => ({
    drawer: true,
    mini: false,
  }),

  computed: {
    getNavHeight() {
      return window.innerHeight - 143 - 300
    },
  },
}
</script>

<style lang="scss">
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

.neomorphed {
  border-radius: 50px !important;
  background: #eeeeee !important;
  box-shadow: 37px 37px 75px #cacaca, -37px -37px 75px #ffffff !important;
}
</style>
