// 14.1
const counterReducer = (state=0, action) =>{
    switch (action.type) {
        case 'plus':
            return state +1
        case 'minus':
            return state -1
        default:
            return state
    }
}

// 14.2 action creator
export const plus = () => ({type: 'plus'})
export const minus = () => ({type: 'minus'})
export const asyncPlus = () => dispatch => {
    setTimeout(()=>{
        dispatch({type: 'plus'})
    },900)
}
export default counterReducer