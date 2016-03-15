<template>

<div class="variableCard">
  <div class="title" :class="{ resolved: variable.resolution }">{{ variable.name }}</div>
  <div class="content">
    <table>
      <tr>
        <th @click="resolution = variable.aAnswer"
          class="answerCell">
          Auditor 1<br />
          {{ variable.aAnswer }}
          <span v-if="resolution === variable.aAnswer" class="green">&#10004;</span>
        </th>
        <th @click="resolution = variable.bAnswer"
          class="answerCell">
          {{ audit.auditorB }}<br />
          {{ variable.bAnswer }}
          <span v-if="resolution === variable.bAnswer" class="green">&#10004;</span>

        </th>
      </tr>
      <tr>
        <td colspan="2"><input v-model="resolution"></td>
      </tr>
      <tr v-if="resolution">
        <td colspan="2">
          <div v-if="globalResolve.resolution !== resolution">
            <strong>Danger Zone!</strong><br>
            <div v-if="!saftey">
              Clicking again will set the same this variable to {{ resolution }} for all patients.
            </div>
            <button v-if="saftey" @click="saftey = false">
              Resolve All
            </button>
            <button v-if="!saftey" @click="resolveAll">Resolve All</button>
          </div>

          <div v-if="globalResolve.resolution === resolution">
            This variable has been resolved for all patients.
            <span class="green">&#10004;</span>
          </div>
        </td>
      </tr>
    </table>
  </div>
</div>
</template>

<script>
  export default {
    props: ['variable', 'audit'],

    data() {
      return {
        saftey: true,
      }
    },

    computed: {
      resolution: {
        get() {
          return this.variable.resolution
        },

        set(newVal) {
          this.resolve(newVal)
        },
      },

      globalResolve() {
        return this.globalResolves
        .filter(resolve => {
          console.log('globalResolve: ', resolve.variableName, this.variable.name);
          return resolve.variableName === this.variable.name
        })[0] || {}
      }
    },

    methods: {
      resolve() {
      }
    },

    vuex: {
      getters: {
        globalResolves(state) {
          console.log('state: ', state)
          return state.globalResolves
        },
      },

      actions: {
        resolveAll({ dispatch }) {
          dispatch('RESOLVE_ALL', this.variable, this.resolution)
        },

        resolve({ dispatch }, resolution) {
          dispatch('RESOLVE', this.variable, resolution)
        }
      }
    }
  }
</script>

<style lang="scss">
.variableCard {
  display: inline-block;
  vertical-align: top;
  width: 200px;
  margin-right: 20px;
  margin-bottom: 20px;
  border: 1px solid #ddd;

  .title {
    padding: 8px;
    background: #42b983;
    font-weight: 600;
    color: #fff;

  }
  .title.resolved {
    color: #2c3e50;
    background: #fff;
  }

  .content {
  }

  input, button {
    text-align: center;
  }

  button {
    display: inline;
  }

  input {
    width: 66px;
    height: 50px;
  }

  table, caption, tbody, tfoot, thead, tr, th, td {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  th {
    font-weight: 600;
  }

  th, td {
    width: 100px;
    height: 66px;
    text-align: center;
    vertical-align: middle;
    border: 1px solid #ddd;
  }

  .answerCell {
    cursor: pointer;
  }
}
</style>

