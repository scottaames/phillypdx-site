<template>
  <div justify="text-center">
    <v-dialog
      :max-width="dialogSize"
      :value="loading"
      persistent
      transition="fade out-in"
      no-click-animation
      content-class="text-center"
    >
      <v-card class="pa-4">
        <v-card-text class="text-h5 grey--text text--darken-4 pt-4">
          {{ loadMessage }}
        </v-card-text>
        <v-card-actions class="justify-center">
          <circles-to-rhombuses-spinner
            :animation-duration="1200"
            :size="loaderSize"
            color="rgb(66, 71, 112)"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { loading, loadMessage } from '../store/helpers'
import { CirclesToRhombusesSpinner } from 'epic-spinners'

export default {
  props: {
    message: {
      type: String,
      default: 'Loading',
    },
  },
  components: {
    CirclesToRhombusesSpinner,
  },

  computed: {
    loaderSize() {
      return window.innerHeight * 0.05
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
