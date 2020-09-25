<template>
  <v-container class="fill-height align-content-space-around">
    <Loader />

    <v-snackbar
      vertical
      app
      multi-line
      centered
      v-model="snackbar"
      light
      timeout="-1"
    >
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
      {{ error }}
    </v-snackbar>

    <OrderCart v-if="isOrder && step !== 3" />

    <v-card class="mx-auto" max-width="900">
      <v-card-title class="title">
        <v-avatar
          color="primary"
          class="subtitle-1 white--text mr-3"
          v-text="step"
          size="26"
        ></v-avatar>
        <span>{{ currentTitle }}</span>
      </v-card-title>

      <v-window v-model="step">
        <v-window-item :value="1">
          <v-card-text class="d-flex justify-space-between pb-0">
            <v-select
              dense
              v-model="location"
              :value="location"
              :menu-props="{ offsetY: true }"
              outlined
              style="max-width: 250px;"
              :rules="[
                (v) => !!v || 'Please choose the location for your order',
              ]"
              class="mx-auto pb-0"
              label="Order location"
              :items="locationNames"
            >
            </v-select>
          </v-card-text>

          <v-card-text class="px-lg-10 px-5">
            <Menu />
          </v-card-text>

          <v-divider class="mt-4"></v-divider>
        </v-window-item>

        <v-window-item :value="2">
          <OrderForm
            ref="orderForm"
            v-bind:currentStep.sync="step"
            :location="location"
          />
        </v-window-item>

        <v-window-item :value="3">
          <v-container>
            <OrderDetails />
          </v-container>
        </v-window-item>
        <v-card-actions v-if="step !== 3">
          <v-btn
            class="font-weight-bold ml-3"
            :disabled="step === 1"
            @click="handleBackClick"
            text
            >Back</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn
            class="font-weight-bold mr-sm-5"
            color="primary"
            dark
            depressed
            @click="handleNextClick"
          >
            {{ step === 1 ? 'Next' : 'Pay Now' }}
          </v-btn>
        </v-card-actions>
      </v-window>
    </v-card>
  </v-container>
</template>

<script>
import { cartPrice, cart } from '@/store/helpers'
import OrderForm from '@/components/OrderForm.vue'
import Menu from '@/components/Menu.vue'
import OrderCart from '@/components/OrderCart.vue'
import OrderDetails from '@/components/OrderDetails.vue'
import Loader from '@/components/Loader.vue'

export default {
  components: {
    Menu,
    OrderCart,
    OrderForm,
    OrderDetails,
    Loader,
  },
  props: {
    location: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      attemptPay: false,
      formMounted: false,
      lineItems: [],
      snackbar: false,
      loading: false,
      step: 1,
      steps: 5,
      panel: 0,
      error: 'Please add at least one item to your cart to continue.',
    }
  },
  watch: {},
  methods: {
    handleNextClick() {
      switch (this.step) {
        case 1:
          if (this.cartPrice > 0) {
            this.step++
          } else {
            this.snackbar = true
          }
          break

        case 2:
          this.formMounted = true
          this.$refs.orderForm.checkForm()
          break

        default:
          return
      }
    },
    handleBackClick() {
      if (this.step === 2) {
        this.$store.dispatch()
        this.$refs.orderForm.resetTipFields()
        this.step--
      }
    },
  },

  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return 'Choose your meal'
        case 2:
          return 'Order information'
        default:
          return 'Order Confirmation'
      }
    },
    locationNames() {
      let names = []
      this.$store.state.locations.forEach((location) => {
        names.push(location.name)
      })
      return names
    },
    isOrder() {
      return this.$route.name === 'order'
    },
    ...cartPrice,
    ...cart,
  },
  //eslint-disable-next-line
  beforeRouteLeave(to, from, next) {
    if (this.formMounted) {
      this.$refs.orderForm.resetForm()
      this.step = 1
    }
    next()
  },
}
</script>

<style></style>
