// 13 state reducer
const counterReducer = (state=0, action) =>{
    const num = action.payload || 1;
    switch (action.type) {
        case 'plus':
            return state + num
        case 'minus':
            return state - num
        default:
            return state
    }
}

// 13 action creator
export const plus = (num) => ({type: 'plus', payload: num})
export const minus = (num) => ({type: 'minus', payload:num})
export const syncPlus = (num) => dispatch => {
    setTimeout(()=>{
        dispatch({type: 'plus', payload: num})
    },900)
}
export default counterReducer