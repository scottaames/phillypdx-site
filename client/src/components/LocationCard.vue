<template>
  <v-card class="mx-auto location-card mt-0 mb-8 pb-4 neomorphed">
    <v-row>
      <v-col cols="12" md="6" lg="12">
        <v-card-title class="justify-center">
          {{ location.name + ', OR' }}
        </v-card-title>
        <v-card-text class="pb-1 mx-xs-3 px-xs-3 mx-0 px-0">
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
        <v-card-actions class="pb-0">
          <v-btn
            class="mx-lg-auto button-shake-anim"
            :block="this.$vuetify.breakpoint.mdAndDown"
            :to="`/order/${location.name}`"
            depressed
            large
            color="secondary"
            >Order now at {{ location.name }} location</v-btn
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
@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
    opacity: 0.9;
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
    opacity: 0.8;
  }

  30%,
  50%,
  70% {
    transform: translate3d(-3px, 0, 0);
  }

  30%,
  60% {
    transform: translate3d(3px, 0, 0);
  }
}

.location-card {
  max-width: 400px;
}

@media screen and (min-width: 1264px) {
  .location-card {
    max-width: 500px;
  }
  .button-shake-anim {
    animation: shake;
    animation-timing-function: cubic-bezier(0.36, 0.07, 0.19, 0.97);
    animation-delay: 8s;
    animation-duration: 1s;
    animation-iteration-count: 1;
    animation-fill-mode: both;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 100px;
    opacity: 1;
  }
}
@media screen and (min-width: 961px) {
  .location-card {
    max-width: 800px;
    min-width: 500px;
  }
}
@media screen and (min-width: 601px) {
  .location-card {
    max-width: 500px;
    margin: 0 25px;
  }
}
</style>
