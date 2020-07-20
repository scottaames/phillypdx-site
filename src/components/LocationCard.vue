<template>
  <v-card class="mx-auto" min-width="400" width="100%" max-width="500">
    <v-card-title>
      {{ location.name + ', OR' }}
    </v-card-title>
    <v-card-text class="pb-1 mx-0 px-0">
      <iframe
        frameborder="0"
        width="100%"
        height="400"
        :src="location.mapString"
        style="border:0;"
        allowfullscreen=""
        aria-hidden="false"
        tabindex="0"
      ></iframe>
    </v-card-text>
    <v-card-actions class="pt-1">
      <v-btn :href="location.appleMapsLink" class="mx-auto">
        Open directions in
        <v-img
          contain
          class="ml-1"
          width="24"
          height="24"
          src="https://upload.wikimedia.org/wikipedia/commons/1/17/AppleMaps_logo.svg"
        ></v-img>
      </v-btn>
    </v-card-actions>
    <v-card-actions>
      <v-btn class="mx-auto" large color="secondary"
        >Order now at {{ location.name }} location</v-btn
      >
    </v-card-actions>
    <v-divider class="mt-5 mb-2"></v-divider>
    <v-card-subtitle> PS&H {{ location.name }} Information </v-card-subtitle>
    <v-card-text>
      <v-list flat class="pt-0" dense>
        <v-list-item-group>
          <v-list-item :href="`tel:${location.phone}`">
            <v-list-item-icon>
              <v-icon>mdi-phone</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle
                v-html="location.phone"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="copied">
            <v-list-item-content>
              <v-snackbar
                v-model="copied"
                absolute
                centered
                light
                color="grey lighten-3"
              >
                Copied to clipboard.
              </v-snackbar>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            active-class="grey--text text--darken-1"
            @click="copyAddress"
          >
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle v-html="location.address">
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card-text>
    <v-card-subtitle> PS&H {{ location.name }} Hours </v-card-subtitle>
    <v-card-text>
      <v-simple-table dense>
        <tbody>
          <tr v-for="hours in location.hours" :key="hours[0]">
            <td class="text-left">{{ hours[0] }}</td>
            <td class="text-right">{{ hours[1] }}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card-text>
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
      default: false,
    },
  },
  data() {
    return {
      copied: false,
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

<style lang="scss" scoped></style>
