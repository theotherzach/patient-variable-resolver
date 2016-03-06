<template>
<div>
  <dl>
    <dt>Provider</dt>
    <dd>{{ audit.providerId }}</dd>
    <dt>Patient</dt>
    <dd>{{ audit.patientId }}</dd>
    <dt>Auditor 2</dt>
    <dd>{{ audit.auditorB }}</dd>
  </dl>
  <p>
  {{ audit.discrepancies }} discrepancies,
  {{ audit.discrepancies - audit.resolvedDiscrepancies }} remain
  </p>

  <div class="container">
    <div v-for="variable in problemVariables"
      class="variableCard">
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
  </div>

</div>
</template>

<script>
import sheetKeys from '../sheet-keys'
const { PT_ID_KEY } = sheetKeys

export default {
  data() {
  },

  methods: {

    resolve(variable, answer) {
    }

  },

  computed: {

    resolutions: {
      get() {
        return this.audit.variables.reduce((memo, variable) => {
          memo[variable.patientId] = {
            name: variable.name,
            patientId: variable.patientId,
            answer: ''
          }
          return memo
        }, {})
      }

    },

    problemVariables() {
      return this.audit.variables.filter(variable => {
        return variable.aAnswer !== variable.bAnswer 
      })
    }
  },

  vuex: {
    state: {
      audit(state) {
        return state.audits.filter(audit => {
            return audit.patientId === this.$route.params.patientId
        })[0]
      }
    }
  }
}
</script>
<style lang="scss">
.container {
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
}

.cell {
  width: 50%;
}

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
