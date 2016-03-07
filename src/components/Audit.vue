<template>
<div>
  <div class="container audit__header">
    <h2>
      <div>{{ audit.providerId }}</div>
      <div>{{ audit.patientId }}</div>
      <div>{{ audit.auditorB }}</div>
    </h2>
    <h3>
      {{ audit.discrepancies }} discrepancies,
      {{ remainingDiscrepancies }} remain
      <span v-if="!remainingDiscrepancies" class="green">&#10004;</span>
    </h3>
    <p>
      <button>
        <a v-link="{ name: 'audit', params: { patientId: nextPtId }}">Next</a>
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
        return state.audits.reduce((memo, audit) => {
          switch (memo) {
            case null:
              if (audit.patientId === this.$route.params.patientId) {
                return "next"
              }
              break
            case "next":
              return audit.patientId
            default:
              return memo
          }
        }, null)
      }

    }
  }
}
</script>
<style lang="scss">
.container {
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
}

.audit__header {
  text-align: center;
}

</style>
