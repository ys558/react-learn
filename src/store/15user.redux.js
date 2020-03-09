// 11.1
const initState = {
  // 已经登录:
  isLogined: false,
  // 登录中:
  loading: false
}

// 11。2
export const user = (state = initState, action) => {
  switch (action.type) {
    case "requestLogin":
      return {
        isLogined: false,
        loading: true
      };
    case "login":
      return {
        isLogined: true,
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