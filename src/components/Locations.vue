<template>
  <v-row justify="center">
    <v-col class="text-center py-5" cols="12">
      <h1 class="display-1">Locations</h1>
    </v-col>
    <v-col
      cols="12"
      sm="6"
      md="4"
      v-for="location in this.$store.state.locations"
      :key="location.name"
    >
      <LocationCard :isIOS="isIOSDevice" :location="location" />
    </v-col>
  </v-row>
</template>

<script>
import LocationCard from '@/components/LocationCard.vue'

export default {
  components: {
    LocationCard,
  },
  data() {
    return {
      isIOSDevice: false,
    }
  },
  created() {
    const toMatch = [/iPhone/i, /iPad/i, /iPod/i]
    this.isIOSDevice = toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem)
    })
  },
}
</script>

<style lang="scss" scoped></style>
