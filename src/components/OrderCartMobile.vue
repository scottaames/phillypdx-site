<template>
  <v-card width="100%">
    <v-card-title
      class="secondary white--text text-h6 font-weight-regular py-3"
    >
      <v-icon class="mr-3 " color="white">mdi-cart</v-icon>
      Cart

      <v-spacer></v-spacer>

      <v-btn icon dark @click="show = !show">
        <v-icon
          color="white"
          v-text="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        ></v-icon>
      </v-btn>
    </v-card-title>
    <v-expand-transition>
      <div v-show="show">
        <v-card-text class="pa-0">
          <CartTable />
          <CartPrice />
        </v-card-text>
      </div>
    </v-expand-transition>
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
    show: false,
  }),
}
</script>

<style lang="scss" scoped></style>
