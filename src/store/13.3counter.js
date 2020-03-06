// action:
export const plus = num => ({ type: "PLUS", payload: num });
export const minus = num => ({ type: "MINUS", payload: num });
export const syncPlus = () => dispatch => setTimeout(()=> dispatch({type: 'PLUS'}), 1000);

// reducer:
export const counterReducer = (state=0, action) => {
  const num = action.payload || 1
  switch (action.type){
    case 'PLUS':
      return state + num
    case 'MINUS':
      return state - num
    default:
      return state
  }
}