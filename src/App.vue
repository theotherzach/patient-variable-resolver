<template>
  <div id="app">
    <div v-if="!sheetsLoaded">
      <import></import>
    </div>

    <div v-if="sheetsLoaded">
      Sheets loaded
    </div>
  </div>
</template>

<script>
import Import from './components/Import.vue'
import store from './store'

export default {
  computed: {
    sheetsLoaded () {
      return store.state.sheetA.length > 0 && store.state.sheetB.length > 0
    },
  },
  components: {
    Import
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
