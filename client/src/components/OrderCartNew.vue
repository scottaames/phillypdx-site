<template>
  <v-card v-if="this.$route.name === 'order'" class="rounded-tr-0 rounded-br-0">
    <v-navigation-drawer
      v-if="this.$route.name === 'order'"
      :mini-variant.sync="mini"
      mini-variant-width="50"
      fixed
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

      <v-data-table
        v-if="!mini"
        :hide-default-header="cart.length <= 0"
        hide-default-footer
        :headers="headers"
        :expanded.sync="expanded"
        :single-expand="true"
        :items="cart"
        class="elevation-0 px-2"
      >
        <template v-slot:item.price="{ item }">
          <span class="font-weight-medium">{{
            '$' + item.price.toFixed(2)
          }}</span>
        </template>

        <template v-slot:item.expand="{ item }">
          <v-btn
            icon
            x-small
            @click="expanded = [item]"
            v-if="item.canExpand && !expanded.includes(item)"
          >
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
          <v-btn
            icon
            x-small
            @click="expanded = []"
            v-if="item.canExpand && expanded.includes(item)"
          >
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
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
      <v-footer v-if="!mini" absolute padless color="white">
        <v-container>
          <v-divider class="grey lighten-1"></v-divider>
          <v-row
            no-gutters
            justify="center"
            align="end"
            class="text-body-1 mt-2"
          >
            <v-col cols="3" class="text-right">
              Subtotal:
            </v-col>
            <v-col offset="1" cols="2">
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
          <v-row no-gutters justify="center" align="end" class="text-body-1">
            <v-col cols="3" class="text-right">
              Tip:
            </v-col>
            <v-col offset="1" cols="2">
              <v-fade-transition leave-absolute>
                <span
                  class="transition-fast-out-slow-in"
                  :key="`total-${cartPrice}`"
                >
                  {{ formatPrice(getTip) }}
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
          <v-row no-gutters justify="center" align="end" class="text-body-1">
            <v-col cols="3" class="text-right">
              Tax:
            </v-col>
            <v-col offset="1" cols="2">
              {{ formatPrice(0) }}
            </v-col>
          </v-row>
          <v-row no-gutters justify="center" align="center" class="text-body-2">
            <v-col cols="6">
              <v-divider class="grey lighten-1 my-1"></v-divider>
            </v-col>
          </v-row>
          <v-row
            no-gutters
            justify="center"
            class="text-body-1 font-weight-bold"
          >
            <v-col cols="3" class="text-right">
              Total:
            </v-col>
            <v-col offset="1" cols="2" class="font-weight-bold">
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
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import { cart, cartPrice } from '../store/helpers'

export default {
  data: () => ({
    drawer: true,
    mini: false,
    count: '0',
    expanded: [],
    headers: [
      {
        text: 'Item',
        align: '',
        sortable: false,
        value: 'name',
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
        text: '',
        value: 'expand',
        align: 'end',
      },
    ],
  }),
  methods: {
    formatPrice(amount) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)
    },
    removeFromCart(item) {
      this.$nextTick(() => {
        this.$store.dispatch('removeFromCart', item)
      })
    },
  },

  computed: {
    getNavHeight() {
      return window.innerHeight - 143 - 300
    },
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
    ...cart,
    ...cartPrice,
  },
}
</script>

<style lang="scss">
.cart {
  //top: calc(64px + 5vh) !important;
  top: calc(64px + 150px) !important;
  //margin: auto 0;
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
