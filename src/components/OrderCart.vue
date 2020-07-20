<template>
  <v-card color="grey lighten-3" flat tile class=" fixed-center">
    <v-card class="fixed-center__child" elevation="4">
      <v-toolbar
        color="grey darken-4"
        class="text-center font-weight-bold text-center"
        flat
        dark
        style="height:64px;font-size:1.2rem;line-height:1.5rem;"
      >
        My Cart
      </v-toolbar>

      <v-list color="white" light class="py-1 auto-height">
        <v-list-item>
          <v-list-item-title class="mx-6 font-weight-bold text-body-1">
            <v-row justify="space-between" align="center" dense>
              <v-col class="text-right" cols="auto">
                Item
              </v-col>
              <v-col class="text-left" cols="auto">
                Price
              </v-col>
            </v-row>
          </v-list-item-title>
        </v-list-item>

        <v-divider class="grey lighten-1"></v-divider>
        <div v-if="totalPrice === 0">
          <v-list-item>
            <v-row class="py-5" justify="center" align="center">
              <div class=" text-subtitle-1">
                Cart is empty
              </div>
            </v-row>
          </v-list-item>
          <v-divider class="grey lighten-1"></v-divider>
        </div>
        <v-slide-y-reverse-transition
          v-show="totalPrice > 0"
          class="py-0"
          origin="bottom center 0"
          group
        >
          <template
            v-for="(item, index) in this.$store.getters.cart"
            class="transition-fast-out-slow-in"
          >
            <v-list-item :key="`item-${index}`">
              <v-list-item-content class="py-2">
                <v-list-item-title class="mb-0 text-body-2">
                  <v-row
                    justify="space-around"
                    style="font-weight:600"
                    no-gutters
                  >
                    <v-col cols="10">
                      {{ item.name }}
                    </v-col>
                    <v-col cols="2" class="text-right" style="font-weight:600">
                      {{ formatPrice(item.price) }}
                      <v-btn x-small icon @click="removeFromCart(index)">
                        <v-icon color="red darken-1" small>mdi-delete</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-list-item-title>
                <v-subheader
                  v-if="item.addOns.length"
                  style="height:fit-content;font-weight:500"
                  class="pl-2 my-0 text-caption grey--text text--darken-4 font-italic"
                  >Add-ons</v-subheader
                >
                <v-list-item-subtitle
                  v-for="(addOn, index) in item.addOns"
                  :key="index + 200"
                >
                  <v-row justify="space-around" align="end" no-gutters>
                    <v-col cols="8">
                      {{ addOn.name }}
                    </v-col>
                    <v-col cols="2" class="text-right">
                      <v-icon x-small>mdi-plus</v-icon>
                      {{ formatPrice(addOn.price) }}
                    </v-col>
                  </v-row>
                </v-list-item-subtitle>
                <v-subheader
                  v-if="item.without.length"
                  style="height:fit-content;font-weight:500"
                  class="pl-2 my-0 text-caption grey--text text--darken-4 font-italic"
                  >Without</v-subheader
                >
                <v-list-item-subtitle v-for="item in item.without" :key="item">
                  <v-row justify="space-around" align="end" no-gutters>
                    <v-col cols="11">
                      {{ item }}
                    </v-col>
                  </v-row>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider
              :key="`enddivider-${index}`"
              class="grey lighten-1 my-1"
            ></v-divider>
          </template>
        </v-slide-y-reverse-transition>
      </v-list>
      <v-card-actions>
        <v-footer absolute color="white">
          <v-container>
            <v-row no-gutters justify="end" align="end" class="text-body-1">
              <v-col cols="3" class="text-right">
                Subtotal:
              </v-col>
              <v-col offset="1" cols="2">
                <v-fade-transition leave-absolute>
                  <span
                    class="transition-fast-out-slow-in"
                    :key="`total-${totalPrice}`"
                  >
                    {{ formatPrice(totalPrice) }}
                  </span>
                </v-fade-transition>
              </v-col>
            </v-row>
            <v-row no-gutters justify="end" align="end" class="text-body-1">
              <v-col cols="3" class="text-right">
                Tax:
              </v-col>
              <v-col offset="1" cols="2">
                {{ formatPrice(0) }}
              </v-col>
            </v-row>
            <v-row no-gutters justify="end" align="center" class="text-body-2">
              <v-col cols="4" class="mb-1 mr-6">
                <v-divider class="grey lighten-1 my-1"></v-divider>
              </v-col>
            </v-row>
            <v-row
              no-gutters
              justify="end"
              class="text-body-1 font-weight-bold"
            >
              <v-col cols="3" class="text-right">
                Total:
              </v-col>
              <v-col offset="1" cols="2" class="font-weight-bold">
                <v-fade-transition leave-absolute>
                  <span
                    class="transition-fast-out-slow-in"
                    :key="`total-${totalPrice}`"
                  >
                    {{ formatPrice(totalPrice) }}
                  </span>
                </v-fade-transition>
              </v-col>
            </v-row>
          </v-container>
        </v-footer>
      </v-card-actions>
    </v-card>
  </v-card>
</template>

<script>
export default {
  props: {
    price: {
      type: Number,
      required: true,
    },
  },
  methods: {
    formatPrice(amount) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount.toFixed(2))
    },
    removeFromCart(index) {
      this.$nextTick(() => {
        this.$store.dispatch('removeFromCart', index)
      })
    },
  },
  watch: {
    price: 'totalPrice',
  },
  computed: {
    totalPrice() {
      let total = 0
      this.$store.getters.cart.forEach((item) => {
        total += item.price
      })
      this.$emit('update:price', total)
      return total
    },
  },
}
</script>

<style lang="scss">
@media screen and (min-width: 961px) {
  .fixed-center {
    position: fixed;
    max-height: calc(100vh - 144px);
    height: 100%;
    top: 64px;
    width: 100%;
    max-width: calc(90vw * 0.333333);
    display: flex;
    justify-content: center;
    align-items: center;

    &__child {
      width: 100%;
      height: 100%;
      max-height: 75%;
      max-width: 550px;
      margin: auto;
    }
  }
}
</style>
