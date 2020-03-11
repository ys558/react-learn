export const user = (state ={ isLogin: false, loading: false, error: ''}, action) => {
  switch (action.type){
    case 'requestLogin':
      return {isLogin: false, loading: true, error: ''}
    case 'loginSuccess':
      return {isLogin:true, loading: false, error: ''}
    case 'loginFailure':
      return {isLogin: false, loading: false, error: action.message}
    default:
      return state;
  }
}

// export const login = () => dispatch => {
//   dispatch({ type: 'requestLogin' });
//   setTimeout(()=>{
//     dispatch({ type: 'login' });
//   }, 2000)
// }

// 改写后：login函数里不再需要返回dispatch, 
//直接返回另一个type为login类型给16SagaReducer.js里的takeEvery监听器即可
export const login = (uname) => ({type:'login',uname})