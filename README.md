### 总结

+ 工作原理

  + UI=F(state)
  
+ React && ReactDOM 

  + React.createElement()
  
+ JSX

  +  表达式： `{expr}`
  + 属性：`<div id={expr}>`
  + jsx自身也是表达式： `<p>{jsx}</p>`

+ 组件

  + 函数式
  + 类

+ 属性

  + `<Comp name="" style={{...}}/>`

+ 状态

  ```jsx
  state={} 
  componentDidMount(){
  	this.setState({prop:val}
      this.setState((state)=>{prop:val})
  )}
  ```


+ 条件和循环

  + `{this.state.isLogin ? <p>{userInfo.name}</p> : 登录}`
  + `{this.state.message && <p>{userInfo.name}</p>}`
  + `{this.state.list.mpa(u=> <li>{u.title}</li>)}`

+ 事件

  ```jsx
  onChange = () => {}
  <input onChange={this.onChange} />
  <input onChange={()=>this.onChange(user)}
  ```


  + 最后一种可以传参

+ 通信

  + `<Comp title={} onSubmit={this.onSubmit}><Comp />`
  + `onSubmit={this.onSubmit}` 是从子组件传来的事件
  
+ 高阶组件


  + 解决子class组件里重复渲染的问题，提升性能，优化办法：


    + v15.3前，用 生命周期钩子函数控制是否渲染：`shouldComponentUpdate(nextProps){}`

      ```jsx
      shouldComponentUpdate(nextProps){
          if (nextProps.xxx === this.props.xxx &&
              nextProps.yyy === this.props.yyy) {
              return false
          }
          return true
      }
      ```

    + v15.3后，PureComponent

      ```jsx
          
      ```

    + v16.6.0后，React.mono()


+ Hook
  + v16.8以后的新增项，

+ Redux原理
  ```js
  export function createStore(reducer, enhancer ){
    // enhancer强化函数
    if(enhancer) return enhancer(createStore)(reducer)
    let currentState = []
    let currentListeners = []

    function getState() {
      return currentState
    }
    // 结合
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
  ```

+ react-redux 基础原理

  ```jsx
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
  ```
+ Provider原理
  ```jsx
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
  ```

+ Redux-thunk
  ```jsx
  const thunk = ({dispatch, getState}) => next => action =>{
    if ( typeof action == 'function' ) {
      return action(dispatch, getState)
    }
    return next(action)
  }
  export default thunk
  ```
