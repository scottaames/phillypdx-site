<template>
  <v-expansion-panels
    class="mx-auto"
    min-width="200"
    v-model="panel"
    focusable
    accordion
  >
    <v-expansion-panel v-for="category in menu" :key="category.id">
      <v-expansion-panel-header
        class="grey--text text--darken-4 font-weight-medium"
      >
        {{ category.name }}
      </v-expansion-panel-header>
      <v-divider v-if="category.id != 8"></v-divider>

      <v-expansion-panel-content>
        <div v-for="(item, index) in category.items" :key="index">
          <MenuItemCard :menuItem="item" />
          <v-divider></v-divider>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import MenuItemCard from '@/components/MenuItemCard.vue'
import { menu } from '@/store/helpers'

export default {
  components: {
    MenuItemCard,
  },
  beforeCreate() {
    this.$store.dispatch('fetchMenu')
  },
  data() {
    return {
      panel: -1,
    }
  },
  computed: {
    icon() {
      return this.isOpen ? 'mdi-minus-circle' : 'mdi-plus-circle'
    },
    ...menu,
  },
}
</script>

<style lang="scss">
.v-expansion-panel-content__wrap {
  padding: 0 !important;
}
</style>
