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
        <v-card width="66.666%" outlined class="mx-auto">
          <v-card-subtitle
            class="ml-2 grey--text text--darken-2 font-weight-bold pb-0"
          >
            CONTACT
          </v-card-subtitle>
          <v-card-text class="px-sm-10 pb-1">
            <v-row>
              <v-col cols="12" sm="6">
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

              <v-col cols="12" sm="6">
                <v-text-field
                  dense
                  v-model="phone"
                  :rules="rules.phone"
                  placeholder="(xxx) xxx-xxxx"
                  outlined
                  style="font-size:0.9rem"
                  label="Phone Number"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
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
              style="width:50%;"
              class="mx-auto"
              justify="center"
            >
              <v-checkbox
                class="mr-2"
                readonly
                :ripple="false"
                :input-value="true"
                label="Pick-up"
              ></v-checkbox>
              <v-checkbox class="ml-2" label="Delivery" disabled></v-checkbox>
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
            class="ml-2 grey--text text--darken-2 font-weight-bold"
          >
            PAYMENT METHOD
          </v-card-subtitle>
          <v-card-text class="px-sm-10 pb-1">
            <v-text-field
              dense
              v-model="cardNumber"
              :rules="rules.cardNumber"
              outlined
              style="font-size:0.9rem"
              placeholder="xxxx-xxxx-xxxx-xxxx"
              label="Card number"
              required
            ></v-text-field>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  dense
                  v-model="cardSecurityCode"
                  :rules="rules.cardSecurityCode"
                  outlined
                  style="font-size:0.9rem"
                  label="3-digit security code"
                  placeholder="xxx"
                  hint="The security code on the back of your card"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  dense
                  v-model="zipCode"
                  :rules="rules.zipCode"
                  outlined
                  style="font-size:0.9rem"
                  label="Zip code"
                  placeholder="xxxxx"
                  hint="The 5-digit zip code that your bank has on file for your card"
                  required
                ></v-text-field>
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
                  label="Add a preset tip amount"
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
              dense
              outlined
              v-model="instructions"
              placeholder="Anything else for your order?"
            >
            </v-textarea>
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
            >
              Finalize order
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-skeleton-loader>
    </v-form>
  </v-container>
</template>

<script>
import { format, add } from 'date-fns'
export default {
  props: {
    location: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
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
      instructions: null,
      loading: true,
      hours: null,
      openHour: 0,
      closeHour: 0,
      open: '',
      close: '',
      valid: false,
      timeModal: false,
      zipCode: null,
      cardNumber: null,
      cardSecurityCode: null,
      tip: Number(0).toFixed(2),
      presetTips: ['10%', '15%', '20%', '25%', 'Custom amount'],
      presetTipSelected: 'Custom amount',
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
            'Please enter the full name on the payment card exactly as it appears',
        ],
        cardNumber: [
          (v) => !!v || 'Please enter the payment card number',
          (v) =>
            (v || '').length === 16 ||
            'The payment card number must be exactly 16 digits in length',
        ],
        cardSecurityCode: [
          (v) =>
            !!v ||
            'Please enter the 3-digit security code on the back of the payment card',
          (v) =>
            (v || '').length === 3 ||
            'The payment card security code must be exactly 3 digits in length',
        ],
        zipCode: [
          (v) =>
            !!v || 'Please enter the billing zip code for the payment card',
          (v) =>
            (v || '').length === 5 ||
            'The payment card zip code must be exactly 5 digits in length',
        ],
        phone: [
          (v) =>
            !!v ||
            'Please enter a phone number to reach you at in case an issue arises with this order',
          (v) =>
            (v || '').length === 10 ||
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
    allowedHours() {
      if (this.location.toLowerCase() === 'sisters') {
        return (v) => v >= 11 && v <= 19
      }
      return (v) => v >= this.openHour && v <= this.closeHour
    },

    getTip() {
      let tip = Number(this.presetTipSelected.substr(0, 2)) / 100
      this.tip = (this.price * tip).toFixed(2)
    },
    checkForm() {
      this.valid
        ? this.$emit('update:currentStep', this.currentStep + 1)
        : this.$refs.form.validate()
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
  },
}
</script>

<style lang="scss" scoped></style>
