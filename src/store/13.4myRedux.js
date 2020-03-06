/**
 * 1. 自行撸redux源码的核心api
 * 存储状态state
 * 获取状态getState
 * 更新状态dispatch, 类似于setState
 * 变更订阅subscribe
 * 
 * 2. 实现中间件: enhancer
 * 原理: 实现dispatch的升级,使得接收一个函数变成高阶函数
 */

// 01. 这里的reducer相当于src\store\02store.js里的counterReducer函数
// 02. 中间件enhancer, 
export const createStore = (reducer, enhancer) => {

  // 02. 递归调用createStore传给enhancer:
  if(enhancer) {
    // 02. 从这里返回的可以看出, enhancer为高阶函数, 传入reducer让createStore变强, 
    return enhancer(createStore)(reducer)
  }

  let currentState = undefined
  const currentListeners = [] //供给subscribe订阅, 使用的回调函数数组
  
  const getState = () => currentState
  
  const subscribe = (cb) => currentListeners.push(cb)

  const dispatch = (action) => {
    // 分别接收state和action, 修改currentState
    currentState = reducer(currentState, action)
    // 订阅: 执行currentListeners数组里的所有函数
    currentListeners.forEach(cb=>cb())
  }

  // 初始化状态:
  dispatch({type:'@type/YYredux'})

  // 创建store的实例闭包: 暴露出api:
  return { getState, subscribe, dispatch, applyMiddleware }
}

export const applyMiddleware = (...middleware) => {
  // createStore为上面的return enhancer(createStore)(reducer)里面的createStore,
  // 其本身须接收若干参数, ...args, 包括reducer
  return createStore => (...args) => {
    // console.log(args)
    // [ƒ]
      // 0: (state = 0, action) => {…}
      // length: 1

    // 先完成createStore的工作:
    const store = createStore(...args)
    // 原来的dispatch:
    let dispatch = store.dispatch
    // 传递给中间件函数的参数:
    const mwApi = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    const chain = middleware.map(mw => mw(mwApi))
    // console.log(middleware)
    // [ƒ, ƒ]
      // 0: ({ dispatch, getState }) => {…}
      // 1: ({ dispatch, getState }) => {…}
      // length: 2

    // 强化dispatch,让他按顺序执行中间件函数:
    // 函数复合: 将数组里的所有函数变成一个函数执行:
    dispatch = compose(...chain)(store.dispatch)
    // 返回全新的store和强化过的dispatch
    return { ...store, dispatch }
  }
}

export const compose = (...fncs) => {
  if(fncs.length === 0) return arg => arg
  if(fncs.length === 1) return fncs[0]

  // 如依次执行:fn1, fn2, fn3, 则将其变为:
  // [fn1, fn2, fn3] -> fn3(fn2(fn1()))
  // 即类似koa的洋葱模型:
  return fncs.reduce((left, right)=>(...args)=> right(left(...args)))
}

// 原始写法,函数嵌套:
// export function logger ({dispatch, getState}) {
//   return function dispatch(){
//     return function action(action) {
//       console.log(`${action.type}执行了`)
//       return dispatch(action)
//     }
//   }
// }

// es6 箭头函数写法:
// 这里的logger相当于上面的mw => mw(mwApi)的mw,
// {dispatch, getState}相当于mwApi
export const logger = ({dispatch, getState}) => 
  // 返回真正的中间件任务执行函数
    dispatch => action => {
    // 执行中间件任务
    if (typeof action === 'function') {
      console.log(`action为: ${action}`)
    }else{
      console.log(`${action.type}执行了`)
    }
    // 执行下一个中间件:
    return dispatch(action)
  }

// export function thunk ({dispatch, getState}) {
//   return function dispatch(){
//     return function action(){
//       if(typeof action === 'function') action(dispatch, getState)
//       return dispatch(action)
//     }
//   }
// }

export const thunk = ({dispatch, getState}) => dispatch => action => {
  // 如果action为函数, 则执行action: 
  if (typeof action === 'function') action(dispatch, getState)
  return dispatch(action)
}
