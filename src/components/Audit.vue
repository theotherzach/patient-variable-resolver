<template>
<div>
  <dl>
    <dt>Provider</dt>
    <dd>{{ audit.providerId }}</dd>
    <dt>Patient</dt>
    <dd>{{ audit.patientId }}</dd>
    <dt>Auditor 2</dt>
    <dd>{{ audit.auditorB }}</dd>
  </dl>
  <p>
  {{ audit.discrepancies }} discrepancies,
  {{ audit.discrepancies - audit.resolvedDiscrepancies }} remain
  </p>

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

</style>
