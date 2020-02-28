import React, { Component } from 'react'
// import logo from './logo.svg'
// import { Welcome1, Welcome2 } from './components/01CompType'
// import Clock  from './components/02State-setState'
// import StateTest from './components/03StateTest'
import CartSample from './components/04CartSample'
import LifeCycle from './components/05LifeCycle'
import AntDesignUI from './components/06AntDesignUI'
import ComponentIssue from './components/07ComponentIssue'
import Composition from './components/09Composition'
import Composition2 from './components/09Composition2'
import Composition3 from './components/09Composition3_React_Children'
import HookUseState from './components/10Hook01_useState'
import HookUseEffect from './components/10Hook02_useEffect'
import HookUseReducer from './components/10Hook03_useReducer'
import HookUseContext from './components/10Hook04_useContext'

import Context from './components/11Context'
import WrappedNormalLoginForm from './components/12AntdForm'
import MockAntdForm from './components/12MockAntdFormComponent'
import Rewirte from './components/12rewirte'

// 13-02 react-redux
import { Provider } from 'react-redux'


import BaseRedux from './components/13BaseRedux'
import BaseRedux02 from './components/13BaseRedux02'
// 12.3
// import store02 from './components/13BaseReduxStore02'

// import ReactRouter from './components/15reactRouter'
// import store03 from './store/index'
import ReduxSaga from './components/16ReduxSaga'
import storeWithSaga from './store/index2'
import ModalDemo from './components/ModalDemo'

import SimpleRedux from './components/13-01simpleRedux'

import HOC from './components/08HOC'
import HOC2 from './components/08HOC2'
import HOC3 from './components/08HOC3-Decorators'
import HOC4 from './components/08HOC4'
import PropsRender from './components/08PropsRender'

import ProviderConsumer from './components/07Context'
import HocContext from './components/08HocContext'

import BaseReduxModulization from './components/13BaseReduxModulization'
import MyReduxTest from './components/14MyReduxTest'

// const formatName = (user) => {
//   return `${user.firstName} ${user.lastName}`
// }
export default class App extends Component {
  // 演示组件生命周期：
  state = { prop: 'some prop' }
  // componentDidMount(){
  //   this.setState({prop: 'new prop'})
  //   setTimeout(()=>{
  //     this.setState({prop: '' })
  //   }, 3000)
  // }


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

        {/* 07. 组件化存在的问题, 多次渲染 */}
        {/* <ComponentIssue></ComponentIssue> */}
        {/* 07. 跨代传值Context */}
        {/* <ProviderConsumer></ProviderConsumer> */}

        {/* 08. HOC 高阶组件及propsRender组件互调使用 */}
        {/* <PropsRender></PropsRender> */}
        {/* <HOC></HOC> */}
        {/* <HOC2></HOC2> */}
        {/* <HOC3></HOC3> */}
        {/* <HOC4></HOC4> */}
        {/* <HocContext></HocContext> */}

        {/* 09. Composition 复合组件 */}
        {/* <Composition></Composition> */}
        {/* <Composition2></Composition2> */}
        {/* 09. 反向继承 */}
        {/* <Composition3></Composition3> */}

        
        {/* 10. Hook */}
        {/* <HookUseState></HookUseState> */}
        {/* <HookUseEffect></HookUseEffect> */}
        {/* <HookUseReducer></HookUseReducer> */}
        {/* <HookUseContext></HookUseContext> */}

        {/* 模拟antd创建UI组件： */}
        {/* <MockAntdForm></MockAntdForm> */}
        {/* <hr/> */}

        {/* 重写一遍 */}
        {/* <Rewirte></Rewirte> */}

        {/* 13-01 simpleRedux */}
        {/* <SimpleRedux></SimpleRedux> */}
        {/* 13-02 react-redux */}
          {/* react-redux库中Provider的引入 */}
        {/* <Provider store={store}><ReactRedux></ReactRedux></Provider> */}


        {/* 13BaseRedux */}
        {/* <BaseRedux></BaseRedux> */}

        {/* 8. 全局使用Provider,使用context上下文进行传值： */}
        {/* <Provider store={store}>
          <BaseRedux></BaseRedux>
        </Provider> */}
        {/* 12. redux中间件和异步： */}
        {/* <BaseRedux02></BaseRedux02> */}
        {/* 13. redux模块化 */}
        {/* <BaseReduxModulization></BaseReduxModulization> */}

        {/* 14.redux源码实现 */}
        <MyReduxTest></MyReduxTest>

        {/* 路由 */}
        {/* <ReactRouter></ReactRouter> */}
        {/* 路由结合redux做登录页面 */}
        {/* <Provider store={store03}>
          <ReactRouter></ReactRouter>
        </Provider> */}

        {/* saga umi */}
        {/* <Provider store={storeWithSaga}>
          <ReduxSaga></ReduxSaga>
        </Provider> */}

        {/* <ModalDemo></ModalDemo> */}
      </div>
    )
  }
}

