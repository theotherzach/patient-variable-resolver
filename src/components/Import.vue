<template>
  <div>
  <p>
    <label for="auditorAUpload">Auditor A</label>
    <input type="file" v-on:change="handleAUpload" id="auditorAUpload">
  </p>
  <p>
    <label for="auditorBUpload">Auditor B</label>
    <input type="file" v-on:change="handleBUpload" id="auditorBUpload">
  </p>
  </div>
</template>

<script>
import XLSX from 'xlsx-browserify-shim'
import store from '../store'

export default {

  data () {
    return {
      sheetA: {},
      sheetB: {}
    }
  },

  methods: {

    handleAUpload: function (e) {
      var files = e.target.files
      this.handleDrop(e, 'LOAD_SHEET_A')
    },

    handleBUpload: function (e) {
      var files = e.target.files
      this.handleDrop(e, 'LOAD_SHEET_B')
    },

    handleDrop: function (e, eventName) {
      var self = this
      e.stopPropagation()
      e.preventDefault()
      var files = e.target.files
      var i, f
      for (i = 0, f = files[i]; i !== files.length; ++i) {
        var reader = new FileReader()
        var name = f.name
        reader.onload = function (e) {
          var data = e.target.result

          /* if binary string, read with type 'binary' */
          var workbook = XLSX.read(data, {type: 'binary'})
          var sheet = workbook.Sheets['ALL']
          store.dispatch(eventName, XLSX.utils.sheet_to_row_object_array(sheet))

          /* DO SOMETHING WITH workbook HERE */
        }
        reader.readAsBinaryString(f)
      }
    }

  }
}
</script>
