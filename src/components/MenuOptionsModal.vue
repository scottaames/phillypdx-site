<template>
  <v-card>
    <v-card-title>
      <span class="font-weight-bold">Customize</span>
    </v-card-title>
    <v-card-text class="     pb-0">
      <v-container>
        <v-row no-gutters>
          <v-col cols="12">
            <v-row no-gutters align="baseline" justify="space-between">
              <v-col cols="12" sm="4" md="2"
                ><p class=" text-body-2 grey--text text--darken-4">
                  Extra Meat
                </p></v-col
              >
              <v-col cols="12" sm="8" md="9">
                <v-select
                  dense
                  outlined
                  :menu-props="{ offsetY: true }"
                  v-model="extraMeatsSelected"
                  class="text-body-2"
                  :items="extraMeats"
                  multiple
                  style="font-size:0.9rem"
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
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-row no-gutters align="baseline" justify="space-between">
              <v-col cols="12" sm="4" md="2"
                ><p class=" text-body-2 grey--text text--darken-4">
                  Extra Toppings
                </p></v-col
              >
              <v-col cols="12" sm="8" md="9">
                <v-select
                  dense
                  outlined
                  :menu-props="{ offsetY: true }"
                  v-model="extraToppingsSelected"
                  class="text-body-2"
                  :items="extraToppings"
                  multiple
                  style="font-size:0.9rem"
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
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-row no-gutters align="baseline" justify="space-between">
              <v-col cols="12" sm="4" md="2"
                ><p class=" text-body-2 grey--text text--darken-4">
                  Without
                </p></v-col
              >
              <v-col cols="12" sm="8" md="9">
                <v-select
                  :menu-props="{ offsetY: true }"
                  dense
                  outlined
                  v-model="withoutSelected"
                  class="text-body-2"
                  :items="without"
                  multiple
                  style="font-size:0.9rem"
                >
                  <template v-slot:selection="{ item }">
                    <v-chip small style="margin:0 2px;">
                      {{ item }}
                    </v-chip>
                  </template>
                </v-select>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn class="ml-2" text @click="$emit('update:isOpen', false)"
        >Cancel</v-btn
      >
      <v-spacer></v-spacer>
      <v-row no-gutters align="center" justify="end">
        <v-col cols="3">
          <v-text-field
            outlined
            dense
            type="number"
            :min="1"
            :max="9"
            v-model="quantity"
            label="Quantity"
            class="text-body-2 qty-input"
            style="font-size:0.9rem"
          >
          </v-text-field>
        </v-col>
        <v-col cols="auto" class="mx-2">
          <v-btn
            depressed
            color="secondary"
            class="text-subtitle-2 font-weight-bold"
            dark
            @click="addToCart"
          >
            <v-icon>mdi-cart-plus</v-icon>
            <strong class="pl-1">{{ formatPrice(getTotalPrice) }}</strong>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
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
      extraToppings: [
        'Hot Peppers',
        'Sweet Peppers',
        'Bell Pepper',
        'Mushroom',
        'Extra Cheese',
      ],
      extraToppingsSelected: [],
      without: ['Bread/Roll', 'Cheese', 'Onion'],
      withoutSelected: [],
    }
  },
  computed: {
    getMeatsPrice() {
      return this.extraMeatsSelected.length * 2.5
    },
    getToppingsPrice() {
      return this.extraToppingsSelected.length
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
      this.extraToppingsSelected.forEach((val) => {
        let item = {}
        item.name = val
        item.price = 1.0
        items.push(item)
      })
      return items
    },
    itemToAdd() {
      return {
        name: this.item.name,
        price: this.getTotalPrice,
        quantity: this.quantity,
        addOns: this.getAddons,
        without: this.withoutSelected,
      }
    },
  },
  methods: {
    formatPrice(amount) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount.toFixed(2))
    },
    addToCart() {
      this.$store.dispatch('addToCart', this.itemToAdd)
      this.$emit('update:isOpen', false)
      this.extraMeatsSelected = this.extraToppingsSelected = this.withoutSelected = []
    },
  },
}
</script>

<style lang="scss">
.qty-input .v-input__control,
.qty-input .v-input__slot {
  height: 40px !important;
  max-height: 40px !important;
  min-height: 40px !important;
}
</style>
