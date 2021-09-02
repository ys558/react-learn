import React, { Component } from 'react'
import { observable, action, autorun } from 'mobx'
import { observer } from 'mobx-react'

// 全局状态：
export class Store {
  @observable count = 0
  @action.bound increment () {
    this.count ++
  }
}

const store = new Store()
autorun(()=> console.log(store.count))
store.count = 22

// 装饰器函数
@observer
class MobxWithClass extends Component {
  render(){
    const { store } = this.props
    return <div>
      <div>{store.count}</div>
      <button onClick={()=>store.increment()}>increment</button>
    </div>
  }
}

export default MobxWithClass
