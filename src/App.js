import React, { Component } from 'react'
// import logo from './logo.svg'
// import { Welcome1, Welcome2 } from './components/01CompType'
// import Clock  from './components/02State-setState'
// import StateTest from './components/03StateTest'
import CartSample from './components/04CartSample'
import LifeCycle from './components/05LifeCycle'
import AntDesignUI from './components/06AntDesignUI'
import ComponentIssue from './components/07ComponentIssue'
import HigherOrderComponent from './components/08HigherOrderComponent'
import Composition from './components/09Composition'
import Hook from './components/10Hook'
import Context from './components/11Context'
import WrappedNormalLoginForm from './components/12AntdForm'
import MockAntdForm from './components/12MockAntdFormComponent'
import Rewirte from './components/12rewirte'

// const formatName = (user) => {
//   return `${user.firstName} ${user.lastName}`
// }
export default class App extends Component {
  // 演示组件生命周期：
  state = { prop: 'some prop' }
  componentDidMount(){
    this.setState({prop: 'new prop'})
    setTimeout(()=>{
      this.setState({prop: '' })
    }, 3000)
  }


  render() {
    // const name = 'jerry'
    // const user = { firstName: `tom`, lastName: `jerry` }
    // const jsx = <p>hello, jerry</p>
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
        {/* <StateTest></StateTest> */}

        {/* 5. 条件渲染 */}
        {/* <CartSample title="课程"></CartSample> */}

        {/* 05. 生命周期： */}
        {/* {this.state.prop && <LifeCycle props={this.state}></LifeCycle>} */}

        {/* 06. antd基础应用 */}
        {/* <AntDesignUI></AntDesignUI> */}

        {/* 07. 组件化存在的问题 */}
        {/* <ComponentIssue></ComponentIssue> */}

        {/* 08. HOC 高阶组件*/}
        {/* <HigherOrderComponent></HigherOrderComponent> */}

        {/* 09. Composition 复合组件 */}
        {/* <Composition></Composition> */}
        
        {/* Hook */}
        {/* <Hook></Hook> */}

        {/* 模拟antd创建UI组件： */}
        {/* <MockAntdForm></MockAntdForm> */}

        {/* 重写一遍 */}
        <Rewirte></Rewirte>
      </div>
    )
  }
}

