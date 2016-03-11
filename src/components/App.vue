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
import XLSX from 'xlsx-browserify-shim'

window.XLSX = XLSX

export default {
  computed: {
    sheetsLoaded () {
      return store.state.sheetA.length > 0 && store.state.sheetB.length > 0
    },
  },
  components: {
    Import,
    PrimaryNav
  },
  store
}
</script>

<style lang="scss">

$bodyCopyColor : #34495e;
$headerColor: #2c3e50;
$green: #42b983;

* {
  box-sizing: border-box;
}

body {
  font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
  font-size: 15px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $bodyCopyColor;
  background: #f5f5f5;
}
input, button {
  font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
  font-size: 15px;
  color: $bodyCopyColor;
}

button {
  cursor: pointer;
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: 1px solid #fff;
  padding: 12px 20px;
  border-radius: 25px;
  transition: all 0.15s ease;
  margin-bottom: 2em;
}

h1, h2, h3, h4, strong {
    font-weight: 600;
    color: $headerColor;
}
p {
    word-spacing: 0.05em;
}

button > a {
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.green {
  color: #42b983;
}

.container {
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
}

.audit__header {
  text-align: center;
}
</style>
