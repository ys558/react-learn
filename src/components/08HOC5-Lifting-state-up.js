import React from 'react'

//不改变原来Input的代码,提取input输入框的输入属性,成为高阶组件,实现双向数据绑定; 并将输入框改变一下样式
const handleValChange = (WrapComp) => class extends React.Component {
  state ={ value: '' }
  handleValChange = e => this.setState({ value: e.target.value }, console.log(this.state.value)) 
  render(){
    const newProps = { controlledProps:{value: this.state.value, onChange: this.handleValChange}}
    // (2). 用其他组件包装组件
    return <div style={{ backgroundColor: 'grey'}}>
        <WrapComp {...this.props} {...newProps}></WrapComp>
      </div>
  }
}

// class Input extends React.Component {
//   render(){
//     return <input name='simple' {...this.props.controlledProps}/>
//   }
// }

// (4). 组件状态提升
// Input的输入属性全部提取出来, 交由高阶组件handleValChange维护
const Input = ({controlledProps}) => <input name='simple' {...controlledProps}/>

const StatusPromotionInput = handleValChange(Input)

export default StatusPromotionInput