<template>
  <v-container class="fill-height mx-auto" style="">
    <v-fab-transition>
      <v-btn
        v-show="this.$route.name === 'order'"
        color="secondary"
        dark
        fixed
        bottom
        right
        fab
      >
        <v-icon>mdi-cart-outline</v-icon>
      </v-btn>
    </v-fab-transition>

    <Loader />

    <v-snackbar vertical app centered v-model="snackbar" light timeout="-1">
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
      {{ error }}
    </v-snackbar>
    <transition
      v-if="isOrder && !this.$vuetify.breakpoint.mobile && step !== 3"
      name="fade-delay"
    >
      <OrderCart />
    </transition>
    <OrderCartMobile
      v-if="isOrder && this.$vuetify.breakpoint.mobile && step !== 3"
    />
    <v-row align="center" justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-stepper vertical v-model="step" class="elevation-8 overflow-visible">
          <v-stepper-step
            :color="step > 1 ? 'success' : 'primary'"
            :complete="step > 1"
            step="1"
            >Choose your meal</v-stepper-step
          >

          <v-stepper-content class="pl-2 pr-11 overflow-visible" step="1">
            <v-container fluid>
              <v-row
                no-gutters
                class="mt-2 pb-0 mb-0"
                align="center"
                justify="center"
              >
                <v-col cols="auto">
                  <p
                    class="text-subtitle-1 font-weight-medium align-self-center pb-sm-3"
                  >
                    Order location:
                  </p>
                </v-col>
                <v-col cols="12" sm="6" lg="4">
                  <v-select
                    dense
                    v-model="location"
                    :value="location"
                    :menu-props="{ offsetY: true }"
                    outlined
                    :rules="[
                      (v) => !!v || 'Please choose the location for your order',
                    ]"
                    class="ml-2"
                    label="Location"
                    :items="locationNames"
                  >
                  </v-select>
                </v-col>
                <v-fab-transition>
                  <v-btn
                    v-show="this.$route.name === 'order'"
                    color="secondary"
                    dark
                    absolute
                    top
                    right
                    fab
                  >
                    <v-icon>mdi-cart-outline</v-icon>
                  </v-btn>
                </v-fab-transition>
              </v-row>

              <v-row justify="center" no-gutters align="center">
                <v-col cols="12">
                  <v-card flat min-width="200" class="mx-auto" max-width="900">
                    <v-card-text class="px-0 px-sm-4">
                      <Menu />
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        class="font-weight-bold mr-3"
                        :disabled="step === 1"
                        @click="step--"
                        text
                        >Back</v-btn
                      >
                      <v-btn
                        class="font-weight-bold mr-sm-5"
                        color="secondary"
                        depressed
                        @click="cartPrice > 0 ? step++ : (snackbar = true)"
                      >
                        Checkout
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-stepper-content>

          <v-stepper-step
            :color="step > 2 ? 'success' : 'primary'"
            :complete="step > 2"
            step="2"
          >
            Order information
          </v-stepper-step>
          <v-stepper-content step="2">
            <OrderForm v-bind:currentStep.sync="step" :location="location" />
          </v-stepper-content>

          <v-stepper-step
            :color="step > 3 ? 'success' : 'primary'"
            :complete="step > 3"
            step="3"
            >Order summary</v-stepper-step
          >
          <v-stepper-content step="3">
            <v-container>
              <v-skeleton-loader
                :loading="loading"
                width="75%"
                class="mx-auto"
                height="100%"
                type="card-heading, list-item-threeline, list-item-twoline, list-item-threeline, divider, card-heading, list-item, list-item-threeline, list-item, list-item, divider, card-heading, list-item, list-item-threeline, list-item-two-line, divider, card-heading, list-item-threeline, list-item, list-item-threeline, actions"
              >
                <h1 class="text-h6 font-weight-bold text-center">
                  Order Confirmation
                </h1>
                <v-img
                  :src="confirmSvg"
                  contain
                  max-height="150"
                  class="my-3"
                ></v-img>
                <h3 class="text-subtitle-1 text-center mb-3">
                  We have received your order. Thank you for choosing
                  <strong>Philadelphia's Steaks and Hoagies</strong>! A receipt
                  has been sent to the email that you provided.
                </h3>
                <OrderDetails />
              </v-skeleton-loader>
            </v-container>
          </v-stepper-content>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import confirmSvg from '@/assets/confirmation.svg'
import { cartPrice, cart } from '@/store/helpers'
import OrderForm from '@/components/OrderForm.vue'
import Menu from '@/components/Menu.vue'
import OrderCart from '@/components/OrderCart.vue'
import OrderCartMobile from '@/components/OrderCartMobile.vue'
import OrderDetails from '@/components/OrderDetails.vue'
import Loader from '@/components/Loader.vue'

export default {
  components: {
    Menu,
    OrderCartMobile,
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
      confirmSvg,
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
    createLineItems() {
      this.cart.forEach((product) => {
        let item = {}
        item.price = product.price
        item.quantity = product.quantity
        this.lineitems.push(item)
      })
    },
  },

  computed: {
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
}
</script>

<style></style>
