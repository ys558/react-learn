// redux 原理
export function createStore(reducer, enhancer ){
  // enhancer强化函数
  if(enhancer) return enhancer(createStore)(reducer)
  let currentState = []
  let currentListeners = []

  function getState() {
    return currentState
  }

  function subscribe(listener){
    currentListeners.push(listener)
  }
  function dispatch(action) {
    // 按照action的类型更新currentState，覆盖之前的老状态
    currentState = reducer(currentState, action)
    // 通知所有listeners遍历并进行更新：
    currentListeners.forEach(v=>v())
    return action
  }
  dispatch({type:'@IMOOC/WONIU-REDUX'})
  return { getState, subscribe, dispatch}
}

export function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args)
    let dispatch = store.dispatch

    const midApi = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }

    const middlewareChain = middlewares.map(middleware => middleware(midApi))
    dispatch = compose(...middlewareChain)(store.dispatch)
    return {
      ...store,
      dispatch
    }
  }
}

export function compose(...funcs) {
  if(funcs.length == 0) return arg => arg
  if(funcs.length == 1) return funcs[0]
  return funcs.reducer((ret, item) => (...args) => ret(item(...args)))
}

function bindActionCreator(creators, dispatch) {
  return (...args) => dispatch(creators(...args))
}

export function bindActionCreator(creators, dispatch) {
  return Object.keys(creators).reduce((ret, item) => {
    ret[item] = bindActionCreator(creators[item], dispatch)
    return ret
  }, {})
}

// react-redux 原理：
import React from 'react'
import PropTypes from 'prop-types'
import {bindActionCreator} from './woniu-redux'

export const connect = (mapStateToProps=state=>state, mapDispatchToProps={})=>
(WrapComponent) => {
  return class ConnectComponent extends React.Component {
    static contextTypes = {store: PropTypes.object}
    constructor(props, context) {
      super(props, context)
      this.state = { props: {} }
    }
    componentDidMount() {
      const {store} = this.context
      store.subscribe(()=> this.update())
      this.update()
    }
    update(){
      const {store} = this.context
      // 用户传递进来的：
      const stateProps = mapStateToProps(store.getState())
      const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch)
      this.setState({
        props: {
          ...this.state.props,
          ...stateProps,
          ...dispatchProps
        }
      })
    }
    render(){
      return <WrapComponent {...this.state.props}></WrapComponent>
    }
  }
}

// Provider原理
export class Provider extends React.Component {
  static childContextTypes = { store: PropTypes.object }
  getChildContext() {
    return { store:this.store }
  }
  constructor(props, context) {
    super(props, context)
    this.store = props.store
  }
  render() {
    return this.props.children
  }
}

// redux-thunk 原理
const thunk = ({dispatch, getState}) => next => action =>{
  if ( typeof action == 'function' ) return action(dispatch, getState)
  return next(action)
}
export default thunk