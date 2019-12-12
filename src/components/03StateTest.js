import React, { Component } from 'react'

export default class StateTest extends Component {
    state = {
        counter: 1
    }

    componentDidMount() {
        // 1. 直接修改状态值无效：只能this.setState({ })更新：
        // this.state.counter += 1

        // this.setState({ counter: this.state.counter + 1})
        // 2. setState批量执行时，即改变多次状态时，需用函数式写法：
        // !!! 除了可以传入对象setState(obj, callback)，也可传入函数setState(fn, callback)
        this.setState(prevState =>  ({counter: prevState.counter + 1}))
        this.setState(prevState =>  ({counter: prevState.counter + 1}))


    }

    render() {
        return (
            <div>
                {this.state.counter}
            </div>
        )
    }
}
