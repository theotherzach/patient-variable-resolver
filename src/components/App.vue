<template>
  <div>
    <div v-if="!sheetsLoaded">
      <import></import>
    </div>

    <div v-if="sheetsLoaded">
      <router-view></router-view>
      Sheets loaded
    </div>
  </div>
</template>

<script>
import Import from './Import.vue'
import store from './../store'

export default {
  computed: {
    sheetsLoaded () {
      return store.state.sheetA.length > 0 && store.state.sheetB.length > 0
    },
  },
  components: {
    Import,
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
