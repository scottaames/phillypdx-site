<template>
  <v-data-table
    :hide-default-header="cart.length <= 0"
    hide-default-footer
    :headers="headers"
    :expanded.sync="expanded"
    :single-expand="true"
    :items="cart"
    class="elevation-0 px-2"
    mobile-breakpoint="0"
  >
    <template v-slot:item.price="{ item }">
      <span class="font-weight-medium">{{ '$' + item.price.toFixed(2) }}</span>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon small color="red" class="mr-2" @click="removeFromCart(item)">
        mdi-delete
      </v-icon>
      <v-icon
        @click="expanded = [item]"
        v-if="item.canExpand && !expanded.includes(item)"
      >
        mdi-chevron-down
      </v-icon>
      <v-icon
        icon
        @click="expanded = []"
        v-if="item.canExpand && expanded.includes(item)"
      >
        mdi-chevron-up
      </v-icon>
    </template>

    <template v-slot:expanded-item="{ headers, item }">
      <td class="py-1" :colspan="headers.length">
        <v-row
          no-gutters
          v-for="(addOn, index) in item.addOns"
          :key="`${item.name}-${index}`"
          justify="start"
          class="text-caption ml-1"
        >
          <v-col cols="8">
            <span class="green--text pr-1 text--darken-1 font-weight-bold"
              >+</span
            >
            {{ addOn.name }}
          </v-col>

          <v-col class="ml-lg-2">
            {{ '$' + addOn.price.toFixed(2) }}
          </v-col>
        </v-row>

        <v-row
          v-if="item.cheese"
          no-gutters
          justify="start"
          class="text-caption ml-1"
        >
          <v-col cols="8">
            <span class="green--text pr-1 text--darken-1 font-weight-bold"
              >+</span
            >
            {{ item.cheese }}
          </v-col>

          <v-col class="ml-lg-2">
            {{ '$' + Number(1).toFixed(2) }}
          </v-col>
        </v-row>

        <v-row
          no-gutters
          v-for="(without, index) in item.without"
          :key="`without-${index}`"
          justify="start"
          class="text-caption ml-1"
        >
          <span
            style="padding-right:6px;"
            class="red--text text--darken-1 font-weight-black"
            >&ndash;</span
          >
          {{ without }}
        </v-row>
        <v-row
          v-if="item.peppers"
          no-gutters
          justify="start"
          class="text-caption mt-1 ml-1"
        >
          Included Peppers:
          <span class="pl-1 font-weight-medium">{{ item.peppers }}</span>
        </v-row>
      </td>
    </template>

    <template v-slot:no-data>
      <p class="pt-5 text-body-1 grey--text text--darken-2">
        Your cart is empty
      </p>
    </template>
  </v-data-table>
</template>

<script>
import { cart } from '../store/helpers'

export default {
  props: {},
  data: () => ({
    expanded: [],
    headers: [
      {
        text: 'Item',
        align: '',
        sortable: false,
        value: 'name',
        filter: (value) => value !== 'tip',
        class: 'text-subtitle-2 grey--text text--darken-4',
      },
      {
        text: 'Qty',
        align: 'center',
        sortable: false,
        value: 'quantity',
        class: 'text-subtitle-2 grey--text text--darken-4',
      },
      {
        text: 'Price',
        align: 'center',
        sortable: false,
        value: 'price',
        class: 'text-subtitle-2 grey--text text--darken-4',
      },
      {
        text: 'Actions',
        sortable: false,
        value: 'actions',
        align: 'end',
        class: 'text-subtitle-2 grey--text text--darken-4',
      },
    ],
  }),
  methods: {
    removeFromCart(item) {
      this.$nextTick(() => {
        this.$store.dispatch('removeFromCart', item)
      })
    },
  },
  computed: {
    getTip() {
      let tip = 0
      if (cart.length > 0) {
        cart.forEach((item) => {
          if (item.name === 'tip') {
            tip = item.price
          }
        })
      }
      return tip
    },
    getHeight() {
      return this.$vuetify.breakpoint.mobile ? 400 : ''
    },
    ...cart,
  },
}
</script>

<style lang="scss" scoped></style>
