<template>
  <v-container class="px-md-10">
    <ErrorModal :error="error" v-bind:open.sync="errorModalOpen" />
    <v-card max-width="850" width="100%" class="mx-auto" outlined>
      <v-form ref="form" lazy-validation v-model="valid">
        <v-card-subtitle
          class="ml-2 grey--text text--darken-2 font-weight-bold pb-sm-0"
        >
          CONTACT
        </v-card-subtitle>
        <v-card-text class="px-sm-8 pb-1">
          <v-row>
            <v-col cols="12" sm="4">
              <v-text-field
                v-model="name"
                :rules="rules.name"
                placeholder="First and last"
                outlined
                label="Full name"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="3">
              <v-text-field
                v-model="phone"
                :rules="rules.phone"
                placeholder="(xxx) xxx-xxxx"
                v-mask="'(###) ###-####'"
                outlined
                label="Phone"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="5">
              <v-text-field
                v-model="email"
                :rules="rules.email"
                placeholder="first_last@gmail.com"
                outlined
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
        <v-card-text class="pb-0">
          <v-row
            dense
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
          class="ml-2 grey--text text--darken-2 font-weight-bold pb-sm-0"
        >
          ORDER TIME
        </v-card-subtitle>
        <v-card-text class="px-sm-8 pb-1">
          <v-row>
            <v-col cols="12" sm="6">
              <v-select
                outlined
                v-model="day"
                :items="['Today', 'Tomorrow']"
                label="Choose a day"
              >
                <template v-slot:prepend-inner>
                  <v-icon class="mr-1">mdi-calendar-range</v-icon>
                </template>
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
                    v-model="time"
                    :value="time"
                    label="Pick a time"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  >
                    <template v-slot:prepend-inner>
                      <v-icon class="mr-1">mdi-clock-outline</v-icon>
                    </template>
                  </v-text-field>
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
          class="ml-2 grey--text text--darken-2 font-weight-bold pb-sm-0"
        >
          TIP
        </v-card-subtitle>
        <v-card-text class="px-sm-8 pb-1">
          <v-row>
            <v-col cols="12" sm="6">
              <v-select
                outlined
                ref="tipSelection"
                v-model="presetTipSelected"
                :items="presetTips"
                v-on:input="getPresetTip"
                placeholder="Choose a tip option"
                label="Preset tip amount"
              >
                <template v-slot:prepend-inner>
                  <v-icon class="mr-1">mdi-cash-usd-outline</v-icon>
                </template>
              </v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-on:blur="getInputTip"
                v-model="tip"
                v-on:focus="
                  ;(tip = null), (presetTipSelected = 'Custom amount')
                "
                outlined
                prefix="$"
                placeholder
                label="Amount"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-subtitle
          class="ml-2 grey--text text--darken-2 font-weight-bold "
        >
          SPECIAL INSTRUCTIONS
        </v-card-subtitle>
        <v-card-text class="px-sm-8 pb-1">
          <v-textarea
            rows="3"
            outlined
            v-model="instructions"
            placeholder="Anything else for your order?"
          >
          </v-textarea>
        </v-card-text>
      </v-form>
      <v-divider></v-divider>

      <v-card-subtitle
        class="ml-2 grey--text text--darken-2 font-weight-bold pb-sm-2"
      >
        PAYMENT
      </v-card-subtitle>
      <v-card-text class="px-sm-8 pt-1">
        <CardInstructions />
      </v-card-text>
      <v-card-text class="px-sm-8 pt-1">
        <v-stripe-card
          outlined
          ref="stripeCard"
          label="Payment card"
          v-model="cardSource"
          :api-key="stripeKey"
          create="token"
          prepend-inner-icon="mdi-credit-card-outline"
          :customStyle="{ base: { iconColor: 'rgba(0, 0, 0, 0.54)' } }"
          hideIcon
          placeholder="####"
          :loading="false"
        ></v-stripe-card>
        <a target="_blank" href="https://stripe.com/">
          <v-img contain class="pb-0 mt-0" height="26" :src="stripeLogoSolid" />
        </a>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { cart, cartPrice } from '../store/helpers'
import { format, add } from 'date-fns'
import CardInstructions from '@/components/CardInstructions.vue'
import ErrorModal from '@/components/ErrorModal.vue'
import PaymentService from '../services/PaymentService'
import stripeLogoSolid from '../assets/powered_by_stripe.svg'
import stripeLogoOutlined from '../assets/powered_by_stripe_outlined.svg'

export default {
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
  components: {
    CardInstructions,
    ErrorModal,
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
  mounted() {
    this.isMounted = true
  },
  data: () => ({
    errorModalOpen: false,
    isMounted: false,
    stripeLogoSolid: stripeLogoSolid,
    stripeLogoOutlined: stripeLogoOutlined,
    stripeKey: process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY,
    cardSource: null,
    clientSecret: null,
    paymentIntent: null,
    error: '',
    instructions: null,
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
          !!v || 'Please enter the same name that appears on the payment card',
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
        (v) => /.+@.+\..+/.test(v) || 'The email address provided is not valid',
      ],
    },
  }),
  watch: {
    selectedTime: 'formatTimeInput',
  },
  methods: {
    async processCard() {
      this.$store.dispatch('setLoading', {
        load: true,
        message: 'Processing payment',
      })
      await PaymentService.createPaymentIntent(this.cart).then((result) => {
        if (result.data.error) {
          this.error = result.data.error
          this.$store.dispatch('setLoading', { load: false, message: '' })
          this.errorModalOpen = true
          console.log(result.data.error)
        } else {
          this.confirmCardPayment(result.data.clientSecret)
        }
      })
    },
    async confirmCardPayment(clientSecret) {
      const {
        paymentIntent,
        error,
      } = await this.$refs.stripeCard.stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: this.$refs.stripeCard.card,
        },
        save_payment_method: false,
        receipt_email: this.email,
      })
      if (error) {
        this.error = error.message
        this.$store.dispatch('setLoading', {
          load: false,
          message: '',
        })
        this.errorModalOpen = true
        console.log(error.message)
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        console.log(paymentIntent)
        this.paymentIntent = paymentIntent
        await this.$store.dispatch('setLoading', { load: false, message: '' })
        this.$emit('update:currentStep', this.currentStep + 1)
      }
    },
    includeStripe() {
      var documentTag = document,
        tag = 'script',
        object = documentTag.createElement(tag),
        scriptTag = documentTag.getElementsByTagName(tag)[0]
      object.src = scriptTag.parentNode.insertBefore(object, scriptTag)
    },

    checkForm() {
      if (this.valid) {
        this.$store.dispatch('setOrderDetails', {
          name: this.name,
          phone: this.phone,
          email: this.email,
          orderMethod: this.orderMethod,
          location: this.location,
          day: this.day,
          time: this.time,
          instructions: this.instructions,
        })
        this.processCard()
        //this.$emit('update:currentStep', this.currentStep + 1)
      } else {
        this.$refs.form.validate()
      }
    },
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
    resetTipFields() {
      this.$refs.tipSelection.value = ''
      this.presetTipSelected = ''
      this.tip = 0
    },
    allowedHours() {
      if (this.location.toLowerCase() === 'sisters') {
        return (v) => v >= 11 && v <= 19
      }
      return (v) => v >= this.openHour && v <= this.closeHour
    },
    getPresetTip() {
      if (this.presetTipSelected === 'Custom amount') {
        this.tip.toFixed(2)
      } else {
        let tip =
          Number(this.presetTipSelected.split('%')[0]) === 'NaN'
            ? 0
            : Number(this.presetTipSelected.split('%')[0]) / 100
        this.tip = (this.cartPrice * tip).toFixed(2)
      }
      this.addTipToCart()
    },
    getInputTip() {
      if (this.tip === null || Number(this.tip) <= 0)
        this.tip = Number(0).toFixed(2)
      else {
        this.tip = Number(this.tip).toFixed(2)
      }
      this.addTipToCart()
    },
    addTipToCart() {
      if (this.tip > 0) {
        this.$store.dispatch('addToCart', {
          id: 'tip',
          name: 'tip',
          price: Number(this.tip),
          quantity: 1,
          cheese: null,
          peppers: null,
          addOns: [],
          without: [],
          canExpand: false,
        })
      }
    },
    resetForm() {
      this.$refs.form.reset()
      this.$store.$dispatch('clearCart')
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

    ...cartPrice,
    ...cart,
  },
}
</script>

<style lang="scss"></style>
