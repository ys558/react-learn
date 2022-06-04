import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
import { createRoot } from 'react-dom/client';

// 13.1
// import store  from './store/13.1store'
// 13.2
// import store from './store/13.2store'
// import { Provider } from 'react-redux';
// 13.3
// import { Provider } from 'react-redux';
// import store from './store/13.3store'
// 13.4 13.5公用一个sotre:
// import store from './store/13.4myStore'
// 13.5
// import { Provider } from './store/13.5myReactRedux';


//13.1 subscribe
// ReactDOM.render(<App />, document.getElementById('root'))
// store.subscribe(() => ReactDOM.render(<App />, document.getElementById('root')))

//13.2 使用react-redux里的<Provider></Provider>上下文传参:
// 13.3
// ReactDOM.render(
//     <Provider store={store}>
//       <App />
//     </Provider>
//     ,
//     document.getElementById('root'))

// 13.4 subscribe的作用--订阅, 往store里塞若干函数,形成一个回调函数的数组:
// ReactDOM.render(<App />, document.getElementById('root'))
// store.subscribe(() => ReactDOM.render(<App />, document.getElementById('root')))

// 13.5 自行定义的myReactRedux应用:
// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>, 
// document.getElementById('root'))

// react 18:
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);

serviceWorker.unregister();
