/*
隔代传参Context:
主要api：
React.createContext
Context.Provider
Class.contextType
Context.Consumer
*/ 
import React from 'react'

// 1. 创建上下文：
const MyContext = React.createContext()
const { Provider, Consumer } = MyContext

const Child = (props) => <div>
			从最外层&lt;Provider /&gt;的value属性传过来的值：{props.foo}, <br/>
			隔多少层都能传
	</div>

// 3. v16.8之后：利用钩子的方法React.useContext()直接拿到数据
const Child2 = () => <div> Child2: { React.useContext(MyContext).foo } </div>

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

