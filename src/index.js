import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
// 对应src\components\13-01simpleRedux.jsx解开：
import store from './components/13-01store'

ReactDOM.render(<App />, document.getElementById('root'))
// // 5.2 store.subscribe()启用ReactDOM.render()，如果一有状态更新，则立即更新ReactDOM.render()重新渲染页面

// 对应src\components\13-01simpleRedux.jsx解开：
store.subscribe(()=>ReactDOM.render(<App />, document.getElementById('root')))

serviceWorker.unregister();
