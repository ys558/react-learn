/**
 * 1. npm i react-router-dom --save
 * 2. 官网：
 * https://reacttraining.com/react-router/web/guides/quick-start
 * 3. <BrowserRouter></BrowserRouter> 根组件
 * 4. <Link></Link>地址栏
 * 5. <Route/>对应上面地址栏的产出对应的Component, 但不独占
 * 6. <Switch></Switch> 用Switch进行路由匹配独占, 但必须把根'/'路由放在最后
 * 		另一种方法: 直接在Route上加excact
 * 7. 路由的参数及动态传参: {match, history, location}
 * 8. 路由嵌套结构
 * 9. Redirect
 * 10. 404页面，匹配不到路由
 * 
 * 11. 路由守卫：将普通的传递进来的<Route>封装成可以做校验功能的<Route>
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
import { login } from '../store/15user.redux' 

const ProductList = () => <div>
		<h3>Products List</h3>
		<Link to='/detail/web'>web 全栈</Link>
	</div>

const ProductManagement = () => <div>
		<h3>Products Management</h3>
		{/* 8. */}
		<Link to='/management/add'>新增</Link>&nbsp;|&nbsp;
		<Link to='/management/search'>搜索</Link>
		<Route path='/management/add' component={()=><div>add</div>}/>
		<Route path='/management/search' component={()=><div>search</div>}/>
		{/* 9. 当进入该页面/management时,可以直接重定向到/management/add */}
		<Redirect to='/management/add'></Redirect>
	</div>

const Detail = ({match, history, location}) => {
	// 7.
	console.log(match, history, location)
	// Object { path: "/detail/:name", url: "/detail/web", isExact: true, params: Object { name: "xx" } }
	// Object { length: 50, action: "POP", location: {…}, createHref: createHref(location), push: push(path, state), replace: replace(path, state), go: go(n), goBack: goBack(), goForward: goForward(), block: block(prompt)
	// , … }
	// Object { pathname: "/detail/web", search: "", hash: "", state: undefined, key: "evegm9" }
	return <div>
		<h4>Product Detail</h4>
		{/* 7. 这里由ProductList里的<Link></Link>;如果此时地址栏直接输入/detail/xx, 这里就会显示xx;  */}
		{match.params.name}
		<button onClick={()=> history.goBack()}>Back</button>
	</div>
}

export const ReactRouter = () => 
		// 3. 顶层添加BrowserRouter 
		<BrowserRouter>        
			<nav>
				{/* 4. */}
				<Link to='/'>Product List</Link>&nbsp;|&nbsp;
				<Link to='/management'>Product Management</Link>
			</nav>

			{/* 6. 路由匹配是非独占的: 用Switch包着才能独占, 但根路径'/'须放到最后;*/} 
			<Switch>
				{/* 6. 另一种方法, 在每个<Route/>上加exact属性, 就不需Switch:*/}
					{/* 5. 路由配置, 对应上面的<Link></Link> */}
				<Route exact path="/" component={ProductList}/>
				{/* 7.  */}
				<Route path="/detail/:name" component={Detail}/>
				{/* 11. 路由守卫 */}
				<PrivateRoute path="/management" component={ProductManagement} />
				{/* 11. 用于演示路由守卫 */}
				<Route path='/login' component={Login}/>
				{/* 10. 404页面!!!!必须写在最后, */}
				<Route component={()=><h3>404 页面不存在</h3>}/>
			</Switch>
		</BrowserRouter>

// 11. 路由守卫：将普通的传递进来的<Route>封装成可以做校验功能的<Route>
const PrivateRoute = connect(
	// 这里只需拿到redux里的isLogined状态:
	state => ({isLogined: state.user.isLogined})
)(({component: Comp, isLogined, ...rest}) => 
	<Route {...rest} render = { props => isLogined ?  <Comp/> :
		<Redirect to={{
			pathname: "/login", 
			// 登录成功后去的地址：
			state: {redirect: props.location.pathname} }}
		/>
}/>)

// 登录组件：
// 11.5 用connect改写，使其连接redux：
const Login = connect(
	// mapStateToProps:
	state => ({
		isLogined: state.user.isLogined,
		loading: state.user.loading
	}),
	// mapDispatchToProps: 
	{login}
)(({location, isLogined, loading, login }) => isLogined ?
	<Redirect to={location.state.redirect || '/'}></Redirect>
	:
	<div>
		<p>用户登录</p>
		<button onClick={login} disabled={loading}>
			{loading ? "登录中...": '登录'}
		</button>
	</div>
)
