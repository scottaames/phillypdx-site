<template>
  <div>
    <v-dialog v-model="openModal" max-width="500">
      <MenuOptionsModal
        ref="modal"
        :item="menuItem"
        v-bind:isOpen.sync="openModal"
      />
    </v-dialog>
    <v-dialog :value="openDialog" no-click-animation>
      <v-card class="pb-3 pt-1">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 130.2 130.2"
        >
          <circle
            class="path circle"
            fill="none"
            stroke="#73AF55"
            stroke-width="6"
            stroke-miterlimit="10"
            cx="65.1"
            cy="65.1"
            r="62.1"
          />
          <polyline
            class="path check"
            fill="none"
            stroke="#73AF55"
            stroke-width="6"
            stroke-linecap="round"
            stroke-miterlimit="10"
            points="100.2,40.2 51.5,88.8 29.8,67.5 "
          />
        </svg>
        <p class="">
          <span class="indigo--text">{{ menuItem.name }}</span> added to cart!
        </p>
      </v-card>
    </v-dialog>

    <v-hover v-slot:default="{ hover }">
      <v-card
        flat
        min-width="200"
        class="py-0 px-0"
        @click.stop="addBtnHandler"
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
      openDialog: false,
    }
  },
  methods: {
    addToCart() {
      let item = {
        id: this.$store.getters.cart.length,
        name: this.menuItem.name,
        price: this.menuItem.price,
        quantity: 1,
        cheese: null,
        peppers: null,
        addOns: [],
        without: [],
        canExpand: false,
      }
      this.$store.dispatch('addToCart', item)
    },
    addBtnHandler() {
      if (this.menuItem.options == null) {
        this.openDialog = true
        this.addToCart()
        setTimeout(() => {
          this.openDialog = false
        }, 1500)
      } else {
        this.openModal = true
      }
    },
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

svg {
  width: 100px;
  display: block;
  margin: 40px auto 0;
}

.path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 0;
  &.circle {
    -webkit-animation: dash 0.9s ease-in-out;
    animation: dash 0.9s ease-in-out;
  }
  &.line {
    stroke-dashoffset: 1000;
    -webkit-animation: dash 0.9s 0.35s ease-in-out forwards;
    animation: dash 0.9s 0.35s ease-in-out forwards;
  }
  &.check {
    stroke-dashoffset: -100;
    -webkit-animation: dash-check 0.9s 0.35s ease-in-out forwards;
    animation: dash-check 0.9s 0.35s ease-in-out forwards;
  }
}

p {
  text-align: center;
  margin: 20px 0 60px;
  font-size: 1.25em;
  &.success {
    color: #73af55;
  }
  &.error {
    color: #d06079;
  }
}

@-webkit-keyframes dash {
  0% {
    stroke-dashoffset: 1000;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes dash {
  0% {
    stroke-dashoffset: 1000;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

@-webkit-keyframes dash-check {
  0% {
    stroke-dashoffset: -100;
  }
  100% {
    stroke-dashoffset: 900;
  }
}

@keyframes dash-check {
  0% {
    stroke-dashoffset: -100;
  }
  100% {
    stroke-dashoffset: 900;
  }
}
</style>
