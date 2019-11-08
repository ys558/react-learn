import React, { Component } from 'react'
import {Input, Button} from 'antd'

// 创建一个高阶组件，扩展现有表单，事件处理、数据搜集、校验：
function YYFormCreate(Comp) {
    return class extends Component {
        constructor(props) {
            super(props)
            this.options = {}
            this.state = {}
        }
    
        // 创建一个input包装器：实现Input校验
        getFieldDec = (field, option) => {
            this.options[field] = option;
            return InputComp => (
                <div>
                    {React.cloneElement(InputComp, {
                        name: field,
                        value: this.state[field] || '',
                        onChange: this.handleChange
                    })}
                </div>
            )
        }
    
        handleChange = (e) => {
            const {name, value} = e.target
            console.log(name, value)
            this.setState({[name]: value }, () => {
                // setState是异步的，利用其回调函数，确保值发生变化后再做校验，
            })
        }

        render(){
            return <Comp getFieldDec={this.getFieldDec}/>
        }

        validateField = field => {
            // 1. 获取校验规则：
            const rules = this.options[field].rules;
            rules.some(rule => {
                if (!this.state[field]) {
                    this.setState({
                        [`${field} Message`] : rule.message
                    })
                    return true 
                }
            })
        }
    }
}

@YYFormCreate
class MockAntdForm extends Component {
    onSubmit = () => console.log('submit')
    render() {
        const {getFieldDec} = this.props;
        return (
            <div>
            {getFieldDec(
                    'uname', 
                    {rules: [{ required: true, message: `用户名必填` }]}
            )(<Input type="text"/>)}
            {getFieldDec(
                    'pwd', 
                    {rules: [{ required: true, message: `密码必填` }]}
            )(<Input type="password"/>)}
            <Button onClick={this.onSubmit}>登录</Button>
            </div>
        )
    }
}

export default MockAntdForm;