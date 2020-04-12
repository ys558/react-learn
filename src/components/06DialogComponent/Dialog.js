import React, { Component } from 'react'
import {createPortal} from 'react-dom'
import './dialog.css'

export default class Dialog extends Component {
  constructor(props){
    super(props)
    // 创建新的div节点
    const doc = window.document
    this.node = doc.createElement('div')
    // 直接添加到body里，不在父组件src\components\06DialogPage.js里显示：
    doc.body.appendChild(this.node)
  }

  // 关闭div弹框时卸载掉：要不每点一次坦克就会一直在那：
  componentWillUnmount(){
    window.document.body.removeChild(this.node)
  }
  
  render() {
    return createPortal(
      <div className="dialog">
        <h1>Dialog</h1>
      </div>,
      this.node,
    )
  }
}