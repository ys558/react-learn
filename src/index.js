import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
// 13.1
import store  from './store/13.1store'
// 13.2
// import store from './store/13.2store'
// import { Provider } from 'react-redux';
// 13.3
// import store from './store/13.3myStore'

//13.1 subscribe
// ReactDOM.render(<App />, document.getElementById('root'))
// store.subscribe(() => ReactDOM.render(<App />, document.getElementById('root')))

//13.2 使用<Provider></Provider>上下文传参:
// ReactDOM.render(
//     <Provider store={store}>
//       <App />
//     </Provider>
//     ,
//     document.getElementById('root'))
  
// 13.3 subscribe的作用--订阅, 往store里塞若干函数,形成一个回调函数的数组:
ReactDOM.render(<App />, document.getElementById('root'))
store.subscribe(() => ReactDOM.render(<App />, document.getElementById('root')))

serviceWorker.unregister();
