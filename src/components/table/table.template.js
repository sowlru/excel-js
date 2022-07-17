const CODES = {A: 65, Z: 90}

function toChar(_, idx) {
  return String.fromCharCode(CODES.A + idx)
}
function toCol(col) {
  return `<div class='column'>${col}</div>`
}
function toCell() {
  return `<div class='cell' contenteditable></div>`
}
function createRow(index, content) {
  return `
  <div class='row'>
    <div class='row-info'>${index ? index : ''}</div>
    <div class='row-data'>${content}</div>
  </div>`
}
export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const header = new Array(colsCount).fill('').map(toChar).map(toCol).join('')
  rows.push(createRow(null, header))

  for (let i=0; i < rowsCount; i++) {
    const cells = new Array(colsCount).fill('').map(toCell).join('')
    rows.push(createRow(i + 1, cells))
  }
  return rows.join('')
}
