/**
 * 0. 新建src\components\react-source-code-study\src\kreact.js实现react.createElement()接口
 *  
 */


// import React from 'react'
// 2. 注释掉, 用自己写的替换:
import React, { Component } from './kreact'
// import ReactDom from 'react-dom'

// 3. 注释掉, 用自己写的替换:
import ReactDom from './kreact-dom'


const CompFn = (props) => {
  return <h2>hi {props.name}</h2>
}

// 4. 
class CompClass extends Component {
  render() {
    return (
      <div>
        <h2>hi {this.props.name}</h2>
      </div>
    )
  }
}

const jsx = (
  <div id='demo' onClick={()=>alert('click')}>
    <span style={{color: 'red', fontSize: '80px'}}>hi</span>
    <CompFn name='component function'/>
    <CompClass name='component class'/>
  </div>
)

// 0. 可以看出vdom就是描述dom结构的一个对象:
console.log(jsx)
// {$$typeof: Symbol(react.element), type: "div", key: null, ref: null, props: {…}, …}
// $$typeof: Symbol(react.element)
// key: null
// props:
// children: (2) [{…}, {…}]
// id: "demo"
// __proto__: Object
// ref: null
// type: "div"
// _owner: null

/*
  通过上述控制台输出,及React官网可以发现:https://reactjs.org/
  render(){}函数执行的是以下接口:
  return React.createElement(
    'div',
    { id: 'demo' },
    React.createElement(
      'span',
      null,
      'hi'
    ),
    React.createElement(Comp, { name: 'kaikeba' })
  );
 */

ReactDom.render(jsx, document.querySelector('#root'))