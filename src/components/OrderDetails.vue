<template>
  <v-card class="mx-auto" outlined>
    <h1 class="text-h6 text-md-h5 font-weight-bold text-center py-4">
      Order Confirmation
    </h1>
    <h3 class="text-body-1 text-center pb-4">
      Success! We are preparing your order for pick-up. A receipt has been sent
      to the email that you provided.
    </h3>

    <v-img :src="confirmSvg" contain max-height="150" class="my-3"></v-img>

    <h3 class="text-body-1 text-center py-4">
      Thank you for choosing
      <strong>Philadelphia's Steaks and Hoagies</strong>!
    </h3>

    <v-divider></v-divider>

    <v-card-text class="text-body-1 grey--text text-center text--darken-3 pt-6">
      Please look over your the details of your order below and confirm that
      everything is correct. If you need to contact us, please call our
      {{ orderDetails.location }} location at
      <a href="">{{ locationNumber }}</a> and our staff will be happy to assist
      you.
    </v-card-text>

    <v-card-text class="">
      <v-list v-for="item in listContent" :key="item.title" dense height="55">
        <v-list-item class=" py-0 ">
          <v-list-item-title class="py-0 text-body-1 font-weight-medium">
            {{ item.title }}
            <p class="pl-3 text-body-1 font-weight-regular">
              {{ item.data }}
            </p>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import confirmSvg from '@/assets/confirmation.svg'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      confirmSvg,

      loading: false,
    }
  },

  computed: {
    listContent() {
      return [
        {
          title: 'Name:',
          data: this.orderDetails.name,
        },
        {
          title: 'Email:',
          data: this.orderDetails.email,
        },
        {
          title: 'Phone:',
          data: this.orderDetails.phone,
        },
        {
          title: 'Location:',
          data: this.orderDetails.location,
        },
        {
          title: 'Method:',
          data: this.orderDetails.name,
        },
        {
          title: 'When:',
          data: this.orderDetails.day + ' at ' + this.orderDetails.time,
        },
        {
          title: 'Instructions:',
          data: this.orderDetails.instructions
            ? this.orderDetails.instructions
            : `No instructions were provided`,
        },
      ]
    },
    locationNumber() {
      let location = this.$store.getters.locations.filter(
        (item) => item.name === this.orderDetails.location
      )
      if (location) return location[0].phone
      return ''
    },
    ...mapGetters(['orderDetails']),
  },
}
</script>

<style lang="scss" scoped></style>
