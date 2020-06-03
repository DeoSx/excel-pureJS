import { range } from '@core/utils'

export function showResize(event) {
  return event.target.dataset.resize;
}

export function isCell(event) {
  return event.target.dataset.type === 'cell'
}

export function matrix(current, target) {
  const cols = range(current.col, target.col)
  const rows = range(current.row, target.row)

  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`))
    return acc
  }, [])
}
