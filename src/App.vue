<template>
  <v-app>
    <v-navigation-drawer
      dark
      v-model="navDrawer"
      floating
      color="transparent"
      style="backdrop-filter: blur(10px);"
      :temporary="isMobile"
      :permanent="!isMobile"
      max-width="350"
      :width="isMobile ? '80%' : '350'"
      app
    >
      <v-list-item>
        <v-img
          eager
          :aspect-ratio="319 / 170"
          contain
          max-width="225"
          class="mx-lg-10 mx-sm-auto mx-5 my-md-8 my-sm-6 my-4"
          src="http://phillypdx.net/wp-content/uploads/2020/01/8723604.png"
        />
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav flat>
        <v-list-item
          v-for="item in navItems"
          :key="item.title"
          link
          :to="item.url"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-uppercase nav-headers">
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item href="http://www.13virtuesbrewing.com/">
          <v-list-item-icon>
            <v-icon>mdi-glass-mug-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-uppercase nav-headers">
              13 Virtues Brewing
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group
          active-class="yellow--text secondary"
          prepend-icon="mdi-shopping-outline"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title
                class="yellow--text text-uppercase nav-headers"
              >
                Order Online
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            active-class="white--text"
            v-for="location in this.$store.state.locations"
            :key="location.name"
            :to="location.path"
          >
            <v-list-item-title
              class="pl-5 text-uppercase nav-headers--sm"
              v-text="location.name"
            >
            </v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>

      <v-footer
        style="background: rgba(0,0,0, 0.5);"
        padless
        absolute
        height="80"
      >
        <v-row align="center" justify="center">
          <v-col cols="12">
            <div class="text-center white--text body-2">
              {{ new Date().getFullYear() }} &reg; Philadelphia's Steaks &
              Hoagies

              <br />
              Developed by
              <a
                class="text-decoration-none light-blue--text text--darken-1"
                href="scottaames.github.io"
                >Scott Ames</a
              >
            </div>
          </v-col>
        </v-row>
      </v-footer>
    </v-navigation-drawer>
    <v-app-bar v-if="isMobile" absolute dark flat tile class="transparent">
      <v-app-bar-nav-icon
        v-if="isMobile"
        large
        @click="navDrawer = true"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <v-main class="hero-img">
      <transition v-if="!isMobile" name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
      <router-view v-else></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    navDrawer: false,
    navItems: [
      {
        title: 'Home',
        url: '/',
        icon: 'mdi-home-city',
      },

      {
        title: 'Locations & Hours',
        url: '/locations',
        icon: 'mdi-map-clock',
      },
    ],
  }),
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.mobile
    },
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@600;700&display=swap');
</style>

<style lang="sass">
@import './sass/all.scss

body
  overflow: hidden
  max-width: 100vw

@media screen and (min-width: 651px)
  .header
    font-family: 'Work Sans', sans-serif !important
    font-weight: 700 !important
    font-size: 36pt
    &--sm
      font-size: 20pt
    &--lg
      font-size: 64pt

.nav-headers
  font-family: 'Montserrat', sans-serif !important
  font-weight: 700 !important
  font-size: 1rem !important
  &--sm
    font-size: 0.9rem !important
    font-family: 'Montserrat', sans-serif !important
    font-weight: 600 !important

.header
  font-family: 'Work Sans', sans-serif !important
  font-weight: 700 !important
  font-size: 24pt
  &--sm
    font-size: 16pt
  &--lg
    font-size: 42pt
</style>
