import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  state: {
    sheetA: [],
    sheetB: [],
  },
  mutations: {
    LOAD_SHEET_A (state, sheetA) {
      state.sheetA = sheetA
    },
    LOAD_SHEET_B (state, sheetB) {
      state.sheetB = sheetB
    }
  }
})

export default store
