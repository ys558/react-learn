// 11.1
const initialState = {
  isLogin: false,
  loading: false
}

// 11。2
export const user = (state = initialState, action) => {
  switch (action.type) {
    case "requestLogin":
      return {
        isLogin: false,
        loading: true
      };
    case "login":
      return {
        isLogin: true,
        loading: false
      };
    default:
      return state;
  }
};

// 11.3 action creator
export const login = () => dispatch => {
  // 请求登录：标识正在登录中，等待结果
  dispatch({ type: 'requestLogin' });
  setTimeout(()=>{
    // 异步请求回来后，请求回的login结果
    dispatch({ type: 'login' });
  }, 2000)
}