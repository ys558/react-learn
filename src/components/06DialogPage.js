import React, { Component } from 'react'
import Dialog from './06DialogComponent/Dialog'

export default class Portal extends Component {
  constructor(props) {
    super(props)
    this.state = { showDialog: false }
  }

  handleShowDialog = () => this.setState({ showDialog:!this.state.showDialog }) 

  render(){
    const {showDialog} = this.state
    return <div>
      <h1>DialogPage</h1>
      <button onClick={this.handleShowDialog}>dialog show</button>
      {/* 这样只会显示在该页面里, 如果要显示在整个页面的body里,则需要用portal: */}
      { showDialog && <Dialog/> }
    </div>
  }
}
