import React, { Component, PureComponent } from "react";

// 容器组件 ：以下以评论区为例子：
// 0. 存在的问题：当组件有一点点发生变化时，虚拟dom总要不断发生更新，页面一复杂，性能开销极大
export default class ComponentIssue extends Component {
    constructor(props) {
        super(props);    
        this.state = {      
            comments: []
        };
    } 
    componentDidMount() {
        // 0. 模拟不断有人在评论区发布发布评论，且异步获得数据：
        setInterval(() => {
            this.setState({
                comments: [
                    { body: "react is very good", author: "facebook" },   
                    { body: "vue is very good", author: "youyuxi" }
                ]
            })}, 1000);
    }
    render() {
        return (
            <div>
            {this.state.comments.map((c, i) => (
                // 0. c为父组件的整个对象
                // <Comment key={i} data={c} />

                // 2. 优化办法二，这里不再传整个c对象：而将c直接展开用:
                // {...c} 等价于 body={c.body} author={c.author}
                <Comment key={i} {...c} />
                ))}
            </div>
        );
    } 
}


/**
	@传统class渲染存在的痛点
		重复渲染
 */
// class Comment extends Component {
//     render() {
// 				 //		0. 控制台打印的render comment会一直不断的执行，尽管页面的内容没有发生改变，class在其父组件发生更新时，
// 				// 子组件也一并会同时更新，会耗费过多性能
//        //解决办法见下面的123
//         console.log(`render comment`)
//         return (
//             <div>
//             <p>{this.props.body}</p>
//             <p> --- {this.props.author}</p>
//             </div>
//         );
//     }
// }

/**
	@优化办法一
	v15.3之前, 用shouldComponentUpdate生命周期钩子阻止无用更新：
 *  */ 
// class Comment extends Component {
// 	shouldComponentUpdate(nextProps) {
// 		// 手动对比父组件传过来的comments: []里的内容所有变量，如果实际内容有更新，才重新渲染：返回false:
// 		// 这里的nextProps为改组件的状态，this.props为父组件状态。
// 		if (nextProps.body === this.props.body && nextProps.author === this.props.author) return false
		
// 		return true
// 	}
// 	render() {
// 		// 这里就变成只打印两次：
// 		console.log(`render comment`)
// 		return (
// 			<div>
// 			<p>{this.props.body}</p>
// 			<p> --- {this.props.author}</p>
// 			</div>
// 	);
// }}


/**
	@优化办法二
	2. ：v15.3后，extends PureComponent，不再继承自普通Component, 组件会自行对比引用地址有没有发送变化，从而决定要不要重新渲染页面：	
	@但这种方法也有坑
	由于其只 做了浅比较，不可能去比较数组里面的对象值，所以在父组件里
	传过来的属性c需要改动成{...c}，把各个元素拆解开来展示
*/
// class Comment extends PureComponent {
// 	render() {
// 		// 仅输出两次：正常
// 		console.log(`render comment`)
// 		return (
// 			<div>
// 			<p>{this.props.body}</p>
// 			<p> --- {this.props.author}</p>
// 			</div>
// 		);
// }}


/**
 * @优化办法三
 * React v16.6.0 之后的版本，可使用 React.memo() 让函数式的组件也有PureComponent的功能
 * */ 
// React.memo是高阶组件（Higher-Order Component），即一个函数，接收一个组件，返回一个组件
// 类似于仅用于展示的function组件，这里面也不需要this：
const Comment = React.memo(props => {
		// 仅输出两次：正常
		console.log(`render comment`)
		return (
			<div>
				<p>{props.body}</p>
				<p> --- {props.author}</p>
			</div>
		)
	}
)