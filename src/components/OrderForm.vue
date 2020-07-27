<template>
  <v-container>
    <v-form ref="form" v-model="valid">
      <v-skeleton-loader
        :loading="loading"
        width="75%"
        class="mx-auto"
        height="100%"
        type="card-heading, list-item-threeline, list-item-twoline, list-item-threeline, divider, card-heading, list-item, list-item-threeline, list-item, list-item, divider, card-heading, list-item, list-item-threeline, list-item-two-line, divider, card-heading, list-item-threeline, list-item, list-item-threeline, actions"
      >
        <v-card max-width="750" class="mx-auto">
          <v-card-subtitle
            class="ml-2 grey--text text--darken-2 font-weight-bold pb-0"
          >
            CONTACT
          </v-card-subtitle>
          <v-card-text class="px-sm-10 pb-1">
            <v-row>
              <v-col cols="12" sm="4">
                <v-text-field
                  dense
                  v-model="name"
                  :rules="rules.name"
                  placeholder="First and last"
                  outlined
                  style="font-size:0.9rem"
                  label="Full name"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="3">
                <v-text-field
                  dense
                  v-model="phone"
                  :rules="rules.phone"
                  placeholder="(xxx) xxx-xxxx"
                  v-mask="'(###) ###-####'"
                  outlined
                  style="font-size:0.9rem"
                  label="Phone Number"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="5">
                <v-text-field
                  dense
                  v-model="email"
                  :rules="rules.email"
                  placeholder="first_last@gmail.com"
                  outlined
                  style="font-size:0.9rem"
                  label="Email"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-subtitle
            class="ml-2 grey--text text--darken-2 font-weight-bold pb-0"
          >
            ORDER METHOD
          </v-card-subtitle>
          <v-card-text class="pb-1">
            <v-row
              no-gutters
              class="mx-auto"
              style="max-width:225px;"
              justify="space-between"
            >
              <v-col cols="auto">
                <v-checkbox
                  readonly
                  v-model="orderMethod"
                  :ripple="false"
                  :input-value="true"
                  label="Pick-up"
                ></v-checkbox>
              </v-col>
              <v-col cols="auto">
                <v-checkbox label="Delivery" disabled></v-checkbox>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-subtitle
            class="ml-2 grey--text text--darken-2 font-weight-bold pb-0"
          >
            CHOOSE A TIME
          </v-card-subtitle>
          <v-card-text class="px-sm-10 pb-1">
            <v-row>
              <v-col cols="12" sm="6">
                <v-select
                  outlined
                  dense
                  class="text-body-2"
                  v-model="day"
                  :items="['Today', 'Tomorrow']"
                  prepend-icon="mdi-calendar-range"
                  label="Choose a day"
                >
                </v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-dialog
                  ref="dialog"
                  v-model="timeModal"
                  :return-value.sync="time"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      outlined
                      dense
                      class="text-body-2"
                      v-model="time"
                      :value="time"
                      label="Pick a time"
                      prepend-icon="mdi-clock-outline"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="timeModal"
                    v-model="selectedTime"
                    :value="time"
                    ampm-in-title
                    :allowed-hours="this.allowedHours()"
                    :max="close"
                    :min="getMinTime"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="timeModal = false"
                      >Cancel</v-btn
                    >
                    <v-btn text color="primary" @click="$refs.dialog.save(time)"
                      >OK</v-btn
                    >
                  </v-time-picker>
                </v-dialog>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-subtitle
            class="ml-2 grey--text text--darken-2 font-weight-bold pb-0"
          >
            TIP
          </v-card-subtitle>
          <v-card-text class="px-sm-10 pb-1">
            <v-row>
              <v-col cols="12" sm="6">
                <v-select
                  outlined
                  dense
                  class="text-body-2"
                  v-model="presetTipSelected"
                  :items="presetTips"
                  v-on:change="getTip"
                  prepend-icon="mdi-cash-usd-outline"
                  placeholder="Choose a tip option"
                  label="Preset tip amount"
                >
                </v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  dense
                  v-model="tip"
                  outlined
                  prefix="$"
                  style="font-size:0.9rem"
                  label="Amount"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-subtitle
            class="ml-2 grey--text text--darken-2 font-weight-bold pb-2"
          >
            SPECIAL INSTRUCTIONS
          </v-card-subtitle>
          <v-card-text class="pb-1">
            <v-textarea
              rows="3"
              outlined
              v-model="instructions"
              placeholder="Anything else for your order?"
            >
            </v-textarea>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <stripe-elements
              ref="checkout"
              id="card-element"
              :pk="publishableKey"
              :amount="cartPrice * 100"
              currency="usd"
              mode="payment"
              @token="tokenCreated"
              @loading="paymentLoading = $event"
              :styleObject="style"
              locale="en"
            >
              <tempate v-slot:card-element>
                <v-input for="card-element"> </v-input>
              </tempate>
            </stripe-elements>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="font-weight-bold mr-3"
              @click="$emit('update:currentStep', currentStep - 1)"
              text
            >
              Back
            </v-btn>

            <v-btn
              class="font-weight-bold mr-5"
              color="secondary"
              @click="checkForm"
              depressed
            >
              Pay now
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-skeleton-loader>
    </v-form>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { format, add } from 'date-fns'
import { StripeElements } from 'vue-stripe-checkout'

export default {
  components: {
    StripeElements,
  },
  props: {
    location: {
      type: String,
      required: true,
    },
    currentStep: {
      type: Number,
      required: true,
    },
  },
  created() {
    this.hours =
      this.location.toLowerCase() === 'portland'
        ? this.$store.getters.portlandHours
        : this.$store.getters.westlinnHours

    this.hours.splice(0, 0, this.hours.pop())
    let day = new Date().getDay()
    let todayHrs = this.hours[day][1].split('–')
    this.openHour =
      this.location.toLowerCase() === 'sisters'
        ? 11
        : Number(todayHrs[0].substr(0, 2))
    this.open = String(this.openHour).concat(':00')
    this.closeHour =
      this.location.toLowerCase() === 'sisters'
        ? 19
        : Number(todayHrs[1].substr(0, 2))
    this.close = String(this.closeHour).concat(':00')
  },
  mounted: function() {
    this.$nextTick(() => {
      this.loading = false
    })
  },
  data() {
    return {
      style: {
        base: {
          color: '#32325d',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#fa755a',
          iconColor: '#fa755a',
        },
      },
      paymentLoading: false,
      publishableKey: process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY,
      token: null,
      charge: null,
      instructions: null,
      loading: true,
      hours: null,
      openHour: 0,
      closeHour: 0,
      orderMethod: 'Pick-up',
      open: '',
      close: '',
      valid: false,
      timeModal: false,
      tip: Number(0).toFixed(2),
      presetTips: ['10%', '15%', '20%', '25%', 'Custom amount'],
      presetTipSelected: '',
      name: null,
      phone: null,
      email: null,
      selectedTime: format(add(new Date(), { minutes: 20 }), "HH':'mm"),
      time: format(add(new Date(), { minutes: 20 }), 'p'),
      day: 'Today',
      rules: {
        name: [
          (v) =>
            !!v ||
            'Please enter the same name that appears on the payment card',
        ],
        phone: [
          (v) =>
            !!v ||
            'Please enter a phone number to reach you at in case an issue arises with this order',
          (v) =>
            (v || '').length === 14 ||
            'The phone number should be exactly 10 digits with area code',
          (v) =>
            /[0123456789]/.test(v) ||
            'The phone number provided must only contain numbers (0-9)',
        ],
        email: [
          (v) => !!v || 'A valid email address is required to continue',
          (v) =>
            /.+@.+\..+/.test(v) || 'The email address provided is not valid',
        ],
      },
    }
  },
  watch: {
    selectedTime: 'formatTimeInput',
    cartPrice: 'getTip',
  },
  methods: {
    formatTimeInput() {
      let hours = this.selectedTime.substr(0, 2)
      let numHours = Number(hours)
      let suffix = ' AM'
      if (numHours > 12) {
        numHours -= 12
        suffix = ' PM'
      }
      this.time = this.selectedTime
        .replace(hours, String(numHours))
        .concat(suffix)
    },
    tokenCreated(token) {
      this.token = token
      // for additional charge objects go to https://stripe.com/docs/api/charges/object
      this.charge = {
        source: token.id,
        amount: this.amount, // the amount you want to charge the customer in cents. $100 is 1000 (it is strongly recommended you use a product id and quantity and get calculate this on the backend to avoid people manipulating the cost)
        description:
          "Philadelphia's Steaks and Hoagies - " + this.location + ', OR', // optional description that will show up on stripe when looking at payments
      }
      this.sendTokenToServer(this.charge)
    },
    sendTokenToServer(charge) {
      console.log(charge)
    },
    allowedHours() {
      if (this.location.toLowerCase() === 'sisters') {
        return (v) => v >= 11 && v <= 19
      }
      return (v) => v >= this.openHour && v <= this.closeHour
    },
    getTip() {
      let tip =
        Number(this.presetTipSelected.split('%')[0]) === 'NaN'
          ? 0
          : Number(this.presetTipSelected.split('%')[0]) / 100
      this.tip = (this.cartPrice * tip).toFixed(2)
    },
    checkForm() {
      if (this.valid) {
        if (this.tip > 0) {
          this.$store.dispatch('addToCart', {
            name: 'tip',
            price: this.tip,
            quantity: 1,
            addOns: [],
            without: [],
          })
        }
        this.$store.dispatch('setOrderDetails', {
          name: this.name,
          phone: this.phone,
          email: this.email,
          orderMethod: this.orderMethod,
          day: this.day,
          time: this.time,
          instructions: this.instructions,
        })
        this.$refs.elementsRef.submit()
        //this.$emit('update:currentStep', this.currentStep + 1)
      } else {
        this.$refs.form.validate()
      }
    },
    resetForm() {
      this.$refs.form.reset()
    },
  },
  computed: {
    getMinTime() {
      let minTime = Math.max(
        Number(this.selectedTime.substr(0, 2)),
        this.openHour
      )
      return String(minTime).concat(':00')
    },
    lineItems() {
      let items = []
      this.cart.forEach((product) => {
        let item = {}
        item.price = product.price
        item.quantity = product.quantity
        items.push(item)
      })
      return items
    },
    ...mapGetters(['cartPrice', 'cart']),
  },
}
</script>

<style lang="scss">
label.v-label {
  font-weight: 500;
}
</style>
