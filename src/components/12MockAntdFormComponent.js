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
            this.setState({[name]: value })
        }
        
        render(){
            return <Comp getFieldDec={this.getFieldDec}/>
        }
    }
}

@YYFormCreate
class MockAntdForm extends Component {
    render() {
        const {getFieldDec} = this.props;
        return (
            <div>
            {getFieldDec(
                    'username', 
                    {rules: [{ required: true, message: `用户名必填` }]}
            )(<Input/>)}
            <Button>登录</Button>
            </div>
        )
    }
}

export default MockAntdForm;