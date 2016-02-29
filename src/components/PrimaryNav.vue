<template>
<nav>
  <ul class="navList">
    <li class="navItem">
      <a v-link="{ path: '/' }" class="navLink">Import Report</a>
    </li>
    <li class="navItem">
      <a class="navLink">Audits</a>
      </li>
  </ul>
</nav>
</template>

<script>
export default {
}
</script>

<style>
.navList {
  list-style: none;
  background-color: #444;
  text-align: center;
  padding: 0;
  margin: 0;
}

.navItem {
  width: 160px;
  border-bottom: none;
  height: 50px;
  line-height: 50px;
  font-size: 1.4em;
  display: inline-block;
  margin-right: -4px;
}

.navLink {
  text-decoration: none;
  color: #fff;
  display: block;
  transition: .3s background-color;
}

.navLink:hover {
  background-color: #005f5f;
}

.v-link-active {
  background-color: #fff;
  color: #444;
  cursor: default;
}

</style>
