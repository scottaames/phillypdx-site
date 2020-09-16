<template>
  <v-card v-if="item.name !== 'tip'" class="white mx-3 mb-3">
    <v-card-title class="text-subtitle-1 pb-1 justify-space-between ">
      <span>{{ item.name }}</span>
      <v-btn small icon @click="removeFromCart">
        <v-icon color="red" small right>mdi-close-circle</v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text class="py-0" v-if="item.canExpand && expanded">
      <div v-for="(addOn, index) in item.addOns" :key="`${item.name}-${index}`">
        <span class="green--text pr-1 text--darken-1 font-weight-bold">+</span>
        {{ addOn.name }}
      </div>
      <div v-for="(without, index) in item.without" :key="`without-${index}`">
        <span
          style="padding-right:6px;"
          class="red--text text--darken-1 font-weight-black"
          >&ndash;</span
        >
        {{ without }}
      </div>
      <div v-if="item.cheese">
        Cheese:
        {{ item.cheese }}
      </div>
      <div v-if="item.peppers">
        Peppers:
        {{ item.peppers }}
      </div>
    </v-card-text>

    <v-card-actions class="justify-space-between">
      <span class="ml-2 text-body-2">Quantity: {{ item.quantity }}</span>
      <v-btn
        v-if="item.canExpand"
        @click="expanded = !expanded"
        small
        text
        color="indigo accent-2"
      >
        {{ expanded ? 'Hide' : 'Show' }} Details</v-btn
      >
      <span class="mr-2">{{ '$' + item.price.toFixed(2) }}</span>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    expanded: false,
  }),
  methods: {
    removeFromCart() {
      this.$nextTick(() => {
        this.$store.dispatch('removeFromCart', this.item)
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
