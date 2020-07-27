<template>
  <v-expansion-panels
    style="max-width:750px"
    class="mx-auto"
    v-model="panel"
    focusable
    accordion
  >
    <v-expansion-panel
      v-for="category in this.$store.state.menu"
      :key="category.id"
    >
      <v-expansion-panel-header
        class="grey--text text--darken-4 font-weight-bold"
        style="font-size:1.1rem"
      >
        {{ category.name }}
        <template v-slot:actions>
          <v-icon
            :color="panel == category.id - 1 ? 'red darken-1' : 'primary'"
          >
            {{
              panel == category.id - 1 ? 'mdi-minus-circle' : 'mdi-plus-circle'
            }}
          </v-icon>
        </template>
      </v-expansion-panel-header>
      <v-divider></v-divider>

      <v-expansion-panel-content>
        <div v-for="item in category.items" :key="item.name">
          <MenuItemCard :menuItem="item" />
          <v-divider></v-divider>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import MenuItemCard from '@/components/MenuItemCard.vue'

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
  },
}
</script>

<style lang="scss">
.v-expansion-panel-content__wrap {
  padding: 0 !important;
}
</style>
