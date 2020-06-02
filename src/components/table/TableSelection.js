export class TableSelection {
    constructor() {
      this.group = []
    }

    // $el instanceof Dom === true
    select($el) {
      this.group.push($el)
    }

    selectGroup() {}
}
