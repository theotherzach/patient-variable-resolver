<template>
<nav>
  <ul class="navList">
    <li class="navItem">
      <a v-link="{ path: '/', exact: true }" class="navLink">Import Report</a>
    </li>
    <li class="navItem">
      <a v-link="{ path: '/audits' }" class="navLink">Audits</a>
      </li>
  </ul>
</nav>
</template>

<script>
export default {
}
</script>

<style lang="scss">
.navList {
  list-style: none;
  text-align: center;
  padding: 0;
  margin: 0;
}

.navItem {
  width: 160px;
  border-bottom: none;
  // height: 50px;
  line-height: 50px;
  font-size: 1.4em;
  display: inline-block;
  margin-right: -4px;
  .v-link-active {
    border-bottom: 3px solid #42b983;
  }

}

.navLink {
  text-decoration: none;
  color: #34495e;
  display: block;
  transition: .3s color;
}

.navLink:hover {
  border-bottom: 3px solid #42b983;
}

</style>
