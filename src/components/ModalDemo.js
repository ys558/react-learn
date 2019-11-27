import React, { Component } from 'react'

export default class ModalDemo extends Component {
  render() {
    return (
      <Modal>
      </Modal>
    )
  }
}

const Modal = () => {
  const modalStyle = {border:'2px solid', width: '300px', height:'200px'}
  return <div style={modalStyle}>
    <button>1111111111</button>
  </div>
}


