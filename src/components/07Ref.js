import React, { Component, createRef, forwardRef } from 'react';
/*
1. ref是用来访问真实dom节点的, ref可以经由props传递, 但最终必须在原生HTML dom节点上:
  回调函数
  React.createRef() （React16.3提供)
2. 能打ref的均为class组件,函数式组件不能打ref
3. Ref的转发:
3.下面是几个适合使用 refs 的情况：
  管理焦点，文本选择或媒体播放。
  触发强制动画。
  集成第三方 DOM 库。
*/

// 1. 基础使用:
export class Ref extends Component {
  render() {
    // 创建一个 ref 来存储 textInput 的 DOM 元素
    this.textInput = createRef(); 
    return <div>
      <input type="text" ref={this.textInput} />
      {/* 直接使用原生 API 使 text 输入框获得焦点, 通过 "current" 来访问 DOM 节点 */}
      <button onClick={()=>this.textInput.current.focus()} >Focus the text input</button>
    </div>
}}

// 2. 通过回调函数使用ref, 改动上面的例子
export class CustomTextInput extends Component {
  render(){
    return <div>
      <input type="text" ref={ element => this.textInput = element }/>
      <button onClick={() => this.textInput? this.textInput.focus(): null}>Focus the text input</button>
    </div>
  }
}

// 3. ref转发: 如果要在非原生DOM节点上打ref标签, 则用转发
// 输入框打开页面直接获取焦点:
// forwardRef能直接获得ref参数, 并直接传递, 普通函数无法做到此功能:
const InputWithParentTxt = forwardRef(({parentTxt}, ref) => (<input type="text" ref={ref} defaultValue={parentTxt}/>));
export class ForwardRef extends Component {
  componentDidMount() {this.ref.current.focus()}
  render() {
    this.ref = createRef();
    return<div>
      <p>forward ref</p>
      <InputWithParentTxt ref={this.ref} parentTxt="parent props txt"/>
    </div>
  }
}


// 4. forwardRef在HOC的应用:
// 注意, 关于HOC请参见本文件夹08HOC系列
// 4.0 父组件Input先使用forwardRef()拿到ref, 传给子组件TextInput, 子组件DOM节点的ref属性上再接收
const Input = Comp => forwardRef((props, ref) =>
// 4.1 对应其要传给子组件的ref, 起名forwardedRef, 最终仍要传递到最底层子组件的真实的DOM节点上
<Comp parentRef={ref} {...props}>
    <div>高阶组件转发refs</div>
  </Comp>
)

const TextInput = ({ parentRef, children, ...rest }) => <div>
    {/* 4.2 对应其父组件的forwardedRef, 最终仍要将其, 转变为input框DOM节点的ref属性: */}
    <input ref={parentRef} {...rest} />
    {children}
  </div>

const InputField = Input(TextInput)
export class ForwardRefInHOC extends React.Component {
  render() {
    this.inputRef = createRef();
    return <div>
      <h1>高阶组件传递refs</h1>
      <InputField ref={this.inputRef} />
      <button onClick={()=>this.inputRef.current.focus()}>Focus the text input</button>
    </div>
  }
}
