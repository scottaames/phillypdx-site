<template>
  <div>
    <v-dialog v-model="openModal" :scrollable="false" max-width="700">
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
        <!-- <div v-if="!isMobile">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle
                class="grey--text text--darken-3 font-weight-medium"
                v-text="menuItem.name"
              ></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-action-text
                class="font-weight-bold text-subtitle-2 grey--text text--darken-3 "
                >{{ '$' + menuItem.price }}</v-list-item-action-text
              >
            </v-list-item-action>
          </v-list-item>
          <v-card-text
            class="pt-0"
            style="max-width: 90%"
            v-text="menuItem.description"
          >
          </v-card-text>
        </div> -->

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

        <!--   <v-row no-gutters align="start" justify="space-between">
          <v-col cols="12" class="grey--text text--darken-4">
            {{ menuItem.name }}
          </v-col>
          <v-col cols="12" sm="10">
            <div class="grey--text text--darken-3 text-body-2 mb-1">
              {{ menuItem.description }}
            </div>
          </v-col>
          <v-col cols="12" sm="2" class="d-flex justify-end">
            <strong class="grey--text text--darken-4">{{
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(menuItem.price.toFixed(2))
            }}</strong>
          </v-col>
        </v-row> -->
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
