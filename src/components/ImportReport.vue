<template>
  <div>
    <h1>Import Report</h1>

    <h2>Summary</h2>
    <ul>
      <li>{{ sheetA.length }} rows imported from Sheet A</li>
      <li>{{ sheetB.length }} rows imported from Sheet B</li>
    </ul>

    <div v-if="sheetADupes.length === 0">
      <h2>No duplicate Patient IDs found in Sheet A</h2>
    </div>
    <div v-if="sheetADupes.length > 0">
      <h2>Sheet A Dupes</h2>
      <ul>
        <li v-for="dupe in sheetADupes" track-by="$index">{{ dupe }}</li>
      </ul>
    </div>
    <div v-if="sheetBDupes.length === 0">
      <h2>No duplicate Patient IDs found in Sheet B</h2>
    </div>
    <div v-if="sheetBDupes.length > 0">
      <h2>Sheet B Dupes</h2>
      <ul>
        <li v-for="dupe in sheetBDupes" track-by="$index">{{ dupe }}</li>
      </ul>
    </div>
    <div v-if="missingSheetAIds.length === 0">
      <h2>Sheet A has all of Sheet B's IDs</h2>
    </div>
    <div v-if="missingSheetAIds.length > 0">
      <h2>{{ missingSheetAIds.length }} IDs missing from Auditor A</h2>
      <ul>
        <li v-for="missingId in missingSheetAIds" track-by="$index">{{ missingId }}</li>
      </ul>
    </div>
    <div v-if="missingSheetBIds.length === 0">
      <h2>Sheet B has all of Sheet A's IDs</h2>
    </div>
    <div v-if="missingSheetBIds.length > 0">
      <h2>{{ missingSheetBIds.length }} IDs found in Sheet A are missing from Sheet B</h2>
      <ul>
        <li v-for="missingId in missingSheetBIds" track-by="$index">{{ missingId }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import store from '../store'
import sheetKeys from '../sheet-keys'
const { PT_ID_KEY } = sheetKeys

export default {
  data() {
    return {
      sheetA: store.state.sheetA,

      sheetB: store.state.sheetB
    }
  },

  methods: {
    duplicateIdsFor(sheet) {
      const allIds = {}
      const patientIds = []
      const dupeIds =  sheet.forEach((row) => {
        const patientId = row[PT_ID_KEY]

        if (allIds[patientId] === undefined) {
          allIds[patientId] = true
          return patientIds
        }

        patientIds.push(patientId)
      })

      return patientIds
    }
  },

  computed: {
    sheetAIds() {
      return store.state.sheetA.map(row => row[PT_ID_KEY])
    },

    sheetBIds() {
      return store.state.sheetB.map(row => row[PT_ID_KEY])
    },
    sheetADupes() {
      return this.duplicateIdsFor(store.state.sheetA)
    },

    sheetBDupes() {
      return this.duplicateIdsFor(store.state.sheetB)
    },

    missingSheetAIds() {
      return this.sheetBIds.filter(id => !this.sheetAIds.find(bId => id === bId))
    },

    missingSheetBIds() {
      return this.sheetAIds.filter(id => !this.sheetBIds.find(bId => id === bId))
    },
  }

}
</script>
