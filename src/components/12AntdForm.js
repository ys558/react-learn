/**
 * antd的表单控件：很显然，通过高阶组件实现
 */

import React from 'react';
import { Form, Icon, Input, Button } from "antd";

class NormalLoginForm extends React.Component {
handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
    if (!err) {
        console.log("Received values of form: ", values);
    }
    });
};

render() {
    // 2. 从高阶组件里拿出getFieldDecorator api
    const { getFieldDecorator } = this.props.form;
    return (
    <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
            {/* 2.1 从这里可以看出：getFieldDecorator("userName", rules)(<Input/>)方法，接收两个参数，传入<Input/>组件，给该方法校验 */}
            {getFieldDecorator("userName", {
                rules: [{ required: true, message: "Please input your username!" }]
            })(
                <Input
                    prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                    placeholder="Username"
                />
            )}
        </Form.Item>
        <Form.Item>
            {getFieldDecorator("password", {
                rules: [{ required: true, message: "Please input your Password!" }]
            })(
                <Input
                prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                type="password"
                placeholder="Password"
                />
            )}
        </Form.Item>
        <Form.Item>
            <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
            >
                Log in
            </Button>
        </Form.Item>
    </Form>
    );
}
}

// 1. 可以发现：WrappedNormalLoginForm为高阶组件：封装form，把普通的form封装成可以校验的form，Form.create就是他封装的方法：
const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
    NormalLoginForm
);

export default WrappedNormalLoginForm;