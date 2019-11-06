/**
 * 高阶组件和装饰器
 * ！！！！高阶组件的作用，对展示用的函数组件进行扩展：
 * 
 *  ` ES7中装饰器的使用：
 * 1. 装饰器的所有组件必须改为class组件，不能用函数组件
 * 2. npm i -D babel-plugin-transform-decorators-legacy
 * 
 */
import React, { Component } from 'react'

// function Kaikeba(props) {
//     return <div>{props.stage}-{props.name}</div>
// }
// 4. 为了使用装饰器，把Kaikeba改为class：
// 5. 并将装饰器加入到原来的Kaikeba class
// @withLog
// @withKaikeba
// @withLog
class Kaikeba extends Component {
    render() {
        return <div>{this.props.stage}-{this.props.name}</div>
    }
}


//  2. 将原 <Kaikeba></Kaikeba> 利用高阶组件进行处理；
const withKaikeba = Comp => {
    const name = '高阶组件'
    // {...props} 不知道传了多少个属性就用这种展开语法
    // 2.1 直接返回props接收一个新组件：
    // return props => <Comp {...props} name={name}></Comp> 

    // 2.2 当然，也可直接return class类型的组件：实现更复杂功能，
    // !!! 类名如果不需要用到也可变成匿名类，直接省去：
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
// 4. 这种语法比较累赘，可以采用ES7的装饰器语法，但要改变开课吧为class类型组件，需要安装新的插件，安装过程在最上面有阐述
const NewKaikeba = withLog(withKaikeba(withLog(Kaikeba)))


export default class HigherOrderComponent extends Component {
    render() {
        return (
            <div>
                {/* 1. 这里传给 Kaikeba 但又没有传Kaikeba需要的参数 */}
                {/* <Kaikeba stage="React"></Kaikeba> */}

                {/* 2. 将原 <Kaikeba></Kaikeba> 进行处理；即上面的操作*/}
                <NewKaikeba stage="React"></NewKaikeba>

                {/* 5. 装饰器的使用，这里就不用定义新的<NewKaikeba></NewKaikeba>了，直接用装饰器注入后的即可<Kaikeba></Kaikeba> */}
                <Kaikeba></Kaikeba>
            </div>
        )
    }
}
