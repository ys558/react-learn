/**
 * ！！！！高阶组件的作用，对展示用的函数组件进行扩展：
 */
import React, { Component } from 'react'

function Kaikeba(props) {
    return <div>{props.stage}-{props.name}</div>
}

//  2. 将原 <Kaikeba></Kaikeba> 利用高阶组件进行处理；
const withKaikeba = Comp => {
    const name = '高阶组件'
    // {...props} 不知道传了多少个属性就用这种展开语法
    // 2.1 直接返回props接收一个新组件：
    // return props => <Comp {...props} name={name}></Comp> 

    // 2.2 当然，也可直接return class类型的组件：实现更复杂功能，
    //      类名如果不需要用到也可变成匿名类，直接省去：
    return class extends Component {
        // 2.2.1 例如，可重写生命周期：
        componentDidMount(){
            console.log('do sth...')
        }
        render() {
            // 2.2.2 但这里的props前就要加上this了
            return <Comp {...this.props} name={name}></Comp>
        }
    }
    
}

const withLog = Comp => {
    console.log(`${Comp.name} 渲染了`)
    return props => <Comp {...props}></Comp>
}

// 3. 高阶组件的链式调用:
const NewKaikeba = withKaikeba(withLog(Kaikeba))

export default class HigherOrderComponent extends Component {
    render() {
        return (
            <div>
                {/* 1. 这里传给 Kaikeba 但又没有传Kaikeba需要的参数 */}
                {/* <Kaikeba stage="React"></Kaikeba> */}

                {/* 2. 将原 <Kaikeba></Kaikeba> 进行处理；即上面的操作*/}
                <NewKaikeba stage="React"></NewKaikeba>
            </div>
        )
    }
}
