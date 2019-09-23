export const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    case 'COMPLETE_TODO':
      return  state.map(todo => {
        if (action.payload.id === todo.id) {
          return {
            ...todo,
            completed: !action.payload.completed
          }          
        } else {        
          return todo
        }
      })
    case 'CLEAR_COMPLETE':
      return state.filter(todo => todo.completed !== true);
    default:
      return state;
  }
};
