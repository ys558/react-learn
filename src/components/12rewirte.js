/**
 * 将上一个例子重写一遍，并加上注释
 */
import React, { Component } from 'react'
import {Input, Button} from 'antd'

// 1.
const YForm = (Comp) => {

	return class extends Component {
		constructor(props) {
			super(props)
			this.options = {}
			this.state={}
		}
		
		handleChange = (e) => {
			// 7. name就是
			const { name, value } = e.target
			// 11. 尝试打印验证正确性
			console.log(name, value)
			this.setState({ [name]: value }, () => {
				// 12. 对写进来的字段进行校验：
				// setState里的回调函数：确保值发送变化后再进行校验：
				this.validateField(name)
			})
		}
 
		// 12. 
		validateField = (field) => {
			// 13. 获取校验规则：getFiledDecorator里保存的this.options[field] = option
			const rules = this.options[field].rules

			// 14. some函数，如果有一个元素满足条件，则表达式返回true , 剩余元素不会再执行检测。如果没有满足条件的元素，则返回false
			const result = !rules.some(rule => {				
				if (rule.required) {
					if (!this.state[field]) {
						// 15. 校验失败：显示错误信息：
						this.setState({
							// 16. 计算属性，拼出错误信息，如：unameMessage, pwdMessage，要显示的值对应为：'用户名必填'，'密码必填'
							[field+'Message'] : rule.message
						})
						// 17. rules.some()有满足条件的返回true，在这里表示校验不通过为true，有点不符合现实逻辑，所以取反，为false，用变量result保存起来。
						return true;
					}
				}
			})

			if (result) {
				// 17. 校验通过，不显示'用户名必填'，'密码必填'
				this.setState({ [field+"Message"] : '' })
			}
			return result
		}

	// 18. 校验所有字段：校验结果出来后调用回调函数callback
		validate = (callback) => {
			// 20. 结果为得到一个含有true，false的数组
			const results = Object.keys(this.options).map(
				// 19. 将所有字段一一传给this.validateField()进行校验：
				field => this.validateField(field)
			)
			// 21. 这个数组里必须每一项every都为ture：
			const allResult = results.every(v => v===true)
			// 22. 将最终结果放在回调里返回：而且，把记录下来的state，即输入的值传出去
			callback(allResult, this.state)
		}

	// 2. 创建Input包装的函数：
		getFiledDecorator = (field, option) => {
			// 3. 保存当前输入项的配置rules
			this.options[field] = option

			// 4.InputComp为包装后的强化过的<Input/>组件，
			return InputComp => (
				// 5. 传进来的<Input/>框为vdom，必须用 React.cloneElement方法才能进行修改
				<div>
					{React.cloneElement(InputComp, {
						// 6. 规定传进来的name：即平时写的<input name=""/>里的name
						name: field,
						// 6. value即为<input value=""/>里的value, 这里
						value: this.state[field] || '',
						// 6. onChange重写：
						onChange: this.handleChange
					})}
					{/* 26. 显示校验的错误信息，短路逻辑：*/}
					{this.state[field + 'Message'] &&
						(<p style={{color: 'red'}}>{this.state[field+'Message']}</p>)
					}
				</div>
		)
	}
		render() {
			// 8. 把getFiledDecorator挂载在<Comp>组件上，才能在父类中使用
			return (<Comp getFiledDecorator={this.getFiledDecorator}
				// 23. 把validate挂载在Comp上
				validate={this.validate}>
			</Comp>)

		}
	}
}

@YForm
class Rewirte extends Component {
	onSubmit = () => {
		console.log('submit')
		// 24. 提交的时候，拿出<Comp>上的validate()函数
		this.props.validate((isValid, data) => {
			if (isValid) {
				// 25. 提交登录
				console.log('登录', data)
			} else {
				alert('校验失败')
			}
		})
	}
	render() {
		// 9. 把getFiledDecorator结构出来：
		const {getFiledDecorator} = this.props
		return (
			<div>
				{/* 10. 将<Input type="text" />放在getFiledDecorator()()执行使用 */}
				{getFiledDecorator(
					'uname',
					// 10. 这里rules就是上面的option, 自己定的规则：
					{ rules: [{ required: true, message: '用户名必填' }] }
				)(<Input type="text" />)}
				{getFiledDecorator(
					'pwd',
					{ rules: [{ required: true, message: '密码必填' }] }
				)(<Input type="password"/>)}
				<Button onClick={this.onSubmit}>提交</Button>
			</div>
		)
	}
}

export default Rewirte;