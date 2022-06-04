import React, { Component } from 'react'
import { Welcome1, Welcome2 } from './components/01CompType'
import Clock  from './components/02State-setState'
import StateTest from './components/03StateTest'
import CartSample from './components/04CartSample'
import LifeCycle from './components/05LifeCycle'
import AntDesignUI from './components/06AntDesignUI'
import ComponentIssue from './components/07ComponentIssue'
import ComponentIssue2 from './components/07ComponentIssue2'
import Composition from './components/09Composition'
import Composition2 from './components/09Composition2'
import Composition3 from './components/09Composition3_React_Children'
import HookUseState from './components/10Hook01_useState'
import HookUseEffect from './components/10Hook02_useEffect'
import HookUseReducer from './components/10Hook03_useReducer'
import HookUseContext from './components/10Hook04_useContext'
import {
  // HookUseMemo, 
  // HookUseCallback, 
  CallBackAndMeno
} from './components/10Hook05_useCallbackAnduseMemoHook'
import  HookA  from './components/10HookA'

import Context from './components/11Context'
import WrappedNormalLoginForm from './components/12AntdForm'
import MockAntdForm from './components/12MockAntdFormComponent'
import Rewirte from './components/12rewirte'



import {ReactRouter} from './components/15.1reactRoutes.js'
import store15 from './store/15store'
import ReduxSaga from './components/16ReduxSaga'
import storeWithSaga from './store/16SagaStore'
import ModalDemo from './components/17ModalDemo'

import Portal from './components/06DialogPage'

// 07.
import { Ref, CustomTextInput, ForwardRef, ForwardRefInHOC } from './components/07Ref'
// 08.
import HOC from './components/08HOC'
import HOC2 from './components/08HOC2'
import HOC3 from './components/08HOC3-Decorators'
import HOC4 from './components/08HOC4'
import HOC5 from './components/08HOC5-wrappedComponent'
import PropsRender from './components/08PropsRender'

import ProviderConsumer from './components/07Context'
import HocContext from './components/08HocContext'

// 13.
import ReduxTest from './components/13.1ReduxTest';
import ReduxMiddleWare from './components/13.2ReduxMiddleWare'
import ReduxModulization from './components/13.3ReduxModulization'
import MyReduxUse from './components/13.4MyReduxUse';
import MyReactReduxUse from './components/13.5myReactReduxUse'

// 15
import { Provider } from 'react-redux'
import MyRouter from './components/15.2reactRoutes_MyReactRouter'
import ModalByHook from './components/17ModalDemoByHook'
import Tree from './components/18Tree'
import RoutesBase from './components/19.0Routes_Base'
import RoutesActivate from './components/19.1Routes_activate'
import RoutesLogin from './components/19.2.1Routes_login'
import store from './components/19.3Route_storeToLogin'

// 19
import UseRef_UseImperativeHandle from './components/10Hook07_useRef_useImperativeHandle'
import UseRefHook from './components/10Hook06_useRef'
import UseLayoutEffectHook from './components/10Hook08_useLayoutEffect'

// 20
import DataFrChild2ParentByCallback from './components/20DataFrChild2ParentByCallback'
import EventEmitterDemo from './components/21EventEmitterDemo'

// 22
// hooks写法：
import  { MbxUseWrap } from './components/22MobxWithHooks'
// class写法：
import MobxWithClass, { Store } from './components/22MobxWithClass'
// 21

// 23
import {ByRef, ByPropsThis}  from './components/23ControledByOtherClassComp'

// 24
import AvoidReRenderInChildComp1 from './components/24AvoidReRenderInChildComp1'
import AvoidReRenderInChildComp2 from './components/24AvoidReRenderInChildComp2'

// 25
import React18useTransition from './components/25React18useTransition'
import React18useDefferedValue from './components/25React18useDefferValue'
import React18useId from './components/25React18useId'

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

        {/* 06 createPortal 传送门:一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案。*/}
        {/* <Portal/> */}

        {/* 07. 组件化存在的问题, 多次渲染 */}
        {/* <ComponentIssue></ComponentIssue> */}
        {/* <ComponentIssue2></ComponentIssue2> */}
        {/* 07. 跨代传值Context */}
        {/* <ProviderConsumer></ProviderConsumer> */}

        {/* 07. Ref */}
        {/* <Ref></Ref> */}
        {/* <CustomTextInput></CustomTextInput> */}
        {/* <ForwardRef></ForwardRef> */}
        {/* <ForwardRefInHOC></ForwardRefInHOC> */}

        {/* 08. HOC 高阶组件及propsRender组件互调使用 */}
        {/* <PropsRender></PropsRender> */}
        {/* <HOC></HOC> */}
        {/* <HOC2></HOC2> */}
        {/* <HOC3></HOC3> */}
        {/* <HOC4></HOC4> */}
        {/* <HOC5></HOC5> */}
        {/* <HocContext></HocContext> */}

        {/* 09. Composition 复合组件 */}
        {/* <Composition></Composition> */}
        {/* <Composition2></Composition2> */}
        {/* 09. 反向继承 */}
        {/* <Composition3></Composition3> */}

        
        {/* 10. Hook */}
        {/* <HookUseState></HookUseState> */}
        {/* <HookA></HookA> */}
        {/* <HookUseEffect></HookUseEffect> */}
        {/* <HookUseReducer></HookUseReducer> */}
        {/* <HookUseContext></HookUseContext> */}
        {/* <HookUseMemo/> */}
        {/* <HookUseCallback/> */}
        {/* <UseRefHook /> */}
        {/* <UseRef_UseImperativeHandle/> */}
        {/* <UseLayoutEffectHook/> */}
        {/* <CallBackAndMeno/> */}

        {/* 11. 隔代传参Provider, Context */}
        {/* <Context></Context> */}

        {/* 模拟antd创建UI组件： */}
        {/* <MockAntdForm></MockAntdForm> */}
        {/* <hr/> */}

        {/* 重写一遍 */}
        {/* <Rewirte></Rewirte> */}

        {/* 13. redux及源码: */}
        {/* <ReduxTest/> */}
        {/* <ReduxMiddleWare/> */}
        {/* <ReduxModulization/> */}
        {/* <MyReduxUse/> */}
        {/* <MyReactReduxUse/> */}


        {/* 15. 路由 */}
        {/* 路由结合redux做登录页面 */}
        {/* <Provider store={store15}>
          <ReactRouter></ReactRouter>
        </Provider> */}
        {/* 15.2 路由源码解析 */}
        {/* <MyRouter></MyRouter> */}


        {/* saga umi */}
        {/* <Provider store={storeWithSaga}>
          <ReduxSaga></ReduxSaga>
        </Provider> */}

        {/* <ModalDemo></ModalDemo> */}
        {/* <ModalByHook></ModalByHook> */}

        {/* <RoutesBase></RoutesBase> */}
        {/* <RoutesActivate></RoutesActivate> */}
        {/* <Provider store={store}>
          <RoutesLogin></RoutesLogin>
        </Provider> */}

        {/* <Tree/> */}
        {/* <DataFrChild2ParentByCallback /> */}

        {/* <EventEmitterDemo/> */}

        {/* <MbxUseWrap/> */}
        {/* <MobxWithClass store={new Store()}/> */}

        {/* <ByRef/> */}
        {/* <ByPropsThis/> */}

        {/* 24 */}
        {/* <AvoidReRenderInChildComp1/> */}
        {/* <AvoidReRenderInChildComp2/> */}

        {/* 25 */}
        {/* <React18useTransition /> */}
        {/* <React18useDefferedValue/> */}
        <React18useId />
      </div>
    )
  }
}

