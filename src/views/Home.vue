<template>
  <div>
    <v-container class="black ma-0 pa-0" fluid>
      <Banner />
    </v-container>
    <v-container class="my-3" id="locations">
      <Locations />
    </v-container>
  </div>
</template>

<script>
import Banner from '@/components/Banner.vue'
import Locations from '@/components/Locations.vue'
export default {
  name: 'Home',
  components: {
    Banner,
    Locations,
  },
}
</script>

<style lang="sass"></style>
