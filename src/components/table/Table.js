import {ExcelComponent} from '@core/ExcelComponent';
import {TableSelection} from './TableSelection'
import {$} from '@core/dom'

import {resizeHandler} from './table.resize';
import {createTable} from './table.template';
import {showResize} from './table.functions';
import {isCell} from './table.functions';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    });
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    const $cell = this.$root.find('[data-id="0:0"]')
    this.selection.select($cell)
  }

  toHTML() {
    return createTable(20);
  }

  onMousedown(event) {
    if (showResize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target)
      this.selection.select($target)
    }
  }
}
