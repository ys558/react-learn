/**
 * 组件复合，官方推荐，替代继承
 * 把组件拆分成小块，每个小块分管不同的功能
 */
import React from 'react'
// import {RadioGrop, Radio} from 'antd'

// 1. <WelcomDialog/>的一部分：！！！只提供样式：
// 类似于vue中的slot：
function Dialog(props) {
    return <div style={{border: `4px solid ${props.color || 'blue'}`}}>
    {/* 3. children是默认属性，类似于vue的匿名slot*/}
    {/* children是任何js类型 */}
    {props.children}
        <footer>
            {/* 4. footer是我们在<WelcomDialog/>定义的属性，类似于vue的具名slot*/}
            {props.footer}
        </footer>
    </div>
}

// 2. <WelcomDialog/>的一部分：！！！只提供内容
function WelcomDialog (props) {
    return (
        <Dialog {...props}>
            <h1>欢饮光临</h1>
            <p>感谢使用react</p>
        </Dialog>
    )
}

// 5.1 模拟异步调用：
const Api = {
    getUser() {
        return {name:'hehe', age:20}
    }
}

// 5.1 
function Fetcher(props) {
    // 5.1 直接启用props的name属性：
    // 5.1.2 这里就能直接传对象user：
    const user = Api[props.name]();
    return props.children(user) 
}

// 5.2 ！！！！如果props.children是函数的做法：
// 直接把props.children里的children，和<Filter type="p">里的type解构出来：{children, type}
function Filter({children, type}) {
    return (
        <div>
            {/* 5.2 React官方提供的：React.Children */}
            {React.Children.map(children, child => child.type == type? child: null)}
        </div>
    )
}

// 5.3 ！！！！如果props.children是数组，想改变数组元素的做法：
function RadioGrop(props){
    return (
    <div>
        {React.Children.map(props.children, child => {
            // children 本质是一个虚拟dom
            // vdom不可更改，必须克隆一个才能更改,以下这种写法错误：
            // child.props.name = props.name /* 错误写法 */

            /*正确写法：*/
            // vdom赋值和更改必须使用官方自带的方法：
            return React.cloneElement(child, {name: props.name})
        })}
    </div>)
}

// 5.3 这里不能直接传Radio(props),否则报错：
// Error: input is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.
// 因为input为单标签，而其父组件<Radio>为双标签
// 错误写法如下：
// function Radio(props) {
//     return (
//         <label>
//             <input type="radio" {...props}/>
//         </label>
//     )
// }
// 必须拆开接收：({children, ...rest})
function Radio({children, ...rest}) {
    return (
        <label>
            {/* 其他元素放在input:radio上 */}
            <input type="radio" {...rest}/>
            {/* children： */}
            {children}
        </label>
    )
}

export default function () {
    const footer = <button onClick={()=> alert(`comfirm`)}>从父组件传来的属性，一个按钮</button>
    return <div>
        <WelcomDialog color="green" footer={footer}/>
        {/* 获取 */}            
        {/* 5. props.children的扩展用法：*/}
        {/* 5.1 传进去的属性name是一个函数getUser 类似于vue的作用域slot */}
        <Fetcher name="getUser">
            {/*5.1.1 ({name, age})在这里预先做展开  */}
            {({name, age}) => (
                <p>{name} ----- {age}</p>
            )}
        </Fetcher>
        
        {/* 5.2 需求：过滤器，可以过滤出指定标签类型, 如下 ，我只保留<p>标签*/}
        <Filter type="p">
            <h1>React</h1>
            <p>React 不错</p>
            <h1>Vue</h1>
            <p>Vue 不错</p>
        </Filter>

        {/* 5.3 修改props.Children的操作： */}
        <RadioGrop name="mvvm">
            <Radio value="vue">vue</Radio>
            <Radio value="react">react</Radio>
            <Radio value="angular">angular</Radio>
        </RadioGrop>
    </div>
}