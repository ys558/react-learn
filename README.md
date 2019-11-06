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




<!--  -->