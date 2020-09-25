<template>
  <v-container
    class="px-5 fill-height"
    style="width:90% !important;  max-width:1800px !important;"
  >
    <v-row justify="center" justify-lg="space-between" class="mx-xl-10">
      <v-col
        class="text-center mb-md-9 mb-5 shadowed header white--text"
        cols="12"
      >
        Locations
      </v-col>
      <v-col
        cols="12"
        lg="4"
        class="px-sm-8"
        v-for="location in this.$store.state.locations"
        :key="location.name"
      >
        <LocationCard :isIOS="isIOSDevice" :location="location" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LocationCard from '@/components/LocationCard.vue'

export default {
  name: 'locations',
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
