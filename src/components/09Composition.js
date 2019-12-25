import React from 'react'

function PropsChildrenNPropsShuxing(props) {
    return <div>
        <h2>{props.children}</h2>
        <h2>{props.hehe}</h2>
    </div>
}

function Dialog(props) {
    return <div style={{ border: `4px solid ${props.color || 'blue'}` }}>
        {props.children}
        <footer>
            {props.footer}
        </footer>
    </div>
}


function WelcomDialog(props) {
    return (
        <Dialog {...props}>
            <h1>欢饮光临</h1>
            <p>感谢使用react</p>
        </Dialog>
    )
}


const Api = {
    getUser() {
        return { name: 'hehe', age: 20 }
    }
}

function Fetcher(props) {
    const user = Api[props.name]();
    return props.children(user)
}

function Filter({ children, type }) {
    return (
        <div>
            {/* 5.2 React官方提供的：React.Children */}
            {React.Children.map(children, child => child.type == type ? child : null)}
        </div>
    )
}

function RadioGrop(props) {
    return (
        <div>
            {React.Children.map(props.children, child => {
                return React.cloneElement(child, { name: props.name })
            })}
        </div>)
}

function Radio({ children, ...rest }) {
    return (
        <label>
            <input type="radio" {...rest} />
            {children}
        </label>
    )
}


export default class Composition extends React.Component {
    render() {
        const footer = <button onClick={() => alert(`comfirm`)}>从父组件传来的属性，一个按钮</button>
        return <div>
            <PropsChildrenNPropsShuxing hehe="我是<PropsChildrenNPropsShuxing></PropsChildrenNPropsShuxing>上的hehe属性">
                <p>我是PropsChildrenNPropsShuxing组件包着的标签及内容，在子组件里用props.children拿到</p>
            </PropsChildrenNPropsShuxing>

            <WelcomDialog color="green" footer={footer} />

            <Fetcher name="getUser">
                {/*5.1.1 ({name, age})在这里预先做展开  */}
                {({ name, age }) => (
                    <p>{name} ----- {age}</p>
                )}
            </Fetcher>

            <Filter type="p">
                <h1>React</h1>
                <p>React 不错</p>
                <h1>Vue</h1>
                <p>Vue 不错</p>
            </Filter>

            <RadioGrop name="mvvm">
                <Radio value="vue">vue</Radio>
                <Radio value="react">react</Radio>
                <Radio value="angular">angular</Radio>
            </RadioGrop>

            <hr />

        </div>
    }
}