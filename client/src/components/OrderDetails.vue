<template>
  <div>
    <v-toolbar flat class="font-weight-bold">
      <v-toolbar-title>
        Order Details
      </v-toolbar-title>
    </v-toolbar>

    <v-list dense class="text-body-2">
      <v-list-item>
        <v-list-item-content class="font-weight-medium">
          Name:
        </v-list-item-content>

        <v-list-item-content class="align-end">
          {{ orderDetails.name }}
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content class="font-weight-medium">
          Email:
        </v-list-item-content>

        <v-list-item-content class="align-end">
          {{ orderDetails.email }}
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content class="font-weight-medium">
          Phone:
        </v-list-item-content>

        <v-list-item-content class="align-end">
          {{ orderDetails.phone }}
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content class="font-weight-medium">
          Method:
        </v-list-item-content>

        <v-list-item-content class="align-end">
          {{ orderDetails.orderMethod }}
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content class="font-weight-medium">
          When:
        </v-list-item-content>

        <v-list-item-content class="align-end">
          {{ orderDetails.day + ' at ' + orderDetails.time }}
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content class="font-weight-medium">
          Instructions:
        </v-list-item-content>

        <v-list-item-content class="align-end">
          {{ orderDetails.instructions }}
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      loading: false,
    }
  },

  computed: {
    ...mapGetters(['orderDetails']),
  },
}
</script>

<style lang="scss" scoped></style>
