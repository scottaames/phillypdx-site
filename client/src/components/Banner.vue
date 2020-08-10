<template>
  <v-window :reverse="window === 0" v-model="window" class="ma-0 pa-0">
    <v-window-item
      continuous
      class="ma-0 pa-0"
      v-for="(image, index) in images"
      transition="fade-transition"
      :key="`card-${index}`"
    >
      <v-card
        color="transparent"
        tile
        flat
        :height="getWindowHeight"
        class="banner-image ma-0 pa-0"
        :style="{ 'background-image': image }"
      >
      </v-card>
    </v-window-item>
    <v-overlay
      color="transparent"
      class="fill-height text-center"
      z-index="1"
      absolute
    >
      <div>
        <h1
          class="text-sm-h2 text-md-h1 text-h3 mt-2 shadowed font-weight-medium"
        >
          Welcome to
        </h1>
        <v-img
          :aspect-ratio="319 / 170"
          contain
          max-width="375"
          class="mx-10 mx-sm-auto my-8"
          src="http://phillypdx.net/wp-content/uploads/2020/01/8723604.png"
        ></v-img>
        <h3 class="text-sm-h4 text-h5 font-weight-medium shadowed mb-8">
          Family-owned and operated since 1987
        </h3>
      </div>
      <v-btn
        to="#locations"
        active-class="secondary"
        :x-large="this.$vuetify.breakpoint.lgAndUp"
        :large="this.$vuetify.breakpoint.mdAndDown"
        color="secondary"
        >View locations</v-btn
      >
    </v-overlay>
  </v-window>
</template>

<script>
export default {
  name: 'Banner',
  created() {
    setInterval(() => {
      if (++this.window >= this.length) this.window = 0
    }, 5000)
  },
  computed: {
    getWindowHeight() {
      let appbarHeight = this.$vuetify.breakpoint.mobile ? 56 : 64
      return window.innerHeight - appbarHeight
    },
  },
  data: () => ({
    length: 4,
    window: 0,
    images: [
      'url(http://phillypdx.net/wp-content/uploads/2020/01/PhillysPdxSliderImages1.png)',
      'url(http://phillypdx.net/wp-content/uploads/2020/01/PhillysPdxSliderImages2.png)',
      'url(http://phillypdx.net/wp-content/uploads/2020/01/PhillysPdxSliderImages3.png)',
      'url(http://phillypdx.net/wp-content/uploads/2020/01/PhillysPdxSliderImages4.png)',
    ],
  }),
}
</script>
<style lang="sass">
.shadowed
  text-shadow: black 0.15rem -0.15rem 0.5rem, black -0.15rem 0.15rem 0.5rem
  font-family: "Calibre Web" !important
.banner-image
  background-position: center
  background-size: contain
</style>
