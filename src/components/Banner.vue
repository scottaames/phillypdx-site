<template>
  <v-window :reverse="reverseLast" v-model="window" class="ma-0 pa-0">
    <v-window-item
      continuous
      class="ma-0 pa-0"
      v-for="(image, index) in images"
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
        <h1 class="text-h1 mt-2 shadowed">Welcome to</h1>
        <v-img
          height="225"
          contain
          class="my-4"
          src="http://phillypdx.net/wp-content/uploads/2020/01/8723604.png"
        ></v-img>
        <h3 class="text-h4 shadowed mb-8">
          Family-owned and operated since 1987
        </h3>
        <v-btn to="/order" class="mr-1" large color="secondary" depressed
          >Place an order</v-btn
        >
        <v-btn to="#locations" class="ml-1" large color="black" depressed
          >View locations</v-btn
        >
      </div>
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
      return window.innerHeight - 64
    },
    reverseLast() {
      return this.window === 0
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
.banner-image
  background-position: center
  background-size: contain
</style>
