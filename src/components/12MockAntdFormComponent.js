import React, { Component } from 'react'
import { Input, Button } from 'antd'

// 1. 创建一个高阶组件，扩展现有表单，事件处理、数据搜集、校验：
const YYFormCreate = (Comp) => class extends Component {
	constructor(props) {
		super(props)
		this.options = {}
		this.state = {}
	}

	// 单向校验
	validateField = field => {
		// 1. 获取校验规则：
		const rules = this.options[field].rules;
		// 任意一项失败，则返回false
		const result = !rules.some(rule => {
			if (rule.required) {
				if (!this.state[field]) {
					this.setState({
						[field + "Message"]: rule.message
					})
					return true
				}
			}
		})
		if (result) {
			this.setState({ [field + "Message"]: '' })
		}
		return result
	}

	// 校验所有字段
	validate = callback => {
		// results 会得到一个含有true，false的数组
		const results = Object.keys(this.options).map(field => this.validateField(field))
		const result = results.every(v => v == true)
		callback(result, this.state)
	}

	// 创建一个input包装器：实现Input校验：
	getFieldDec = (field, option) => {
		this.options[field] = option;
		return InputComp => (
			<div>
				{/* React.cloneElement() 具体见*/}
				{React.cloneElement(InputComp, {
					name: field,
					value: this.state[field] || '',
					onChange: this.handleChange
				})}
				{/* 校验错误的信息： */}
				{/*  [field +"Message"]为es6的属性名计算 */}
				{this.state[field + "Message"] && (
					<p style={{ color: 'red' }}>{this.state[field + "Message"]}</p>
				)}
			</div>
		)
	}

	handleChange = (e) => {
		const { name, value } = e.target
		console.log(name, value)
		this.setState({ [name]: value }, () => {
			// setState是异步的，利用其回调函数，确保值发生变化后再做校验，
			this.validateField(name)
		})
	}

	render() {
		return <Comp getFieldDec={this.getFieldDec} validate={this.validate} />
	}
}


@YYFormCreate
class MockAntdForm extends Component {
	onSubmit = () => {
		this.props.validate((isValid, data) => {
			if (isValid) {
				// 提交登录
				console.log('登录：', data)
			} else {
				alert('校验失败')
			}
		})
	}
	render() {
		const { getFieldDec } = this.props;
		return (
			<div>
				{getFieldDec(
					'uname',
					{ rules: [{ required: true, message: `用户名必填` }] }
				)(<Input type="text" />)}
				{getFieldDec(
					'pwd',
					{ rules: [{ required: true, message: `密码必填` }] }
				)(<Input type="password" />)}
				<Button onClick={this.onSubmit}>登录</Button>
			</div>
		)
	}
}

export default MockAntdForm;