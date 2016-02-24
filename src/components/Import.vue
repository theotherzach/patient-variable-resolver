<template>
  <div>
    <label for="auditorAUpload">Auditor A</label>
    <input type="file" v-on:change="handleDrop" id="auditorAUpload">
  </div>
  <div>
    <label for="auditorBUpload">Auditor B</label>
    <input type="file" v-on:change="handleDrop" id="auditorBUpload">
  </div>
</template>

<script>
import XLSX from 'xlsx-browserify-shim'

window.XLSX = XLSX

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
      this.handleDrop(e, 'sheetA')
    },

    handleBUpload: function (e) {
      var files = e.target.files
      this.handleDrop(e, 'sheetB')
    },

    handleDrop: function (e, target) {
      var self = this
      e.stopPropagation()
      e.preventDefault()
      console.log('hi', XLSX, e)
      var files = e.target.files
      var i, f
      for (i = 0, f = files[i]; i !== files.length; ++i) {
        var reader = new FileReader()
        var name = f.name
        reader.onload = function (e) {
          console.log(name + ' loaded')
          var data = e.target.result

          /* if binary string, read with type 'binary' */
          var workbook = XLSX.read(data, {type: 'binary'})
          var sheet = workbook.Sheets['ALL']
          self[target] = XLSX.utils.sheet_to_row_object_array(sheet)
          console.log('read', self[target])

          /* DO SOMETHING WITH workbook HERE */
        }
        reader.readAsBinaryString(f)
      }
    }

  }
}
</script>
