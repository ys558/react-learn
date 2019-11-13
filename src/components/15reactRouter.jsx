/**
 * 1. npm i react-router-dom --save
 * 2. 官网：
 * https://reacttraining.com/react-router/web/guides/quick-start
 * 3. <Link>
 * 4. <Route >
 * 5. 动态传参
 * 6. <Switch>
 * 7. 404页面，匹配不到路由
 * 8. 路由嵌套结构
 * 9. Redirect
 * 10. 路由守卫：将普通的传递进来的<Route>封装成可以做校验功能的<Route>
 * 11. 路由守卫结合redux做简单登录页面
 * 	11.1 新建src\store\user.redux.js
 * 	11.2 定义reducer
 *  11.3 定义action
 *  11.4 更改src\store\index.js 里的combineReducer设置
 *  11.5 引入connect使用，并改写PrivateRoute
 */
import React from 'react'
import {BrowserRouter, Link, Route, Switch, Redirect} from 'react-router-dom'
// 11.5
import { connect } from 'react-redux'
import { login } from '../store/user.redux'



function Home () {
	return (<div>
		<h3>课程列表</h3>
		<ul>
			<li><Link to="/detail/web">Web</Link></li>
			<li><Link to="/detail/python">Python</Link></li>
		</ul>
	</div>)
}

function About () {
	return (
	<div>
		<h3>个人中心</h3>
		<div>
			<Link to="/about/me">个人信息</Link>{' | '}
			<Link to="/about/order">订单信息</Link>
		</div>
		{/* 8. 路由嵌套结构: */}
		<Switch>
			<Route path="/about/me" component={()=> <div>Me</div>}/>
			<Route path="/about/order" component={()=> <div>Order</div>}/>
			{/* 9. 重定向：如果乱输url，如：/about/xxx，会直接重定向到 /about/me */}
			<Redirect to="/about/me"/>
		</Switch>
	</div>)
}

// 6.
const NoMatch = ({location}) =>{
	return (<div>
		404,{'  '}{location.pathname}不存在
	</div>)
}
// 传递进来的props是路由器对象：
const Detail = (props) => {
	console.log(props)
	// 1. history：导航指令如：history.back()
		// action: "POP"
		// block: ƒ block(prompt)
		// createHref: ƒ createHref(location)
		// go: ƒ go(n)
		// goBack: ƒ goBack()
		// goForward: ƒ goForward()
		// length: 50
		// listen: ƒ listen(listener)
		// location: {pathname: "/detail/web", search: "", hash: "", state: undefined, key: "mivbl5"}
		// push: ƒ push(path, state)
		// replace: ƒ replace(path, state)
		// __proto__: Object

		
		// 2. location：当前url信息，如location.pathname
		// hash: ""
		// key: "mivbl5"
		// pathname: "/detail/web"
		// search: ""
		// state: undefined
		// __proto__: Object
		
		// 3. match: 获取参数信息
			// isExact: true
			// params: {course: "web"}
			// path: "/detail/:course"
			// url: "/detail/web"
			// __proto__: Object
			// staticContext: undefined
	return (<div>
		当前课程：{props.match.params.course} <br/>
		{/* 1. history：导航指令history.back() */}
		<button onClick={props.history.goBack}>后退</button>
	</div>)
}


// 10. 路由守卫：将普通的传递进来的<Route>封装成可以做校验功能的<Route>
// 希望在组件中的用法：<PrivateRoute component={About} path="/about" ...>
// 将封装后的component并起一个别名Comp, 
// isLogin:功能单独摘出来,存放在redux里，
// 其余属性用...rest接收
// 11.5 用connect改写，使其连接redux：
const PrivateRoute = connect(
	// !!!!!箭头函数除了return，也可用圆括号()
  // state => {return {isLogin:state.user.isLogin}}
  state => ({ isLogin:state.user.isLogin })
)(
	// 这里的component相当于<Route path="/about" component={About} />里的component={About}，即About组件
	// isLogin是自己添加的，判断是否能登录的条件
	// 其余不重要的参数用...rest接收
({component: Comp, isLogin, ...rest}) => {
  return(
    // render:根据条件动态渲染组件：
    <Route {...rest} render={
      props => isLogin ?
        <Comp/>
        : 
        <Redirect to={{
          pathname: "/login", 
          // 10.2 登录成功后去的地址：
          state: { redirect: props.location.pathname } }}
        />
    }/>
  )
})



// // 登录组件：
// 11.5 用connect改写，使其连接redux：
const Login = connect(
  state => ({
    isLogin: state.user.isLogin,
    loading: state.user.loading
  }),
  { login }
  )(
  // 11.3 解构src\store\user.redux.js里传来的action creator
  ({location, isLogin, login, loading }) => {
    // 10.2 登录成功后去的地址：
    const redirectUrl = location.state.redirect || '/';
    // 10.3 如果已经登录，则去地址：redirect
    if (isLogin) {
      return <Redirect to={redirectUrl}/>
    }
    return (
      <div>
        <p>用户登录</p>
        <hr/>
				<button onClick={login} disabled={loading}>
					{loading ? "登录中...": '登录'}
				</button>
      </div>
    )
  }
)


export default function ReactRouter() {
	return (
			<BrowserRouter>        
				<div>
					{/* 3. 页面链接<Link> */}
					<div>
						<Link to="/">首页</Link>{' | '}
						<Link to="/about">关于</Link>
					</div>

					{/* 6. 如果碰到404页面，那种写法，必须用上<Switch> 才能实现独占路由*/}
					<Switch>
					{/* 4. 路由配置：路由即组件，默认包容式路由 '/'主页必须加上exact才能变成独占路由*/}
						<Route exact path="/" component={Home} />

						{/* 5. 动态传参 */}
						<Route path="/detail/:course" component={Detail} />

						{/* 10、路由守卫的封装：PrivateRoute */}
						{/* <Route path="/about" component={About} /> */}
						<PrivateRoute path="/about" component={About} />
						<Route path="/login" component={Login} />

						{/* 7. 404页面，没有path，必然匹配 ，并且需写在最后*/}
						<Route component={NoMatch}/>
					</Switch>
				</div>
			</BrowserRouter>
	)
}
