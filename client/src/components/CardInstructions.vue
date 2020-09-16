<template>
  <v-alert text class="mt-1" light color="blue-grey darken-4">
    <div class="d-flex justify-space-between">
      <h1 class="text-subtitle-1 mb-2 font-weight-bold">
        Testing Instructions
      </h1>
      <v-btn
        :ripple="false"
        class=" grey--text text--darken-2"
        icon
        @click="show = !show"
      >
        <v-icon right>mdi-chevron-down</v-icon>
      </v-btn>
    </div>
    <div v-show="show">
      <p class="text-body-2" :key="1">
        You can use the following card numbers to achieve the desired outcome
        for demonstration/testing purposes. This website uses a test version of
        <a target="_blank" href="https://stripe.com">Stripe</a> and
        <strong>will not charge</strong> any credit card information provided.
      </p>

      <v-simple-table class="mb-5" light dense :key="2">
        <thead>
          <tr>
            <th class="text-uppercase">Card Number</th>
            <th class="text-uppercase">Expiration</th>
            <th class="text-uppercase">CVC</th>
            <th class="text-uppercase">Outcome</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in info" :key="index">
            <td>{{ item.number }}</td>
            <td>Any future date</td>
            <td>Any 3 digits</td>
            <td>{{ item.message }}</td>
          </tr>
        </tbody>
      </v-simple-table>

      <p class="text-body-2" :key="3">
        For more detailed information and additional testing options, please see
        Stripe's official
        <a target="_blank" href="https://stripe.com/docs/testing">
          testing documentation</a
        >.
      </p>
    </div>
  </v-alert>
</template>

<script>
export default {
  data: () => ({
    show: false,
    info: [
      {
        number: '4242 4242 4242 4242',
        message: 'No authentication and payment will succeed',
      },
      {
        number: '4000 0027 6000 3184',
        message:
          'Authentication required. A modal will open with available options.',
      },
    ],
  }),
}
</script>

<style lang="scss" scoped></style>
