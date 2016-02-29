<template>
  <div>
    <div v-if="!sheetsLoaded">
      <import></import>
    </div>

    <div v-if="sheetsLoaded">
      <primary-nav></primary-nav>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Import from './Import.vue'
import PrimaryNav from './PrimaryNav.vue'
import store from './../store'

export default {
  computed: {
    sheetsLoaded () {
      return store.state.sheetA.length > 0 && store.state.sheetB.length > 0
    },
  },
  components: {
    Import,
    PrimaryNav
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
