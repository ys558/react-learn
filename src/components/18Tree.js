import React, {Component, useState} from 'react'
import classnames from 'classnames'
import './18Tree.css'

const treeData = { key: 0, title: '全国', children: [
    { key: 6, title: '北方地区', children:[
      {key:1, title: '黑龙江', children: [{key: 6, title: '哈尔滨'}]},
      {key:2, title: '北京'},
    ]},
    { key: 3, title: '南方地区', children:[
      {key:4, title: '上海'},
      {key:5, title: '广州'},
    ]}
  ]}


// class TreeNode extends Component {
//   constructor(props){
//     super(props)
//     this.state ={expanded: false}
//   }
//   handleExpaned=()=> this.setState({ expanded: !this.state.expanded})
//   render(){
//   const {title, children} = this.props.data
//   const {expanded} = this.state
//   const hasChildren = children && children.length > 0 
//   return <div>
//     <div className="nodesInner" onClick={this.handleExpaned}>
//       {hasChildren && <span className={classnames('tri', expanded ? 'tri-open': 'tri-close')}></span>}
//       <span>{title}</span>
//     </div>
//     { hasChildren && expanded && 
//       <div className="children">
//         {/* 递归调用自身:  */}
//         { children.map(item => <TreeNode key={item.key} data={item}/>)}
//       </div>}
//   </div>
//   }
// }

const Tree = () => <div><TreeNode data={treeData}/></div>

// 改为hook写法:
const TreeNode = props => {
  const {title, children} = props.data
  const [expanded, setExpanded] = useState(false)
  const hasChildren = children && children.length > 0

  return <div>
    <div className="nodesInner" onClick={()=> setExpanded(!expanded)}>
      {hasChildren && <span className={classnames('tri', expanded ? 'tri-open': 'tri-close')}></span>}
      <span>{title}</span>
    </div>
    { hasChildren && expanded && 
      <div className="children">
        {/* 递归调用自身:  */}
        { children.map(i => <TreeNode key={i.key} data={i}/>) }
      </div>}
</div>
}

export default Tree