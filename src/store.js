import Vuex from 'vuex'
import Vue from 'vue'
import sheetKeys from './sheet-keys'

Vue.use(Vuex)

const {
  PT_ID_KEY,
  AUDITOR_INITIALS_KEY,
  QUESTION_KEYS,
  DATE_OF_AUDIT_KEY,
  PROVIDER_ID_KEY
} = sheetKeys

function cleanKeys(row) {
  const keyMaps = Object.keys(row).map(key => {
    return {
      originalKey: key,
      cleanedKey: key.trim()
    }
  })

  const cleanedRow = {}
  keyMaps.forEach(keyMap => cleanedRow[keyMap.cleanedKey] = row[keyMap.originalKey])
  return cleanedRow
}

function findRow(sheet, patientId) {
  return sheet.filter(row => row[PT_ID_KEY] === patientId)[0]
}

function makeAudits(sheetB, sheetA) {
  return sheetB
  .filter(row => row[PT_ID_KEY])
  .map(row => {
    const aRow = findRow(sheetA, row[PT_ID_KEY]) || {}
    const variables = QUESTION_KEYS.map(variable => {
      return {
        patientId: row[PT_ID_KEY],
        name: variable,
        aAnswer: aRow[variable],
        bAnswer: row[variable],
        resolution: null,
        auditorB: row[AUDITOR_INITIALS_KEY]
      }
    })

    return {
      auditorB: row[AUDITOR_INITIALS_KEY],
      providerId: row[PROVIDER_ID_KEY],
      patientId: row[PT_ID_KEY],
      get discrepancies () {
        return this.variables
        .filter(variable => variable.aAnswer !== variable.bAnswer)
        .length
      },
      get resolvedDiscrepancies () {
        return this.variables
        .filter(variable => variable.resolution)
        .length
      },
      get isReady () {
        return this.variables
        .filter(variable => {
          return variable.aAnswer !== variable.bAnswer
            || variable.resolution
        })
        .length === 0
      },
      variables: variables
    }
  })
}

const store = new Vuex.Store({
  strict: true,

  state: {
    sheetA: [],
    sheetB: [],
    audits: [],
  },

  mutations: {
    LOAD_SHEET_A (state, sheetA) {
      state.sheetA = sheetA.filter(row => row[PT_ID_KEY]).map(cleanKeys)
      if (state.sheetB[0]) {
        state.audits = makeAudits(state.sheetB, sheetA)
      }
    },

    LOAD_SHEET_B (state, sheetB) {
      state.sheetB = sheetB.filter(row => row[PT_ID_KEY]).map(cleanKeys)
      if (state.sheetA[0]) {
        state.audits = makeAudits(sheetB, state.sheetA)
      }
    }
  }
})

export default store
