import {defaultStyles} from '../../constants'
import {toInlineStyles} from '../../core/utils'
import {parse} from '@core/parse'

const CODES = {A: 65, Z: 90}
const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}
function getHeiight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function toCell(state, row) {
  return function(_, col) {
    const id = `${row}:${col}`
    const width = getWidth(state.colState, col)
    const data = state.dataState[id]
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id],
    })
    // const styles = toInlineStyles(defaultStyles)
    console.log('table.template.js: styles', styles)
    // const styles = state.stylesState[id]
    return `
      <div 
        class='cell' 
        contenteditable 
        data-col="${col}" 
        data-type="cell" 
        data-id="${id}"
        data-value="${data || ''}"
        style="${styles}; width: ${width}"
      >${parse(data) || ''}</div>
    `
  }
}

function toCol({col, index, width}) {
  return `
  <div 
    class='column' 
    data-type="resizable" 
    data-col="${index}" 
    style="width: ${width}"
  >
    ${col}
    <div class='col-resize' data-resize="col"></div>
  </div>
  `
}

function createRow(index, content, state) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  const height = getHeiight(state, index)
  return `
  <div class='row' data-type="resizable" data-row="${index}"
    style="height: ${height}" 
  >
    <div class='row-info'>
      ${index ? index : ''} ${resize}
     </div>
    <div class='row-data'>${content}</div>
  </div>`
}

function toChar(_, idx) {
  return String.fromCharCode(CODES.A + idx)
}

function withWidthFrom(state) {
  return function(col, index) {
    return {
      col, index, width: getWidth(state.colState, index),
    }
  }
}
export function createTable(rowsCount = 15, state={}) {
  console.log('state', state)
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toCol)
      .join('')
  rows.push(createRow(null, cols, {}))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(state, row))
        .join('')
    rows.push(createRow(row + 1, cells, state.rowState))
  }
  return rows.join('')
}
