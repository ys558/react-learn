import React from 'react'
import PropTypes from 'prop-types'

/*
  react-redux提供两个api:
    Provider
    connect
*/
export const connect = (mapStateToProps = state => state, mapDispatchToProps = {}) => 
  WrapComponent => class ConnectComponent extends React.Component {
    static contextTypes = {
      store: PropTypes.object
    }
    constructor(props, context){
      super(props, context)
      this.state = {
      props:{}
      }
    }
    componentDidMount(){
      const {store} = this.context
      store.subscribe(()=>this.update())
      this.update()
    }
    update(){
      const {store} = this.context
      const stateProps = mapStateToProps(store.getState())
      const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch)
      this.setState({
        props:{
        ...this.state.props,
        ...stateProps,
        ...dispatchProps
        }
      })
    }
    render(){
      console.log(this.state.props)
      return <WrapComponent {...this.state.props}></WrapComponent>
    }
  }

export class Provider extends React.Component {
  static childContextTypes = {
    store: PropTypes.object
  }
  getChildContext() {
    return { store: this.store }
  }
  constructor(props, context) {
    super(props, context)
    this.store = props.store
  }
  render() {
    return this.props.children
  }
}

function bindActionCreator(creator, dispatch){
  return (...args) => dispatch(creator(...args))
}
export function bindActionCreators(creators,dispatch){
  // 传进来的creatros: {plus: ()=>({type:'plus'})} 转换成含有派发action的函数:
  // { plus: (...args)=>dispatch(creator(...args)) }
  return Object.keys(creators).reduce((ret,item)=>{
    ret[item] = bindActionCreator(creators[item],dispatch)
    return ret
  },{})
}