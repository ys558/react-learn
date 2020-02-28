import React, { Component } from 'react'
import { connect } from 'react-redux'
import {plus, minus, syncPlus} from '../store/13counter.reducer'

// 13. 将这里的state提取成独立文件src\store\13counter.reducer.js
const mapStateToProps = state => ({num: state.counter}) 
// 13. 将这里的action提取成独立文件src\store\13counter.reducer.js
const mapDispatchToProps = { plus, minus, syncPlus }

@connect( mapStateToProps, mapDispatchToProps )
class BaseReduxModulization extends Component {
	render(){
		return ( 
			<div>
				<p>{this.props.num}</p>
				<button onClick={()=>this.props.plus(2)}>+2</button>
				<button onClick={this.props.minus}>-</button>
				<button onClick={()=> this.props.syncPlus(3)}>async+3</button>
			</div>
		)
	}
}
export default BaseReduxModulization