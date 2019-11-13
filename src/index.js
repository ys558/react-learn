import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
// 5.1导入store
// import store from './components/13BaseReduxStore'

ReactDOM.render(<App />, document.getElementById('root'))
// // 5.2 store.subscribe()启用ReactDOM.render()，如果一有状态更新，则立即更新ReactDOM.render()重新渲染页面
// store.subscribe(()=>ReactDOM.render(<App />, document.getElementById('root')))

serviceWorker.unregister();
