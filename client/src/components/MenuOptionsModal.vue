<template>
  <v-card>
    <v-card-title>
      <span class="font-weight-bold">Customize</span>
    </v-card-title>
    <v-card-text class="pb-0">
      <v-container>
        <v-row no-gutters justify="center">
          <v-col v-if="item.options.extraMeats" cols="12">
            <v-select
              label="Extra Meat"
              placeholder="Select additional meat"
              outlined
              :menu-props="{ offsetY: true }"
              v-model="extraMeatsSelected"
              :items="extraMeats"
              multiple
            >
              <template v-slot:selection="{ item, index }">
                <v-chip small style="margin:0 2px;">
                  {{ item }}
                </v-chip>

                <span
                  v-if="
                    extraMeatsSelected.length &&
                      index === extraMeatsSelected.length - 1
                  "
                  class="grey--text text--darken-1 ml-2"
                >
                  +{{ formatPrice(getMeatsPrice) }}
                </span>
              </template>
            </v-select>
          </v-col>
          <v-col v-if="typeof item.options.extras !== 'undefined'" cols="12">
            <v-select
              label="Extra toppings"
              placeholder="Select additional toppings"
              outlined
              :menu-props="{ offsetY: true }"
              v-model="extraToppingsSelected"
              :items="item.options.extras"
              multiple
            >
              <template v-slot:selection="{ item, index }">
                <v-chip small style="margin:0 2px;">
                  {{ item }}
                </v-chip>

                <span
                  v-if="
                    extraToppingsSelected.length &&
                      index === extraToppingsSelected.length - 1
                  "
                  class="grey--text text--darken-1 ml-2"
                >
                  +{{ formatPrice(getToppingsPrice) }}
                </span>
              </template>
            </v-select>
          </v-col>
          <v-col v-if="typeof item.options.peppers !== 'undefined'" cols="12">
            <v-select
              label="Peppers"
              placeholder="Select pepper type"
              outlined
              :menu-props="{ offsetY: true }"
              v-model="peppersSelected"
              :items="item.options.peppers"
            >
            </v-select>
          </v-col>
          <v-col v-if="typeof item.options.cheese !== 'undefined'" cols="12">
            <v-select
              outlined
              :menu-props="{ offsetY: true }"
              v-model="cheeseSelected"
              label="Extra Cheese"
              placeholder="Select type of cheese"
              :items="item.options.cheese"
            >
              <template v-slot:selection="{ item }">
                <v-chip small style="margin:0 2px;">
                  {{ item }}
                </v-chip>

                <span class="grey--text text--darken-1 ml-2">
                  +{{ formatPrice(1) }}
                </span>
              </template>
            </v-select>
          </v-col>
          <v-col cols="12">
            <v-select
              :menu-props="{ offsetY: true }"
              outlined
              label="Without"
              placeholder="Select ingredient(s)"
              v-model="withoutSelected"
              :items="item.options.without"
              multiple
            >
              <template v-slot:selection="{ item }">
                <v-chip small style="margin:0 2px;">
                  {{ item }}
                </v-chip>
              </template>
            </v-select>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn
        :small="this.$vuetify.breakpoint.mobile"
        class="ml-2"
        text
        @click="$emit('update:isOpen', false)"
        >Cancel</v-btn
      >
      <v-spacer></v-spacer>
      <div class="d-flex">
        <v-text-field
          outlined
          dense
          type="number"
          :min="1"
          :max="9"
          v-model="quantity"
          label="Qty"
          class="qty-input"
        >
        </v-text-field>
        <v-hover v-slot:default="{ hover }">
          <v-btn
            height="35"
            width="125"
            depressed
            color="secondary"
            class="font-weight-sm-bold mx-2"
            dark
            @click="addToCart"
          >
            <template v-slot:default>
              <div v-if="hover">
                <v-slide-x-transition hide-on-leave>
                  <span :key="1">
                    {{ formatPrice(getTotalPrice) }}
                  </span>
                </v-slide-x-transition>
              </div>
              <div v-else>
                <v-slide-x-reverse-transition hide-on-leave>
                  <span>
                    Add to cart
                  </span>
                </v-slide-x-reverse-transition>
              </div>
            </template>
          </v-btn>
        </v-hover>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
import { cart } from '../store/helpers'

export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
      default: false,
    },
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      quantity: 1,
      id: 0,
      extraMeatsSelected: [],
      extraMeats: [
        'Meatball',
        'Sausage',
        'Italian Special',
        'Roast Beef',
        'Ham',
        'Turkey',
        'Chicken',
        'Steak',
      ],
      extraToppingsSelected: [],
      peppersSelected: null,
      cheeseSelected: null,
      withoutSelected: [],
    }
  },
  computed: {
    getMeatsPrice() {
      return this.extraMeatsSelected.length * 2.5
    },
    getToppingsPrice() {
      let cheese = this.cheeseSelected ? 1 : 0
      return this.extraToppingsSelected.length + cheese
    },
    getAddonsPrice() {
      return this.getMeatsPrice + this.getToppingsPrice
    },
    getTotalPrice() {
      return (this.getAddonsPrice + this.item.price) * this.quantity
    },
    getAddons() {
      return this.getToppings.concat(this.getMeats)
    },
    getMeats() {
      if (this.extraMeatsSelected.length > 0) {
        let items = []
        this.extraMeatsSelected.forEach((val) => {
          let item = {}
          item.name = val
          item.price = 2.5
          items.push(item)
        })
        return items
      }
      return []
    },
    getToppings() {
      let items = []
      if (this.extraToppingsSelected.length > 0) {
        this.extraToppingsSelected.forEach((val) => {
          let item = {
            name: val,
            price: 1,
          }
          items.push(item)
        })
      }
      return items
    },
    ...cart,
  },
  methods: {
    itemToAdd() {
      let item = {
        id: this.cart.length,
        name: this.item.name,
        price: this.getTotalPrice,
        quantity: this.quantity,
        cheese: this.cheeseSelected,
        peppers: this.peppersSelected,
        addOns: this.getAddons,
        without: this.withoutSelected,
        canExpand:
          this.getAddons.length > 0 ||
          this.withoutSelected.length > 0 ||
          this.peppersSelected != null ||
          this.cheeseSelected != null ||
          false,
      }
      return item
    },
    formatPrice(amount) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount.toFixed(2))
    },
    addToCart() {
      this.$store.dispatch('addToCart', this.itemToAdd())
      this.$emit('update:isOpen', false)
      this.extraMeatsSelected = this.extraToppingsSelected = this.withoutSelected = []
      this.peppersSelected = null
      this.cheeseSelected = null
    },
  },
}
</script>

<style lang="scss">
@media screen and (min-width: 601px) {
  .qty-input .v-input__control,
  .qty-input .v-input__slot {
    height: 40px !important;
    max-height: 40px !important;
    min-height: 40px !important;
    max-width: 75px !important;
    min-width: 60px !important;
  }
}
.qty-input .v-input__control,
.qty-input .v-input__slot {
  height: 35px !important;
  max-height: 35px !important;
  min-height: 35px !important;
  max-width: 75px !important;
  min-width: 60px !important;
}
</style>
