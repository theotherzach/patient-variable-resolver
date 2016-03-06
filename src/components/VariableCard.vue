<template>
<div class="variableCard">
  <div class="title">{{ variable.name }}</div>
  <div class="content">
    <table>
      <tr>
        <th>A1</th>
        <th>{{ audit.auditorB }}</th>
      </tr>
      <tr>
        <td>{{ variable.aAnswer }}</td>
        <td>{{ variable.bAnswer }}</td>
      </tr>
      <tr>
        <td colspan="2"><input v-model="resolution"></td>
      </tr>
      <tr>
        <td colspan="2"><button>Resolve</button></td>
      </tr>
    </table>
  </div>
</div>
</template>

<script>
  export default {
    props: ['variable', 'audit']
  }
</script>

<style lang="scss">
.variableCard {
  display: inline-block;
  vertical-align: top;
  width: 200px;
  margin-right: 20px;
  margin-bottom: 20px;
  border: 1px solid #ddd;

  .title {
    padding: 8px;
    background: #42b983;
    font-weight: 600;
    color: #fff;
  }

  .content {
  }

  input, button {
    width: 66px;
    height: 50px;
  }

  table, caption, tbody, tfoot, thead, tr, th, td {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  th {
    font-weight: 600;
  }

  th, td {
    width: 100px;
    height: 66px;
    text-align: center;
    vertical-align: middle;
    border: 1px solid #ddd;
  }
}
</style>

