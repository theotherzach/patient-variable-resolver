<template>
<div>
  <div class="container audit__header">
    <h1>{{ audit.patientId }}</h1>

    <h2>
      <div>{{ audit.providerId }}</div>
      <div>{{ audit.auditorB }}</div>
      <div>{{ audit.dateOfVisit }}</div>
    </h2>
    <h3>
      {{ audit.discrepancies }} discrepancies,
      {{ remainingDiscrepancies }} remain
      <span v-if="!remainingDiscrepancies" class="green">&#10004;</span>
    </h3>
    <p>
      <button v-if="nextPtId">
        <a v-link="{ name: 'audit', params: { patientId: nextPtId }}">
          Next
        </a>
      </button>
      <button v-if="!nextPtId">
        <a v-link="{ path: '/audits'}">
          Back
        </a>
      </button>
    </p>
  </div>

  <div class="container">
    <variable-card v-for="variable in problemVariables"
      :variable="variable" :audit="audit">
    </variable-card>
  </div>

</div>
</template>

<script>
import sheetKeys from '../sheet-keys'
const { PT_ID_KEY } = sheetKeys
import VariableCard from './VariableCard.vue'

export default {
  components: {
    VariableCard
  },

  computed: {

    remainingDiscrepancies() {
      return this.audit.discrepancies - this.audit.resolvedDiscrepancies
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
      },

      nextPtId(state) {
        const index = state.audits.indexOf(this.audit)
        let nextPtId = null
        for (let i = index + 1; i < state.audits.length; i++) {
          if (state.audits[i] && !state.audits[i].isReady) {
            nextPtId = state.audits[i].patientId
            break
          }
        }

        if (nextPtId) { return nextPtId }

        for (let i = 0; i < index; i++) {
          if (!state.audits[i].isReady) {
            nextPtId = state.audits[i].patientId
            break
          }
        }

        return nextPtId
      }

    }
  }
}
</script>
<style lang="scss">

</style>
