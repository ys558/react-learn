import React from 'react'
/**
 * @复合组件
 * @属性和Children
 * 
 */
function ChildrenAndProps(props) {
	return <div>
		<h2>{props.children}</h2>
		<h2>{props.hehe}</h2>
	</div>
}

// 2. 只提供样式的Dialog： 
const Dialog = props => 
<div style={{ border: `4px solid ${props.color || 'blue' }` }}>
	{props.children}
	<div className="footer">
		{props.footer}
	</div>
</div>

const WelcomDialog = props => <Dialog {...props}>
			<h1>欢饮光临</h1>
			<p>感谢使用react</p>
		</Dialog>


export default class Composition extends React.Component {
	render() {
		// 2.2 footer
		const footer = <button onClick={() => alert(`confirm`)}>click</button>
		return <div>
			{/* 1. */}
			<ChildrenAndProps hehe="我是<ChildrenAndProps></ChildrenAndProps>上的hehe属性, 用'props.属性名'拿到 即props.hehe">
					<p>我是ChildrenAndProps组件包着的标签及内容，在子组件里用props.children拿到</p>
			</ChildrenAndProps>
			
			{/* 2. WelcomDialog为一个复合组件：*/}
			<WelcomDialog color="green" footer={footer} />
		</div>
	}
}