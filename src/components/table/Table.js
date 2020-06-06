import {ExcelComponent} from '@core/ExcelComponent';
import {TableSelection} from './TableSelection'
import {$} from '@core/dom'

import {resizeHandler} from './table.resize';
import {createTable} from './table.template';
import {showResize} from './table.functions';
import {isCell} from './table.functions';
import {matrix} from './table.functions';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown'],
      ...options
    });
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    const $cell = this.$root.find('[data-id="0:0"]')
    this.selection.select($cell)
    this.$on('formula:input', text => {
      this.selection.current.text(text)
    }) 
  }

  toHTML() {
    return createTable(20);
  }

  onMousedown(event) {
    if (showResize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const target = $target.id(true)
        const current = this.selection.current.id(true)

        const $cells = matrix(current, target)
            .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selection.select($target)
      }
    }
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
      this.selection.select($next)
    }
  }
}

function nextSelection(key, {row, col}) {
  const MIN_VALUE = 0
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++
      break;
    case 'ArrowRight':
    case 'Tab':
      col++
      break;
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1
      break;
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1
      break;
    default:
      break;
  }
  return `[data-id="${row}:${col}"]`
}
