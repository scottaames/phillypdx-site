<template>
  <v-container style="max-width:90%" class="fill-height" fluid>
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
                        @click="totalPrice > 0 ? step++ : (snackbar = true)"
                      >
                        Checkout
                      </v-btn>
                      <v-snackbar
                        centered
                        vertical
                        v-model="snackbar"
                        multi-line
                        timeout="-1"
                      >
                        Please add something to your cart to continue
                        <template v-slot:action="{ attrs }">
                          <v-btn
                            color="red"
                            text
                            v-bind="attrs"
                            @click="snackbar = false"
                          >
                            Close
                          </v-btn>
                        </template>
                      </v-snackbar>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-stepper-content>

          <v-stepper-step
            :color="step > 2 ? 'secondary' : 'primary'"
            :complete="step > 2"
            step="2"
          >
            Order information
          </v-stepper-step>
          <v-stepper-content step="2">
            <PurchaseForm
              v-bind:price.sync="totalPrice"
              v-bind:currentStep.sync="step"
              :location="location"
            />
          </v-stepper-content>

          <v-stepper-step :complete="step > 3" step="3"
            >Verify order</v-stepper-step
          >
          <v-stepper-content step="3"></v-stepper-content>

          <v-stepper-step :complete="step > 4" step="4">
            Order summary
          </v-stepper-step>
          <v-stepper-content step="4"></v-stepper-content>
        </v-stepper>
      </v-col>
      <v-col cols="12" md="4" order="1" order-md="2">
        <OrderCart v-bind:price.sync="totalPrice" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PurchaseForm from '@/components/PurchaseForm.vue'
import Menu from '@/components/Menu.vue'
import OrderCart from '@/components/OrderCart.vue'
export default {
  components: {
    Menu,
    OrderCart,
    PurchaseForm,
  },
  props: {
    location: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      snackbar: false,
      step: 2,
      steps: 5,
      panel: 0,
      totalPrice: 0,
      stripePubKey:
        'pk_test_51H5aZsCi1r1wf8UMSJCQLQhHPaNtc9jt3VEsMMHj9DufRFL9e2fI805KErKibXs52ePuCvkyxF5s12zEwnGnPGhe00LkHpfuFb',
    }
  },
  methods: {},
  computed: {
    locationNames() {
      let names = []
      this.$store.state.locations.forEach((location) => {
        names.push(location.name)
      })
      return names
    },
  },
}
</script>

<style lang="scss"></style>
