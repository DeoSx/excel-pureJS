import {ExcelComponent} from '@core/ExcelComponent'
import {TableSelection} from './TableSelection'
import {$} from '@core/dom'

import {resizeHandler} from './table.resize'
import {createTable} from './table.template'
import {showResize} from './table.functions'
import {isCell} from './table.functions'
import {matrix} from './table.functions'
import {nextSelection} from './table.functions'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    this.cellSelect(this.$root.find('[data-id="0:0"]'))

    this.$on('formula:input', text => {
      this.selection.current.text(text)
    })
    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
    this.$subscribe(state => {
      console.log('tableState', state)
    })
  }

  toHTML() {
    return createTable(20);
  }

  cellSelect($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event)
      this.$dispatch({type: 'TABLE_RESIZE', data})
    } catch (e) {
      console.warn('Resize error', e.message)
    }
  }

  onMousedown(event) {
    if (showResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const target = $target.id(true)
        const current = this.selection.current.id(true)

        const $cells = matrix(current, target)
            .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.cellSelect($target)
      }
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target))
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
      'Tab'
    ]

    const { key } = event

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelection(key, id))
      this.cellSelect($next)
    }
  }
}
