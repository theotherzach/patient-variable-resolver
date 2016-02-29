import Vuex from 'vuex'
import Vue from 'vue'
import sheetKeys from './sheet-keys'

Vue.use(Vuex)

const { PT_ID_KEY } = sheetKeys

const store = new Vuex.Store({
  strict: true,

  state: {
    sheetA: [],

    sheetB: [],
  },

  mutations: {
    LOAD_SHEET_A (state, sheetA) {
      state.sheetA = sheetA.filter(row => row[PT_ID_KEY])
    },

    LOAD_SHEET_B (state, sheetB) {
      state.sheetB = sheetB.filter(row => row[PT_ID_KEY])
    }
  }
})

export default store
