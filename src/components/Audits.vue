<template>
<div class="audits">
  <div class="container audit__header">
    <h1>Audits</h1>

    <h3>
      {{ discrepancies }} discrepancies,
      {{ remainingDiscrepancies }} remain
      <span v-if="!remainingDiscrepancies" class="green">&#10004;</span>
    </h3>
    <div>
      <button @click="exportCsv(audits)">Export</button>
    </div>
  </div>

  <div class="container">
    <input class="filter" placeholder="Filter" type="text" v-model="filter">

    <table>
      <thead>
        <tr>
          <th @click="sortBy('auditorB')" :class="{active: sortKey == 'auditorB'}"> B Auditor <span class="arrow" :class="sortOrders['auditorB'] > 0 ? 'asc' : 'dsc'"></th>
          <th @click="sortBy('providerId')" :class="{active: sortKey == 'providerId'}"> Provider <span class="arrow" :class="sortOrders['providerId'] > 0 ? 'asc' : 'dsc'"></th>
          <th @click="sortBy('patientId')" :class="{active: sortKey == 'patientId'}"> Patient ID <span class="arrow" :class="sortOrders['patientId'] > 0 ? 'asc' : 'dsc'"></th>
          <th @click="sortBy('discrepancies')" :class="{active: sortKey == 'discrepancies'}"> Discrepancies <span class="arrow" :class="sortOrders['discrepancies'] > 0 ? 'asc' : 'dsc'"></th>
          <th @click="sortBy('resolvedDiscrepancies')" :class="{active: sortKey == 'resolvedDiscrepancies'}"> Resolved <span class="arrow" :class="sortOrders['resolvedDiscrepancies'] > 0 ? 'asc' : 'dsc'"></th>
          <th @click="sortBy('isReady')" :class="{active: sortKey == 'isReady'}"> Ready? <span class="arrow" :class="sortOrders['isReady'] > 0 ? 'asc' : 'dsc'"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="audit in audits
          | filterBy filter
          | orderBy sortKey sortOrders[sortKey]"
          @click="$router.go({name: 'audit', params: { patientId: audit.patientId }})">
          <td>{{ audit.auditorB }}</td>
          <td>{{ audit.providerId }}</td>
          <td>{{ audit.patientId }}</td>
          <td>{{ audit.discrepancies }}</td>
          <td>{{ audit.resolvedDiscrepancies }}</td>
          <td>{{ audit.isReady }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
import sheetKeys from '../sheet-keys'
import exportCsv from '../export-csv'

const {
  PT_ID_KEY,
  AUDITOR_INITIALS_KEY,
  DATE_OF_AUDIT_KEY,
  PROVIDER_ID_KEY
} = sheetKeys

export default {

  data() {
    const sortOrders = {}
    const keys = Object.keys(this.audits[0])
    keys.forEach(key =>  sortOrders[key] = 1)

    return {
      filter: '',
      sortKey: '',
      sortOrders: sortOrders,
      audits: this.audits
    }
  },

  methods: {

    exportCsv,

    sortBy(key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    }
  },

  computed: {

    discrepancies() {
      return this.audits
      .reduce((memo, audit) => memo += audit.discrepancies, 0)
    },

    remainingDiscrepancies() {
      return this.audits
      .reduce((memo, audit) => {
        let resolvedDiscrepancies = 0
        if (!isNaN(audit.resolvedDiscrepancies)) {
          resolvedDiscrepancies = audit.resolvedDiscrepancies
        }

        const remainingDiscrepancies = audit.discrepancies - audit.resolvedDiscrepancies
        return memo += remainingDiscrepancies
      }, 0)
    },
  },

  vuex: {
    getters: {
      audits(state) {
        return state.audits
      }
    }
  }
}
</script>
<style lang="scss">
.audits {

  table {
    border: 2px solid #42b983;
    border-radius: 3px;
    background-color: #fff;
  }

  th {
    background-color: #42b983;
    color: rgba(255,255,255,0.66);
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -user-select: none;
  }

  td {
    background-color: #f9f9f9;
  }

  th, td {
    min-width: 120px;
    padding: 10px 20px;
  }

  th.active {
    color: #fff;
  }

  th.active .arrow {
    opacity: 1;
  }

  tr {
    cursor: pointer;
  }

  .arrow {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    margin-left: 5px;
    opacity: 0.66;
  }

  .arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #fff;
  }

  .arrow.dsc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #fff;
  }

  .filter {
    margin-bottom: 10px;
  }
}

</style>
