const CODES = {A: 65, Z: 90}

function toChar(_, idx) {
  return String.fromCharCode(CODES.A + idx)
}
function toCol(col, index) {
  return `
  <div class='column' data-type="resizable" data-col="${index}">
    ${col}
    <div class='col-resize' data-resize="col"></div>
  </div>
  `
}
function toCell(row) {
  return function(_, col) {
    return `
      <div 
        class='cell' 
        contenteditable 
        data-col="${col}" 
        data-type="cell" 
        data-id="${row}:${col}"
      ></div>
    `
  }
}
function createRow(index, content) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
  <div class='row' data-type="resizable">
    <div class='row-info'>
      ${index ? index : ''} ${resize}
     </div>
    <div class='row-data'>${content}</div>
  </div>`
}
export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const header = new Array(colsCount).fill('').map(toChar).map(toCol).join('')
  rows.push(createRow(null, header))

  for (let row=0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        // .map((_, col) => toCell(row, col))
        .map(toCell(row))
        .join('')
    rows.push(createRow(row + 1, cells))
  }
  return rows.join('')
}

