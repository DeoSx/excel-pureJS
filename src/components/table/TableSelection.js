export class TableSelection {
  static className = 'selected'

  constructor() {
    this.group = []
    this.current = null
  }

  // $el instanceof Dom === true
  select($el) {
    this.clear()
    this.group.push($el)
    $el.addClass('selected')
    this.current = $el
  }

  selectGroup($group) {
    this.clear()
    this.group = $group
    this.group.forEach($el => {
      $el.addClass(TableSelection.className)
    })
  }

  clear() {
    this.group.forEach($el => {
      $el.removeClass(TableSelection.className)
    })
    this.group = []
  }
}
