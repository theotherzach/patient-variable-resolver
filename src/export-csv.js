'use strict'

import sheetKeys from './sheet-keys'

export default function (audits) {
  var rows = audits.map(prepRow)
  rows.unshift(prepHeader())
  exportToCsv('output.csv', rows)
}

function prepRow(audit) {
  var row = [audit.providerId, audit.patientId, audit.dateOfVisit]

  audit.variables.forEach((variable) => {
    row.push(variable.resolution || variable.aAnswer || variable.bAnswer || '')
  })

  return row
}

function prepHeader() {
  var headerRow = [
    sheetKeys.PROVIDER_ID_KEY,
    sheetKeys.PT_ID_KEY,
    sheetKeys.DATE_OF_VISIT_KEY
  ]

  sheetKeys.QUESTION_KEYS.forEach((key) => headerRow.push(key.replace(',', '')))

  return headerRow
}

//stolen from http://stackoverflow.com/a/24922761
function exportToCsv(filename, rows) {
  var processRow = function (row) {
    var finalVal = '';
    for (var j = 0; j < row.length; j++) {
      var innerValue = row[j] === null ? '' : row[j].toString();
      if (row[j] instanceof Date) {
        innerValue = row[j].toLocaleString();
      };
      var result = innerValue.replace(/"/g, '""');
      if (result.search(/("|,|\n)/g) >= 0)
        result = '"' + result + '"';
      if (j > 0)
        finalVal += ',';
      finalVal += result;
    }
    return finalVal + '\n';
  };

  var csvFile = '';
  for (var i = 0; i < rows.length; i++) {
    csvFile += processRow(rows[i]);
  }

  var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
  if (navigator.msSaveBlob) { // IE 10+
    navigator.msSaveBlob(blob, filename);
  } else {
    var link = document.createElement("a");
    if (link.download !== undefined) { // feature detection
      // Browsers that support HTML5 download attribute
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
