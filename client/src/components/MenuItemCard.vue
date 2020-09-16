<template>
  <div>
    <v-dialog v-model="openModal" :scrollable="false" max-width="500">
      <MenuOptionsModal :item="menuItem" v-bind:isOpen.sync="openModal" />
    </v-dialog>

    <v-hover v-slot:default="{ hover }">
      <v-card
        flat
        min-width="200"
        class=" py-0 px-0"
        @click.stop="openModal = true"
      >
        <v-fade-transition>
          <v-overlay
            v-if="hover && !isMobile"
            color="secondary"
            class="transition-fast-in-fast-out text-button white--text font-weight-bold"
            style="font-size:1.25rem !important;"
            opacity="0.5"
            absolute
          >
            Add to cart
          </v-overlay>
        </v-fade-transition>

        <div>
          <v-card-subtitle
            class="grey--text text--darken-4 font-weight-medium pt-3 pb-2"
          >
            <v-row class="ml-0 mr-1">
              {{ menuItem.name }}
              <v-spacer></v-spacer>
              <strong>{{
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(menuItem.price.toFixed(2))
              }}</strong>
            </v-row>
          </v-card-subtitle>
          <v-card-text
            class="pt-0 pb-2  description"
            v-text="menuItem.description"
          >
          </v-card-text>

          <v-card-actions v-if="isMobile" class="justify-center ">
            <v-btn text small color="indigo">
              Add to cart
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
import MenuOptionsModal from '@/components/MenuOptionsModal.vue'
export default {
  components: { MenuOptionsModal },
  props: {
    menuItem: {
      type: Object,
      required: true,
      default: null,
    },
  },
  data() {
    return {
      openModal: false,
    }
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.mobile
    },
  },
}
</script>

<style lang="scss">
@media screen and (min-width: 601px) {
  .description {
    max-width: 90%;
  }
}
</style>
