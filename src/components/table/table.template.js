const CODES = {
  A: 65,
  Z: 90,
};

const INITIAL_WIDTH = 120
const INITIAL_HEIGHT = 24

function getWidth(state, index) {
  return (state[index] || INITIAL_WIDTH) + 'px'
}

function getHeight(state, index) {
  return (state[index] || INITIAL_HEIGHT) + 'px'
}

function toCell(state, row) {
  return function(_, col) {
    const width = getWidth(state.colState, col)
    const id = `${row}:${col}`
    const data = state.dataState[id]
    return `
        <div 
          class="cell" 
          contenteditable
          data-type="cell"
          data-col="${col}" 
          data-id="${id}"
          style="width: ${width}"
        >${data || ''}</div>
      `
  }
}

function toColumn({col, index, width}) {
  return `
    <div 
      class="column" 
      data-type="resizable" 
      data-col="${index}" 
      style="width:${width}"
    >
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow(index, content, state) {
  const resize = index
    ? `<div class="row-resize" data-resize="row"></div>`
    : ''
  const height = getHeight(state, index)
  return `
    <div 
      class="row" 
      data-type="resizable" 
      data-row="${index}"
      style="height: ${height}"
    >
      <div class="row-info">
        ${index ? index : ''}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function withWidthFrom(state) {
  return function(col, index) {
    return {
      col, index, width: getWidth(state.colState, index)
    }
  }
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1; // Compute cols count
  const rows = [];

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toColumn)
      .join('');

  rows.push(createRow(null, cols, {}));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(state, row))
        .join('');

    rows.push(createRow(row + 1, cells, state.rowState));
  }

  return rows.join('');
}
