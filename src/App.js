import React, { Component } from 'react'
import logo from './logo.svg'
import { Welcome1, Welcome2 } from './components/01CompType'
import Clock  from './components/02State-setState'
import StateTest from './components/03StateTest'

const formatName = (user) => {
  return `${user.firstName} ${user.lastName}`
}
export default class App extends Component {
  render() {
    const name = 'jerry'
    const user = { firstName: `tom`, lastName: `jerry` }
    const jsx = <p>hello, jerry</p>
    return (
      <div>
        {/* <h3>React Course</h3> */}
        {/* 1. 基础语法： */}
        {/* 1.1 表达式 */}
        {/* <h2>{name}</h2> */}
        {/* <h2>{formatName(user)}</h2> */}
        {/* 1.2 属性 */}
        {/* <img src={logo} style={{ width: '100px' }} /> */}
        {/* 1.3 jsx也是表达式 */}
        {/* {jsx} */}

        {/* 2. 使用其他组件 */}
        {/* <Welcome1 name="some content111"></Welcome1> */}
        {/* <Welcome2 name="some content2222"></Welcome2> */}

        {/* 3. 组件的状态和设置状态 */}
        {/* <Clock></Clock> */}

        {/* 4. state的常见问题： */}
        <StateTest></StateTest>
      </div>
    )
  }
}

