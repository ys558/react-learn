import React, { Component, useState } from 'react'

// 1. 回调函数 子 ——> 父 传参：，class类型
// const Child = ({ onClick }) => <button onClick={()=> onClick('child data')}>click me, pass data to parent Component</button>

// class ParentComp extends Component {
//   state = { data: '' }
//   render() {
//     return <div>
//       <Child onClick={ data => this.setState({ data })} />
//       {this.state.data}
//     </div>
//   }
// }


// 2. hooks 子 ——> 父 传参
const Child = ({ setData }) => <button onClick={()=> setData('data fr Child')}>click me, pass data to parent Component</button>
const ParentComp = () => {
  const [data, setData] = useState('')
  return <div>
    <Child setData={setData} />
    {data}
  </div>
}

export default ParentComp