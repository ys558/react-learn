// vdom转换为dom
// diff

// 1-html元素, 2-function组件, 3-class组件
// 1. 传进来type应该包括传统html元素, fn类型组件, class类型的组件, 后两种统一叫vtype, html元素叫type
export const createVNode = (vtype, type, props) => {
  const vnode = {vtype, type, props}
  return vnode
}

// 2. vdom转换为dom操作:
export function initVNode(vnode) {
  const {vtype} = vnode
  if (!vtype) {
    // 文本节点处理:
    return document.createTextNode(vnode)
  }
  if (vtype === 1){
    // 原生元素:
    return createElement(vnode)
  }else if (vtype === 2) {
    // 类组件
    return createClassComp(vnode)
  }else if (vtype === 3) {
    // 函数组件
    return createFuncComp(vnode)
  }
}

// 3. 原生html标签处理:
function createElement(vnode) {
  // 根据type创建元素
  const {type, props} = vnode
  const node = document.createElement(type)

  // 处理属性, 这里仅仅展示一些简单的伪代码操作:
  const {key, children, ...rest} = props
  Object.keys(rest).forEach(k => {
    // 处理特别属性名: 例如: className htmlFor
    if (k === 'className') {
      node.setAttribute('class', rest[k])
    }else if (k === 'htmlFor') {
      node.setAttribute('for' , rest[k])
    }else if (k === 'style' && typeof[k] == 'object' ) {
      const style =  Object.keys(rest[k]).map(s => `${s}:${rest[k][s]}`).join(';')
      node.setAttribute('style' , style)
    }else if (k.startsWith('on') ) {
      // onClick
      const event = k.toLowerCase()
      // console.log(event)
      // onclick
      node[event] = rest[k]
    }else {
      node.setAttribute(k, rest[k])
    }
  })

  // !!!!递归处理其children: 因为所有节点最终都转换成html节点处理: 所以递归的点是这里,createElement
  children.forEach(c =>  node.appendChild(initVNode(c)))
  
  return node
}

// 4. 类组件处理:
function createClassComp(vnode) {
  
  // type是class组件的声明:
  const {type, props} = vnode
  
  // !!!! type继承了React的 class类, 直接再次实例化, 就能继承React的class所有属性:
  const component = new type(props)
  // console.log(component);
  // CompClass {props: {…}, state: {…}}
  //  props: {name: "component class", children: Array(0)}
  //  state: {}

  // 因为其本身就是class, 所以自动render()函数, 直接调用render()就能得到虚拟dom: 
  const vdom = component.render()
  // 递归调用initVNode方法:
  return initVNode(vdom)

} 

// 5. 函数组件处理:
function createFuncComp(vnode) {
  // type是class组件的声明:
  const {type, props} = vnode

  // 不需像上面一样new一个实例,type(props)本身就是vdom
  const vdom = type(props)
  
  // 递归调用initVNode方法:
  return initVNode(vdom)
}