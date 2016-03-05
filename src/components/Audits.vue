<template>
<div>
  <h1>Audits</h1>

  <table>
    <thead>
      <tr>
        <th>Patient ID</th>
        <th>Auditor B Initials</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="audit in audits">
        <td>{{ audit.patientId }}</td>
        <td>{{ audit.auditorB }}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import store from '../store'
import sheetKeys from '../sheet-keys'
const { PT_ID_KEY, AUDITOR_INITIALS_KEY } = sheetKeys

export default {
  computed: {
    audits() {
      return store.state.sheetB.map(row => {
        return {
          patientId: row[PT_ID_KEY],
          auditorB: row[AUDITOR_INITIALS_KEY],
        }
      })
    }
  }
}
</script>
