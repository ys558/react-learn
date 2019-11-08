import React, { Component } from 'react'

// 容器组件，父，用于控制逻辑
export default class CartSample extends Component {
    constructor(props){
        super(props)
        this.state={
            goods: [
                {id:1, text: 'web react course'},
                {id:2, text: 'python course'},
            ],
            text: '',
            cart: []
        }
        // 1.不写箭头函数，在这里绑定this：不然this指向Input输入框
        // this.textChange = this.textChange.bind(this)
    }

    // 1.不写箭头函数，在这里绑定this：
    // textChange(e){
    //     this.setState({text: e.target.value})
    // }

    // 2. 直接箭头函数，不用constructor里绑定this
    textChange = (e) => {
        this.setState({text: e.target.value})
    }

    addGood = () =>{
        // this.setState(prevState => (
        //     prevState.goods.push({
        //         id: prevState.goods.length + 1,
        //         text: prevState.text
        //     })
        // ))

        this.setState(newCourse => {
            return {goods: [ 
                ...this.state.goods, 
                { id: newCourse.goods.length + 1, text: newCourse.text }
            ]}        
        })
    }

    // 加购：
    addToCart = (good) => {
        // 数量一变，则整体更新购物车状态：更符合react思想
        const newCart = [...this.state.cart]
        const idx = newCart.findIndex(c => c.id === good.id)
        const item = newCart[idx]
        if (item) {
            newCart.splice(idx, 1, {...item, count: item.count +1 })
        }else{
            newCart.push({ ...good, count: 1})
        }
        
        this.setState({
            cart: newCart
        })
    }

    // 数量改变：
    add = (d) =>{
        const newCart = [...this.state.cart]
        const idx = newCart.findIndex(c => c.id === d.id)
        const item = newCart[idx]
        newCart.splice(idx, 1, {...item, count: item.count + 1 })
        this.setState({ cart: newCart })
    }

    minus = (d) => {
        const newCart = [...this.state.cart]
        const idx = newCart.findIndex(c => c.id === d.id)
        const item = newCart[idx]
        newCart.splice(idx, 1, {...item, count: item.count - 1 })
        this.setState({ cart: newCart })
    }

    btnStyle = {
        'border': 'none', 'borderRadius': '50%',
    }

    render() {
        // 方法1：
        // const title = this.props.title ? <h2>{this.props.title}</h2> : null;
        return (
            <div>
                {/* 条件渲染 */}
                    {/* 方法1： */}
                    {/* {title} */}
                    
                    {/* 方法2：短路逻辑 */}
                    {/* { this.props.title ? <h2>{this.props.title}</h2> : null} */}
                    {/* 或 */}
                    { this.props.title && <h2>{this.props.title}</h2>}

                    {/* 列表渲染 */}
                    <div>
                        <input type="text" value={this.state.text} onChange={this.textChange}/>
                        <button onClick={this.addGood}>Add</button>
                    </div>
                    <ul>
                        {this.state.goods.map( good => 
                            <li key={good.id}> 
                                {good.text}
                                {/* 直接传参的写法：在事件里写箭头函数，把整个good传进去 */}
                                <button onClick={()=>this.addToCart(good)}>加购</button>
                            </li>)}
                    </ul>

                {/* 购物车 */}
                <Cart 
                    data={this.state.cart}
                    // 3.组件通信：子——>父,从子组件里过来的方法：
                    minus={this.minus}
                    add={this.add}
                    btnStyle={this.btnStyle}
                ></Cart>
            </div>
        )
    }
}

// 展示组件：子，仅用于展示
// 3. 组件通信：子——>父，直接在（）里放置函数事件：给回父组件
function Cart({data, minus, add, btnStyle}) {
    return (
        <table>
            <tbody>
                {data.map(d => (
                    // 函数型组件，连this都不需要：
                    <tr key={d.id}>
                        <td>{d.text}</td>
                        <td>
                            {/* 3.  组件通信：子——>父，直接在事件里传d */}
                            <button style={btnStyle} onClick={()=> minus(d)}>-</button>
                                {d.count}
                            <button style={btnStyle} onClick={()=> add(d)}>+</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
