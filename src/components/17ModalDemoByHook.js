import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const ModalByHook = () => {
  const newNode = window.document.createElement('div')
  const node = window.document.body.appendChild(newNode)
  
  const [showModal, setShowModal] = useState(false)
  useEffect(() => () => window.document.body.removeChild(node), [node])

  return (<div>
    <h1>Modal</h1>
    <button onClick={ ()=> setShowModal(!showModal) }>open Modal</button>
    {showModal && 
      <Modal 
        showModal={showModal}
        setShowModal={setShowModal}
        node={node}
      />
    }
  </div>)
}

const Modal = ({showModal, setShowModal, node}) => 
  createPortal(<div style={getModalStyle()}>
    <button style={getBtnStyle()} onClick={()=> setShowModal(!showModal)}>close</button>
  </div>, node)

export default ModalByHook;

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