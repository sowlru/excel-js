import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom'
import {createTable} from './table.template';
import {resizeHandler} from './table.resize';
import {isCell, shouldResize, matrix, nextSelector}
from '@/components/table/table.functions';
import {TableSelection} from './TableSelection';
import * as actions from '@/redux/actions.js'
import {defaultStyles} from '../../constants';

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    })
  }
  toHTML() {
    console.log(this.store.getState())
    return createTable(20, this.store.getState())
  }
  prepare() {
    this.selection = new TableSelection()
  }
  init() {
    super.init()
    this.selectCell(this.$root.find('[data-id="0:0"'))

    this.$on('formula:input', (text) => {
      console.log('Table.ja:init:on text', text)
      this.selection.current.text(text)
      this.updateTextInStore(text)
    })
    this.$on('formula:done', () => {
      console.log('formula done')
      this.selection.current.focus()
    })
    this.$on('toolbar:applyStyle', (style) => {
      console.log('style', style)
      this.selection.applyStyle(style)
    })
  }
  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
    const styles = $cell.getStyles(Object.keys(defaultStyles))
    this.$dispatch(actions.changeStyles(styles))
    console.log('styles', styles)
  }
  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event)
      this.$dispatch(actions.tableResize(data))
      console.log('Table.js:resizeTable: data', data)
    } catch (e) {
      console.warn('Resize error', e.message)
    }
  }
  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map((id) => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selectCell($target)
      }
    }
  }
  onKeydown(event) {
    const keys = [
      'Enter', 'Tab',
      'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp',
    ]
    const {key} = event
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next)
    }
  }

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value,
    }))
  }

  onInput(event) {
    this.updateTextInStore($(event.target).text())
  }
}
