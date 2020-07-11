
/**
 * 1. 创建src\store\index2.js
 *  1.1 
 *  1.2 中间件运行saga
 */
// put({ type: xxx })类似于dispatch()
// call(reduxModuleName, params)用于调用异步函数
// takeEvery(), 相当于全局监听器
import { call, put, takeEvery } from "redux-saga/effects";

// 模拟登陆：
const UserService = {
  login(uname) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (uname === "Jerry") {
            resolve({ id: 1, name: "Jerry", age: 20 });
          } else {
            reject("用户名或密码错误");
          }
        }, 1000);
      });
  }
};

// worker Saga，调用处：
function * login(action) {
  try {
    yield put({ type: "requestLogin" });
    const result = yield call(UserService.login, action.uname);
    // call调用定义好的UserService和redux的动作
    yield put({ type: "loginSuccess", result });
    // 拿到上面的resolve({ id: 1, name: "Jerry", age: 20 })里的对象
  } catch (message) {
    yield put({ type: "loginFailure", message });
    // 捕获上面的reject("用户名或密码错误");内容
  }
}

// watcher saga:
function* mySagaListener() {
  // 指定监听的action类型:
  yield takeEvery("login", login);
}

export default mySagaListener;