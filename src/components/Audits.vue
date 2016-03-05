<template>
<div>
  <h1>Audits</h1>

  <input class="filter" placeholder="Filter" type="text" v-model="filter">

  <table>
    <thead>
      <tr>
        <th @click="sortBy('auditorB')" :class="{active: sortKey == 'auditorB'}"> B Auditor <span class="arrow" :class="sortOrders['auditorB'] > 0 ? 'asc' : 'dsc'"></th>
        <th @click="sortBy('providerId')" :class="{active: sortKey == 'providerId'}"> Provider <span class="arrow" :class="sortOrders['providerId'] > 0 ? 'asc' : 'dsc'"></th>
        <th @click="sortBy('patientId')" :class="{active: sortKey == 'patientId'}"> Patient ID <span class="arrow" :class="sortOrders['patientId'] > 0 ? 'asc' : 'dsc'"></th>
        <th @click="sortBy('discrepancies')" :class="{active: sortKey == 'discrepancies'}"> Discrepancies <span class="arrow" :class="sortOrders['discrepancies'] > 0 ? 'asc' : 'dsc'"></th>
        <th @click="sortBy('resolvedDiscrepancies')" :class="{active: sortKey == 'resolvedDiscrepancies'}"> Resolved Discrepancies <span class="arrow" :class="sortOrders['resolvedDiscrepancies'] > 0 ? 'asc' : 'dsc'"></th>
        <th @click="sortBy('isReady')" :class="{active: sortKey == 'isReady'}"> Ready? <span class="arrow" :class="sortOrders['isReady'] > 0 ? 'asc' : 'dsc'"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="audit in audits
        | filterBy filter
        | orderBy sortKey sortOrders[sortKey]">
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
</template>

<script>
import store from '../store'
import sheetKeys from '../sheet-keys'
const {
  PT_ID_KEY,
  AUDITOR_INITIALS_KEY,
  DATE_OF_AUDIT_KEY,
  PROVIDER_ID_KEY
} = sheetKeys

export default {

  data() {
    const sortOrders = {}
    const keys = 'auditorB providerId patientId discrepancies resolvedDiscrepancies isReady'.split(' ')
    keys.forEach(key =>  sortOrders[key] = 1)

    return {
      filter: '',
      sortKey: '',
      sortOrders: sortOrders
    }
  },

  methods: {

    sortBy(key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    }
  },

  computed: {

    audits() {
      return store.state.sheetB.map(row => {
        return {
          auditorB: row[AUDITOR_INITIALS_KEY],
          providerId: row[PROVIDER_ID_KEY],
          patientId: row[PT_ID_KEY],
          discrepancies: 'TBD',
          resolvedDiscrepancies: 'TBD',
          isReady: false
        }
      })
    }

  }
}
</script>
<style lang="scss">

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

</style>
