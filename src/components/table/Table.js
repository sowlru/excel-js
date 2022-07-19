import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root) {
    super($root, {
      listeners: ['click', 'mousedown', 'mousemove', 'mouseup'],
    })
  }
  toHTML() {
    return createTable()
  }
  onClick() {
    console.log('click')
  }
  onMousedown(event) {
    console.log('mouse down', event.target)
  }
  onMousemove() {
    console.log('mouse move')
  }
  onMouseup() {
    console.log('mouse up')
  }
}

// return
// `
//   <div class="row">
//     <div class="row-info"></div>
//     <div class="row-data">
//       <div class="column">A</div>
//       <div class="column">B</div>
//       <div class="column">C</div>
//     </div>
//   </div>
//   <div class="row">
//     <div class="row-info">1</div>
//     <div class="row-data">
//       <div class="cell selected" contenteditable>A1</div>
//       <div class="cell" contenteditable>B1</div>
//       <div class="cell" contenteditable>C1</div>
//     </div>
//   </div>
//   <div class="row">
//     <div class="row-info">2</div>
//     <div class="row-data">
//       <div class="cell" contenteditable>A2</div>
//       <div class="cell" contenteditable>B2</div>
//       <div class="cell" contenteditable>C2</div>
//     </div>
//   </div>
// `
