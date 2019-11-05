import React, { Component, PureComponent } from "react";
 
// 容器组件 
export default class ComponentIssue extends Component {
    constructor(props) {
        super(props);    
        this.state = {      
            comments: []
        };
    } 
    componentDidMount() {
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
            {/* 具体见控制台,
            子组件的console.log(`render comment`)，
            执行了两次，优化办法见下面注释1.2. */}
            {this.state.comments.map((c, i) => (
                // <Comment key={i} data={c} />
                // 2. 优化，这里不再传整个c对象：而将c直接展开用
                // {...c} 等价于 body={c.body} author={c.author}
                <Comment key={i} {...c} />
                ))}
            </div>
        );
    } 
}


// 1. 优化办法：shouldComponentUpdate阻止无用更新：
// class Comment extends Component {
//     shouldComponentUpdate(nextProps){
//         if (nextProps.data.body === this.props.data.body &&
//             nextProps.data.author === this.props.data.author) {
//                 return false
//         }
//         return true
//     }
//     render() {
//         console.log(`render comment`)
//         return (
//             <div>
//             <p>{this.props.data.body}</p>
//             <p> --- {this.props.data.author}</p>
//             </div>
//         );
// }}


// 2. 优化办法：v15.3后，extends PureComponent, 但这种有坑，由于其只 做了浅比较，
// 不可能去比较数组里面的值，所以上面传过来c需要改动，把各个元素拆解开来
// class Comment extends PureComponent {
//     render() {
//         // 输出两次：
//         console.log(`render comment`)
//         return (
//             <div>
//             <p>{this.props.body}</p>
//             <p> --- {this.props.author}</p>
//             </div>
//         );
// }}


// 3. 优化办法：React v16.6.0 之后的版本，可以使用 React.memo 让函数式的组件也有PureComponent的功能，这样函数型组件也能使用PureComponent的功能
// React.memo是高阶组件（Higher-Order Component），即一个纯函数，接收一个组件，返回一个组件
const Comment = React.memo((props) => {
        console.log(`render comment`)
        return (
            <div>
            <p>{props.body}</p>
            <p> --- {props.author}</p>
            </div>
        )
    }
)