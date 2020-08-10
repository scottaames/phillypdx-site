<template>
  <div>
    <v-dialog v-model="openModal" max-width="700">
      <MenuOptionsModal :item="menuItem" v-bind:isOpen.sync="openModal" />
    </v-dialog>

    <v-hover v-slot:default="{ hover }">
      <v-card flat class="py-2 px-md-7 px-2" @click.stop="openModal = true">
        <v-fade-transition>
          <v-overlay
            v-if="hover"
            color="secondary"
            class="transition-fast-in-fast-out text-button white--text font-weight-bold"
            style="font-size:1.25rem !important;"
            opacity="0.5"
            absolute
          >
            Add to cart
          </v-overlay>
        </v-fade-transition>
        <v-row no-gutters align="start" justify="space-between">
          <v-col cols="12">
            <div
              class="grey--text text--darken-4"
              style="font-weight:600;font-size:1rem;"
            >
              {{ menuItem.name }}
            </div>
          </v-col>
          <v-col cols="12" sm="10">
            <div class="grey--text text--darken-3 text-body-2 mb-1">
              {{ menuItem.description }}
            </div>
          </v-col>
          <v-col cols="12" sm="2" class="d-flex justify-end">
            <strong class=" grey--text text--darken-4">{{
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(menuItem.price.toFixed(2))
            }}</strong>
          </v-col>
        </v-row>
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
}
</script>

<style lang="scss"></style>
