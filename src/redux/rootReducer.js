export function rootReducer(state, action) {
  let field
  switch (action.type) {
    case 'TABLE_RESIZE':
      field = action.data.type === 'col' ? 'colState' : 'rowState'
      const prevState = state[field] || {}
      prevState[action.data.id] = action.data.value
      console.log(action)
      return {...state, [field]: prevState}
  
    default: return state
  }  
}
