<template>
  <v-overlay
    :value="loading"
    persistent
    transition="fade out-in"
    no-click-animation
    opacity="0.75"
    style="z-index: 1000;"
    content-class="text-center"
  >
    <div class="d-flex justify-center mb-4">
      <fingerprint-spinner
        :animation-duration="1500"
        :size="loaderSize"
        color="#e9c46a"
      />
    </div>
    <span class="text-h5 white--text">
      {{ loadMessage }}
    </span>
  </v-overlay>
</template>

<script>
import { loading, loadMessage } from '../store/helpers'
import { FingerprintSpinner } from 'epic-spinners'

export default {
  props: {
    message: {
      type: String,
      default: 'Loading',
    },
  },
  components: {
    FingerprintSpinner,
  },

  computed: {
    loaderSize() {
      return window.innerHeight * 0.1
    },
    loaderWidth() {
      return window.innerWidth * 0.004
    },
    dialogSize() {
      if (!this.$vuetify.breakpoint.mobile) {
        return window.innerWidth * 0.2
      } else {
        return '75%'
      }
    },
    ...loading,
    ...loadMessage,
  },
}
</script>
