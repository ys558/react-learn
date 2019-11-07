/*
隔代传参Context:
主要api：
React.createContext
Context.Provider
Class.contextType
Context.Consumer
*/ 
import React, {useContext} from 'react'

// 1. 创建上下文：
const MyContext = React.createContext()
const { Provider, Consumer } = MyContext


function Child(props) {
    return (
        <div>
            从外层传过来的值：{props.foo} <br/>
            隔多少层都能传
        </div>
    )
}

// 3. v16.8之后：利用钩子的方法拿到数据
function Child2() {
    // 直接钩子函数传入MyContext：
    const hook = useContext(MyContext)
    return <div>Child2: {hook.foo}</div>
}

// 4. 使用class指定静态contextType
class Child3 extends React.Component {
    static contextType = MyContext
    render(){
        // 这里的context则不能改变，固定的名字：
        return <div>Child3: {this.context.foo}</div>
    }
}

export default function Context() {
    return (
        <div>
            {/* 如果上面不用解构{Provider}，这里可以直接这样写： */}
            {/* <MyContext.Provider></MyContext.Provider>   */}
            <Provider value={{foo:'bar'}}>
                <div>
                    {/* 2. 利用Context.Consumer拿到Provider的值： */}
                    <Consumer>
                        {value => <Child {...value} />}
                    </Consumer>

                    {/* 3. 利用钩子的方法拿到数据 */}
                    <Child2/>

                    {/* 4. 使用class指定静态contextType*/}
                    <Child3/>
                </div>
            </Provider>
        </div>
    )
}

