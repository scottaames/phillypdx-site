<template>
  <v-container style="max-width:90%" class="fill-height" fluid>
    <v-snackbar centered v-model="snackbar" multi-line timeout="-1">
      <template v-slot:action="{ attrs }">
        <v-btn color="red" icon text v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
      {{ error }}
    </v-snackbar>
    <v-row align="center" justify="space-between">
      <v-col cols="12" md="8" order="2" order-md="1">
        <v-stepper vertical v-model="step">
          <v-stepper-step
            :color="step > 1 ? 'success' : 'primary'"
            :complete="step > 1"
            step="1"
            >Choose your meal</v-stepper-step
          >
          <v-stepper-content step="1">
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
                      (v) =>
                        !!v ||
                        'Please choose the location to prepare your order',
                    ]"
                    class="ml-2"
                    label="Location"
                    :items="locationNames"
                  >
                  </v-select>
                </v-col>
              </v-row>

              <v-row justify="center" align="center">
                <v-col cols="12">
                  <v-card flat>
                    <v-card-text>
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
                        class="font-weight-bold mr-5"
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
            >Payment</v-stepper-step
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
                <v-card class="mx-auto">
                  <OrderDetails />
                </v-card>
              </v-skeleton-loader>
            </v-container>
          </v-stepper-content>

          <v-stepper-step :complete="step > 4" step="4">
            Order summary
          </v-stepper-step>
          <v-stepper-content step="4"></v-stepper-content>
        </v-stepper>
      </v-col>
      <v-col cols="12" md="4" order="1" order-md="2">
        <OrderCart />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import OrderForm from '@/components/OrderForm.vue'
import Menu from '@/components/Menu.vue'
import OrderCart from '@/components/OrderCart.vue'
import OrderDetails from '@/components/OrderDetails.vue'
export default {
  components: {
    Menu,
    OrderCart,
    OrderForm,
    OrderDetails,
  },
  props: {
    location: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      lineItems: [],
      snackbar: false,
      loading: false,
      step: 2,
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
    ...mapGetters(['cartPrice', 'cart']),
  },
}
</script>

<style lang="scss"></style>
