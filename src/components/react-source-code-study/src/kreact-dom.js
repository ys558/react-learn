// 4.
import { initVNode } from "./kvdom";

// 传进来元素的任务:
// 1. vnode必须转换成dom, 页面才能显示
// 2. container接收转换后的dom元素
function render(vnode, container) {
  // !! <pre> 标签的一个常见应用就是用来表示计算机的源代码。
  // pre 元素可定义预格式化的文本。
  // container.innerHTML = `<pre>${JSON.stringify(vnode, null, 2)}</pre>`
  // !!页面显示有一个"children": []为空,因为JSON.stringify()不能处理函数

  // 3. 页面显示出了vnode,一组对象, 我们必须想办法转换其为真是dom,即HTML标签,页面才能正常显示


  //4. 注释掉上面的container.innerHTML,导入 执行
  const node = initVNode(vnode)
  // 
  container.appendChild(node)
}

export default {render}