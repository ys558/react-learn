import React, { Component } from 'react'

class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (<img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />)
  }
}

// class MouseWithCat extends Component {
class Mouse extends Component {
  constructor(props){
    super(props); 
    this.state ={ x:0, y:0}
  }

  handleMouseMove = e => this.setState({ x: e.clientX, y: e.clientY })
  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
        {/* <Cat mouse={this.state} /> */}
        {this.props.render(this.state)}
      </div>
    )
  }
}

export default class extends React.Component {
  render() {
    return (
      <div>
        <h1>移动鼠标!</h1>
        {/* <MouseWithCat /> */}

        {/* 將兩個組件整合在一起：用一個屬性render */}
        {/* 這裏的mouse就是Mouse組件本身 */}
        <Mouse 
          render={ mouse => <Cat mouse={mouse} /> } 
        />
      </div>
    );
  }
}