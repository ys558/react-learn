import React, { Component } from 'react'

export default class StateTest extends Component {
    state = {
        counter: 0
    }

    componentDidMount() {
        // 1. 直接修改状态值无效：只能this.setState({ })更新：
        // this.state.counter += 1

        // this.setState({ counter: this.state.counter + 1})
        // 2. setState批量执行时，即改变多次状态时，需用函数式写法：
        // !!! 除了可以传入对象setState(obj, callback)，也可传入函数setState(fn, callback)
        // this.setState(prevState =>  ({counter: prevState.counter + 1}))
        // this.setState(prevState =>  ({counter: prevState.counter + 1}))

        // 3. 注意以下的console.log()的输出，
        //    回调函数里的console.log(this.state.counter)因为结果因为diff算法的缘故，
        //    集中到一起更新，一次性推到栈里，所以一直是2
        this.setState(
            prevState => {
                console.log('in', prevState.counter) // 0
                return {counter: prevState.counter + 1}
            },
            () => console.log(this.state.counter) // 2
        )
        this.setState(
            prevState => {
                console.log('in', prevState.counter) // 1
                return {counter: prevState.counter + 1}
            },
            () => console.log(this.state.counter) // 2
        )
        


    }

    render() {
        return (
            <div>
                {this.state.counter}
            </div>
        )
    }
}
