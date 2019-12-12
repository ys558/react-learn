// 7. 
import { createVNode } from "./kvdom";

/**
 * 1. 注释掉src\components\react-source-code-study\src\index.js里的import React from 'react'并替换成:
 */

//  2. 所以从index.js传进来的参数必须有: type, props, 和子元素children:
function createElement(type, props, ...children) {
  // 1. console.log(arguments)
  // Arguments(3) ["span", {…}, "hi", callee: (...), Symbol(Symbol.iterator): ƒ]
  // Arguments(2) [ƒ, {…}, callee: (...), Symbol(Symbol.iterator): ƒ]
  // Arguments(4) ["div", {…}, undefined, undefined, callee: (...), Symbol(Symbol.iterator): ƒ]
  /*
  1. 可以看到输出的顺序,根据原始页面index.js,
  <div id='demo'>
    <span>hi</span>
    <Comp name='kaikeba'/>
  </div>
  原始createElement()接口是从内往外执行的"span"-->f-->"div"创建流程
  */ 

  props.children = children
  // 2. 删去无用元素让其更好区分:
  delete props.__source
  delete props.__self

  // 3. 返回type, props给index.js实现:
  // 但会报错如下: 因为React对其传进来的东西进行了元素审查
  /* 
  Error: Objects are not valid as a React child (found: object with keys {type, props}). If you meant to render a collection of children, use an array instead.
  */

  // type: 标签类型,如div, 
  // 6. vtype: 组件类型
  let vtype;
  if (typeof type === 'string' ) {
    // 元素html标签
    vtype = 1
  }else if (typeof type === 'function') {
    if (type.isClassComponent) {
      // class组件
      vtype = 2
    }else {
      // 函数组件 
      vtype =3
    }
  }

  // return {type, props}
  // 7. 注释掉上面的, 按照上面6.区分的类型,利用createVNode方法重新return
  return createVNode(vtype, type, props)

}

export default {createElement}

// 4. 
export class Component {
  // 5. 为了区分某个组件是class还是fn, 因为js语法本身就没有class,class底层也是用fn实现
  static isClassComponent = true;

  constructor(props) {
    this.props = props
    this.state = {}

  }
  
  setState() {

  }
}