import React, { Component } from 'react'

const Modal = () => {
  return  <div style={getModalStyle()}>
    <button style={getBtnStyle()}>close</button>
  </div>
}

class ModalDemo extends Component {
  render() {
    return (
      <div>

        <Modal></Modal>
      </div>
    )
  }
}

const getModalStyle = () => {
  return {
    boxSizing: 'border-box', 
    border: '1px solid',
    width:'800px',
    height:'500px',
    position: 'relative'
  }
}
const getBtnStyle = () => {
  return {
    position: 'absolute',
    top: '87%', 
    left: '86%',
    border:'none',
    color: '#fff',
    backgroundColor: '#ff0000',
    padding: '10px 12px'
  }
}

export default ModalDemo