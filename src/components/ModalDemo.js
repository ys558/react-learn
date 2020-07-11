import React, { Component } from "react";
import { createPortal } from "react-dom";

/* 方法1: 自己写 */
class ModalDemo extends Component {
  constructor(props) {
    super(props);
    this.state = { showDialog: false };

    /* 方法2.1: 将class Modal改为函数式写法: */ 
    const doc = window.document
    this.node = doc.createElement('div')
    this.newNode = doc.body.appendChild(this.node)
  }
  handleModalShow = () => this.setState({ showDialog: !this.state.showDialog });
  render() {
    const { showDialog } = this.state;
    return (
      <div>
        <h1>Modal</h1>
        <button onClick={this.handleModalShow}>open Modal</button>
        {showDialog && 
          <Modal 
            hideModal={this.handleModalShow} 
            /* 方法2.1: 将class Modal改为函数式写法: */ 
            node={this.newNode}
          />
        }
      </div>
    );
  }
}

/* 方法1: 自己写 */
// const Modal = ({hideModal}) => {
//   return (
//     <div style={getModalStyle()}>
//       <button style={getBtnStyle()} onClick={hideModal}>
//         close
//       </button>
//     </div>
//   ); 
// };

/* 方法2: 利用createPortal, 将弹框放在想要出现的层级, 这里放body里 */
// class Modal extends Component {
//   constructor(props) {
//     super(props)
//     const doc = window.document
//     this.node = doc.createElement('div')
//     doc.body.appendChild(this.node)
//   }
//   render(){
//     return(
//     createPortal(
//       <div style={getModalStyle()}>
//         <button style={getBtnStyle()} onClick={this.props.hideModal}>close</button>
//       </div>, this.node
//       )
//     )
//   }
// }

/* 方法2.1: 将class Modal改为函数式写法*/ 
const Modal = ({hideModal, node}) => createPortal(<div style={getModalStyle()}>
    <button style={getBtnStyle()} onClick={hideModal}>close</button>
  </div>, node)

const getModalStyle = () => ({
    border: "1px solid",
    width: "500px",
    height: "500px",});
const getBtnStyle = () => ({
    border: "none",
    color: "#fff",
    backgroundColor: "#ff0000",
    padding: "10px 12px",
  });

export default ModalDemo;
