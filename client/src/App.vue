<template>
  <v-app id="inspire">
    <v-app-bar app expanded color="grey darken-4" dark style="z-index:5;" flat>
      <router-link to="/">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="http://phillypdx.net/wp-content/uploads/2020/01/8723604.png"
          height="62"
          width="90"
        />
      </router-link>

      <v-spacer></v-spacer>
      <v-app-bar-nav-icon
        v-if="this.$vuetify.breakpoint.xs"
      ></v-app-bar-nav-icon>

      <v-btn active-class="yellow--text" class="" to="/">
        Home
      </v-btn>
      <v-btn active-class="yellow--text" class="mr-3" to="/#locations" text>
        Locations
      </v-btn>

      <!-- <v-divider vertical inset color="white" class="mr-5 ml-3"></v-divider> -->
      <v-menu open-on-hover bottom offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" color="secondary" class="mr-4 ">
            Order Online
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list dark nav color="secondary">
          <v-list-item
            link
            v-for="location in this.$store.state.locations"
            :key="location.name"
            :to="location.path"
          >
            <v-list-item-content>
              <v-list-item-title>{{ location.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main
      :class="{
        'green lighten-5': this.$route.name === 'order',
        'order-bg': this.$route.name === 'home',
      }"
    >
      <router-view></router-view>
    </v-main>

    <v-footer color="grey darken-4" padless absolute app height="80">
      <v-row no-gutters justify="center">
        <v-col class="text-center white--text" cols="12">
          {{ new Date().getFullYear() }} &reg; Philadelphia's Steaks & Hoagies
          <span
            v-if="this.$vuetify.breakpoint.smAndUp"
            class="px-1 white--text"
          >
            &ndash;
          </span>
          <br v-else />
          Developed by
          <a
            class="text-decoration-none light-blue--text text--darken-1"
            href="scottaames.github.io"
            >Scott Ames</a
          >
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="sass">

.fade-enter-active,
.fade-leave-active
  transition-duration: 0.3s
  transition-property: opacity
  transition-timing-function: ease
  overflow: hidden

.fade-enter,
.fade-leave-active
  opacity: 0

.fade-delay-enter-active
  transition-duration: 0.1s
  transition-delay: 0.25s
  transition-property: opacity
  transition-timing-function: ease-in
  overflow: hidden !important

.fade-delay-enter,
.fade-delay-leave-active
  opacity: 0 !important

.order-bg
  background: #eeeeee !important
</style>
