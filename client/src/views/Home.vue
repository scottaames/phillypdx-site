<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col class="text-center" cols="11" sm="12">
        <h1 class="header--lg shadowed white--text">
          Welcome to
        </h1>
        <v-img
          :aspect-ratio="319 / 170"
          contain
          max-width="400"
          class="mx-auto my-8"
          src="http://phillypdx.net/wp-content/uploads/2020/01/8723604.png"
        />
        <h4 class="header--sm shadowed mb-8 white--text">
          Family-owned and operated since 1987
        </h4>
        <v-btn
          to="/locations"
          :x-large="this.$vuetify.breakpoint.lgAndUp"
          :large="this.$vuetify.breakpoint.mdAndDown"
          color="white"
          depressed
          class="mr-0 mr-sm-2 mb-3 mb-sm-0"
          >View locations</v-btn
        >
        <v-btn
          to="/order"
          elevation="12"
          :x-large="this.$vuetify.breakpoint.lgAndUp"
          :large="this.$vuetify.breakpoint.mdAndDown"
          color="secondary"
          class="mx-0 ml-sm-2"
          >Place an Order</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style lang="sass">
.shadowed
  text-shadow: black 0.15rem -0.15rem 0.5rem, black -0.15rem 0.15rem 0.5rem

.neomorphed
  border-radius: 50px !important
  background: #ffffff   !important
  box-shadow: 37px 37px 75px #333333, -37px -37px 75px #222222 !important
</style>
