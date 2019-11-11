//  13.2 新建'src/store/count.redux.js', 将counterReducer写入并exports导出 
export const counterReducer = (state = 0, action) => {
    switch(action.type) {
        case 'plus':
            return state + 1
        case 'minus':
            return state - 1
        default:
            return state
    }
}

// 13.3 剥离action creator
// action creator
export const plus = () => ({type: 'plus'})
export const minus = () => ({type: 'minus'})
export const asyncAdd = () => dispatch => {
    setTimeout(()=>{dispatch({type:'plus'}, 1000)})
}