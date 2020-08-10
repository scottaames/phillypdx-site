<template>
  <v-row justify="center">
    <v-col class="text-center mt-5 mb-md-9 mb-5 title-1" cols="12">
      Locations
    </v-col>
    <v-col
      cols="12"
      lg="4"
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

<style lang="scss">
.title-1 {
  background-color: transparent;
  z-index: 4;
  font-family: 'Calibre Web' !important;
  font-size: 2.5rem;
  font-weight: 600;
  letter-spacing: 0.05rem;
  color: rgba(40, 40, 40, 1);
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
</style>
