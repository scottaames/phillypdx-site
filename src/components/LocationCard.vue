<template>
  <v-card
    class="elevation-12 mx-lg-none mx-auto location-card mt-0 mb-8 pb-3 rounded-xl"
  >
    <v-row>
      <v-col cols="12" md="6" lg="12">
        <v-card-title class="justify-center">
          {{ location.name + ', OR' }}
        </v-card-title>
        <v-card-text class="pb-1 mx-0 px-0">
          <iframe
            frameborder="0"
            width="100%"
            height="100%"
            :src="location.mapString"
            style="border:0;min-height:275px;"
            allowfullscreen=""
            aria-hidden="false"
            tabindex="0"
          ></iframe>
        </v-card-text>
        <v-card-actions class="pt-1 pb-0">
          <v-btn
            :href="location.appleMapsLink"
            color="grey lighten-5"
            depressed
            class="mx-auto"
            v-if="isIOS"
          >
            Open directions in
            <v-img
              contain
              class="ml-2"
              height="24px"
              width="24px"
              src="https://upload.wikimedia.org/wikipedia/commons/1/17/AppleMaps_logo.svg"
            ></v-img>
          </v-btn>
        </v-card-actions>
        <v-card-actions class="justify-center pb-0">
          <v-btn
            class="wiggle"
            block
            :to="`/order/${location.name}`"
            large
            color="secondary"
            >Order Online</v-btn
          >
        </v-card-actions>
      </v-col>
      <v-col cols="12" md="6" lg="12">
        <v-card-subtitle
          class="pt-2 grey--text text--darken-3 font-weight-medium"
        >
          PS&H {{ location.name }} Information

          <v-btn
            v-if="this.$vuetify.breakpoint.smAndDown"
            :ripple="false"
            class="float-right grey--text text--darken-2"
            text
            x-small
            @click="showInfo = !showInfo"
          >
            Show
          </v-btn>
        </v-card-subtitle>

        <v-snackbar v-model="copied" bottom>
          Address copied to clipboard.
        </v-snackbar>
        <v-card-text
          class="py-0"
          v-if="this.$vuetify.breakpoint.mdAndUp || showInfo"
        >
          <v-list class="pt-0" color="transparent" dense>
            <v-list-item :href="`tel:${location.phone}`">
              <v-list-item-icon class="mr-4">
                <v-icon>mdi-phone</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-subtitle
                  class="grey--text text--darken-3 font-weight-regular"
                  v-html="location.phone"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
              active-class="grey--text text--darken-1"
              @click="copyAddress"
            >
              <v-list-item-icon class="mr-4">
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-subtitle
                  class="grey--text text--darken-3 font-weight-regular text-wrap"
                  v-html="location.address"
                >
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-subtitle class="grey--text text--darken-3 font-weight-medium ">
          PS&H {{ location.name }} Hours
          <v-btn
            v-if="this.$vuetify.breakpoint.smAndDown"
            :ripple="false"
            class="float-right grey--text text--darken-2"
            text
            x-small
            @click="showHours = !showHours"
          >
            Show
          </v-btn>
        </v-card-subtitle>
        <v-card-text v-if="this.$vuetify.breakpoint.mdAndUp || showHours">
          <v-simple-table
            class="transparent grey--text text--darken-3 pr-5"
            dense
          >
            <tbody>
              <tr v-for="hours in location.hours" :key="hours[0]">
                <td class="text-left">{{ hours[0] }}</td>
                <td class="text-right">{{ hours[1] }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'LocationCard',
  props: {
    location: {
      type: Object,
      required: true,
      default: null,
    },
    isIOS: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      copied: false,
      showInfo: false,
      showHours: false,
    }
  },
  methods: {
    copyAddress() {
      let blob = new Blob([this.location.address], { type: 'text/plain' })
      // eslint-disable-next-line no-undef
      let data = [new ClipboardItem({ [blob.type]: blob })]
      navigator.clipboard.write(data).then(
        () => {
          this.copied = true
          console.log('copied!')
        },
        () => {
          console.log('error copying address')
        }
      )
    },
  },
}
</script>

<style lang="scss">
@import '../sass/animations.scss';

.location-card {
  max-width: 400px !important;
}

@media screen and (min-width: 601px) {
  .location-card {
    max-width: 500px !important;
    min-width: 300px !important;
  }
}

@media screen and (min-width: 961px) {
  .location-card {
    max-width: 800px !important;
    min-width: 500px !important;
  }
}
@media screen and (min-width: 1264px) {
  .location-card {
    max-width: 450px !important;
    min-width: 300px !important;
  }
}
</style>
