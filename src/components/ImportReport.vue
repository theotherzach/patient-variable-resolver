<template>
  <div>
    <h1>Import Report</h1>

    <h2>Summary</h2>
    <ul>
      <li>{{ sheetAIds.length }} rows imported from Sheet A</li>
      <li>{{ sheetBIds.length }} rows imported from Sheet B</li>
    </ul>

    <h2>Details</h2>

    <div v-if="sheetADupes.length === 0">
      <div>No duplicate Patient IDs found in Sheet A</div>
    </div>
    <div v-if="sheetADupes.length > 0">
      <div>Sheet A Dupes</div>
      <ul>
        <li v-for="dupe in sheetADupes" track-by="$index">{{ dupe }}</li>
      </ul>
    </div>

    <div v-if="sheetBDupes.length === 0">
      <div>No duplicate Patient IDs found in Sheet B</div>
    </div>
    <div v-if="sheetBDupes.length > 0">
      <div>Sheet B Dupes</div>
      <ul>
        <li v-for="dupe in sheetBDupes" track-by="$index">{{ dupe }}</li>
      </ul>
    </div>

    <div v-if="missingSheetAIds.length === 0">
      <div>Sheet A has all of Sheet B's IDs</div>
    </div>
    <div v-if="missingSheetAIds.length > 0">
      <div>{{ missingSheetAIds.length }} IDs missing from Auditor A</div>
      <ul>
        <li v-for="missingId in missingSheetAIds" track-by="$index">{{ missingId }}</li>
      </ul>
    </div>

    <div v-if="missingSheetBIds.length === 0">
      <div>Sheet B has all of Sheet A's IDs</div>
    </div>
    <div v-if="missingSheetBIds.length > 0">
      <div>{{ missingSheetBIds.length }} IDs found in Sheet A are missing from Sheet B</div>
      <button v-on:click="displayMissingBDetails = !displayMissingBDetails">
        Show {{ displayMissingBDetails ? 'Less' : 'More' }}
      </button>
      <ul v-if="displayMissingBDetails">
        <li v-for="missingId in missingSheetBIds" track-by="$index">{{ missingId }}</li>
      </ul>
    </div>

    <div v-if="emptySheetAVariables.length === 0">
      <div>Sheet A has no empty variables</div>
    </div>
    <div v-if="emptySheetAVariables.length > 0">
      <div>
        Sheet A has {{ emptySheetAVariables.length }} rows with a patient ID and at least 1 missing variable
      </div>
      <ul>
        <li v-for="data in emptySheetAVariables">
          {{ data.id }}
          <span v-for="emptyVariable in data.emptyVariables">
            {{ emptyVariable }}
          </span>
        </li>
      </ul>
    </div>

    <div v-if="emptySheetBVariables.length === 0">
      <div>Sheet A has no empty variables</div>
    </div>
    <div v-if="emptySheetBVariables.length > 0">
      <div>
        Sheet A has {{ emptySheetBVariables.length }} rows with a patient ID and at least 1 missing variable
      </div>
      <ul>
        <li v-for="data in emptySheetBVariables">
          {{ data.id }}
          <span v-for="emptyVariable in data.emptyVariables">
            {{ emptyVariable }}
          </span>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import store from '../store'
import sheetKeys from '../sheet-keys'
const { PT_ID_KEY, QUESTION_KEYS } = sheetKeys
window.store = store

export default {
  data() {
    return {
      displayMissingBDetails: false,
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
    },

    emptyVariables(row) {
      return QUESTION_KEYS.filter(key => !row[key])
    },

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

    emptySheetAVariables() {
      return store.state.sheetA
      .map(row => {
        const emptyVariables = this.emptyVariables(row)
        return {
          id: row[PT_ID_KEY],
          emptyVariables: emptyVariables
        }
      })
      .filter(data => data.emptyVariables.length > 0)
    },

    emptySheetBVariables() {
      return store.state.sheetB
      .map(row => {
        const emptyVariables = this.emptyVariables(row)
        return {
          id: row[PT_ID_KEY],
          emptyVariables: emptyVariables
        }
      })
      .filter(data => data.emptyVariables.length > 0)
    },
  }

}
</script>
