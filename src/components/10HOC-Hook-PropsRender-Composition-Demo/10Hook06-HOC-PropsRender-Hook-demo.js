import React, { Component } from 'react'

const LengthValue = WrapComponent => class extends Component {
  state = { value: this.props.initialValue }
  onChange = e => {
    this.setState({ value: e.target.value })
    if (this.props.onChange) this.props.onChange(e.target.value)
  }
  render(){
    return <WrapComponent value={this.state.value} onChange={this.onChange}/>
  }
}

const BaseInput = ({initialValue}) => <>
  {initialValue}
  <input />
  </>

const Input = LengthValue(BaseInput)

export { Input };