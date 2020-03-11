
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
    return new Promise((resolve, reject)=> 
      setTimeout(()=> uname === 'a'? 
        resolve({id:1, name: 'a', age:10}) : reject('用户名或密码错误')
      , 1000)
    )
  }
}

// worker Saga：
function* login(action){
  try{
    yield put({type: 'requestLogin'})
    // call调用定义好的UserService和action:
    const result = yield call(UserService.login, action.uname)
    yield put({type: 'loginSuccess', result})
  }catch (message){
    // 捕获上面的reject("用户名或密码错误");内容
    yield put({type: 'loginFailure', message})
  }
}


// 拿到上面的resolve({ id: 1, name: "Jerry", age: 20 })里的对象

// watch Saga
function* mySaga () {
  yield takeEvery('login', login)
}
 
export default mySaga;