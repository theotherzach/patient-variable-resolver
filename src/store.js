import Vuex from 'vuex'
import Vue from 'vue'
import sheetKeys from './sheet-keys'

Vue.use(Vuex)

const { PT_ID_KEY, QUESTION_KEYS } = sheetKeys


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

const store = new Vuex.Store({
  strict: true,

  state: {
    sheetA: [],

    sheetB: [],
  },

  mutations: {
    LOAD_SHEET_A (state, sheetA) {
      state.sheetA = sheetA.filter(row => row[PT_ID_KEY]).map(cleanKeys)
    },

    LOAD_SHEET_B (state, sheetB) {
      state.sheetB = sheetB.filter(row => row[PT_ID_KEY]).map(cleanKeys)
    }
  }
})

export default store
