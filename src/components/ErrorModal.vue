<template>
  <div class="text-center">
    <v-dialog :value="open" width="450">
      <v-card :elevation="0" flat>
        <v-card-title class="headline">
          Error Processing Payment
        </v-card-title>
        <v-card-text class=" grey--text text--darken-4">
          {{ error }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click.stop="close" color="red darken-2" text>Try Again</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    error: {
      type: String,
      default: '',
    },
  },
  methods: {
    close() {
      this.$emit('update:open', false)
    },
  },
}
</script>

<style lang="scss" scoped></style>
