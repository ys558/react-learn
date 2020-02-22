/**
 * @官方接口React.Children的使用
 */
import React from 'react'

// -- 过滤出Filter里的p标签
// 方法1：这种方法可以，但如果虚拟dom解构复杂的话，不建议用，会发生不可名状的错误
// const Filter = props => props.children.filter(item => item.type==='p')
// 方法2：推荐使用官方的顶级接口React.Children.map
// https://reactjs.org/docs/react-api.html#reactchildren
const Filter = ({children}) => React.Children.map(children, child => child.type==='p'? child : null )

// -- 把父组件上的属性放到每一个children上作为children的属性
const RadioGroup = ({children, name}) => React.Children.map(children,
	// https://reactjs.org/docs/react-api.html#cloneelement
	// 这里改变
	child => React.cloneElement(child, {name})
)
// 这里不能直接(props) => ..., 因父组件<Radio></Radio>是双标签，而这里的<input/>是单标签，不能互包，否则，页面报错如下：
// Error: input is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.
const Radio = ({children, ...props}) => <label>
	<input type="radio" {...props}/>
	{children}
</label>

export default class Composition3 extends React.Component {
	render() {
		return <div>
			<Filter>
				<h1>react</h1>
				<p>react很不错</p>
				<h1>vue</h1>
				<p>vue很不错</p>
			</Filter>

			<RadioGroup name='mvvm'>
				<Radio value="vue">vue</Radio>
				<Radio value="react">react</Radio>
				<Radio value="angular">angular</Radio>
			</RadioGroup>
		</div>
	}
}