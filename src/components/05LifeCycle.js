import React, { Component } from 'react'

/**
 * 以下代码为 v16.0 的生命周期函数：
 * v16.4 以后的生命周期，以下生命周期函数被删除，
 * componentWillMount
 * componentWillReceiveProps
 * shouldComponentUpdate
 * componentWillUpdate
 * 取而代之的是
 * getDerivedStateFromProps
 */
export default class LifeCycle extends Component {
    constructor(props) {
        super(props)
        console.log(`1. 组件构造函数执行 constructor`)
    }

    // v16.3新增生命周期：
    static getDerivedStateFromProps(props, state){
        // 在组件创建时和更新时的render方法之前调用，它返回一个对象来更新状态，或者返回null来不更新任何内容。
        return null
    }

    // 
    static getDerivedStateFromError(){

    }


    componentWillMount(){
        // 此时可访问状态和属性，可进行api调用等
        console.log(`2. 组件将要挂载 componentWillMount`)
    }

    componentDidMount(){
        // 组件已挂载，可进行状态更新
        console.log(`3. 组件已经挂载 componentDidMount`)
    }

    componentWillReceiveProps(){
        // 父组件传递的属性值有变化，做相应响应
        // 第一次挂载时不会变化，父组件props更新后才变
        console.log(`4. 将要接收属性传值 componentWillReceiveProps`)
    }

    shouldComponentUpdate(props, state){
        // 组件是否需要更新，需要返回布尔值，
        // !!!!!优化点, 可以拿出props，state等参数进行对比，结果返回ture则更新
        console.log(`5. 组件是否需要更新？ shouldComponentUpdate:
        props: ${props} state: ${state}`)
        return true
    }

    componentWillUpdate(){
        // 组件将要更新，可做更新统计
        // 统计所有dom的操作， 使用场景：如列表的滚动条的位置
        console.log(`6. 组件将要更新 componentWillUpdate`)
    }

    componentDidUpdate(){
        // 组件更新了
        console.log(`7. 组件已更新 componentDidUpdate`)
    }

    componentWillUnmount(){
        console.log(`8. 组件将要卸载 componentWillUnmount`)
    }

    render() {
        console.log(`9. 组件渲染 render`)
        return (
            <div>
                组建生命周期，见控制台
            </div>
        )
    }
}
