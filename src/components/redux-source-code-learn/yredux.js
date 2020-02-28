export const createStore = (reducer, enhancer) => {
  if (enhancer) {
    // 用enhancer()函数把自身createStore变强, 把第一个参数reducer传进去执行:
    return enhancer(createStore)(reducer)
  }
  let currentState = undefined;
  const currentListeners = []; // 回调函数数组

  const getState = () => currentState
  // 更改状态:
  const dispatch = (action) => {
    // 修改:
    currentState = reducer(currentState, action)
    // 变更通知:
    currentListeners.forEach(v => v())
    return action
  }
  const subscribe = (cb) => currentListeners.push(cb)
  // 初始化状态:
  // type的起名是随意起的,尽量少用的名字,不要和用户的名字重叠:
  dispatch({type: '@IMOOC/YY-REDUX'})
  return { getState, dispatch, subscribe }
}


//自定义中间件
export function logger () {
  // 返回真正的中间件执行函数
  return dispatch => action => {
    //执行中间件任务
    console.log(`${action.type}执行了!!`)
    //执行下一个中间件
    return dispatch(action)
  }
}

export const applyMiddleware = (...middlewares) => {
  // 这里的createStore => ....为上面return enhancer(createStore)(reducer)接收的第一个参数createStore, ...args为reducer
  return createStore => (...args) => {
    // 完成之前createStore的工作
    const store = createStore(...args)
    // 原来的dispatch
    let dispatch = store.dispatch
    // 传递给中间件的参数
    const midApi = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    const chain = middlewares.map(mw => mw(midApi))
    // 强化dispatch, 让其可以按顺序执行中间件函数
    dispatch = compose(...chain)(store.dispatch)
    // 返回全新的store和强化后的dispatch
    return {
      ...store,
      dispatch
    }
  }
}

export const compose = (...functions) => {
  if(functions.length === 0) return arg => arg
  if(functions.length === 1) return functions[0]
  // 聚合函数数组[fn1, fn2]为一个函数, 即fn2(fn1)
  // (left, right) => (...args) => .... 中(left, right)为上面的chain, 即函数数组; (...args)为后面传进来的store.dispatch
  // [fn1(dispatch), fn2(dispatch)] 变成 fn(dispatch)
  return functions.reduce((left, right) => (...args) => right(left(...args)))
}