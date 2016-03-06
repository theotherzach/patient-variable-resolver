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
  font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
  font-size: 15px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #34495e;
}
h1, h2, h3, h4, strong {
    font-weight: 600;
    color: #2c3e50;
}
p {
    word-spacing: 0.05em;
}
</style>
