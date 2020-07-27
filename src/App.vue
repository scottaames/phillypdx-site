<template>
  <v-app>
    <v-app-bar app expanded color="grey darken-4" dark style="z-index:5;">
      <router-link to="/">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="http://phillypdx.net/wp-content/uploads/2020/01/8723604.png"
          transition="scale-transition"
          height="55"
        />
      </router-link>

      <v-spacer></v-spacer>

      <v-btn active-class="yellow--text" class="" to="/" active text>
        Home
      </v-btn>
      <v-btn active-class="yellow--text" class=" mr-3" to="/#locations" text>
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

    <v-main :class="{ 'grey lighten-3': this.$route.name === 'order' }">
      <router-view></router-view>
    </v-main>

    <v-footer color="grey darken-4" padless>
      <v-row no-gutters justify="center">
        <v-col class="text-center my-7 white--text" cols="12">
          {{ new Date().getFullYear() }} &reg; Philadelphia's Steaks & Hoagies
          <span class="px-1 white--text"> &ndash; </span>
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

  components: {},

  data: () => ({}),
}
</script>

<style lang="sass">
.theme--dark.v-btn--active:hover::before, .theme--dark.v-btn--active::before
  opacity: 0 !important
</style>
