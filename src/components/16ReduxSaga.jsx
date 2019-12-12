import React, {useState} from 'react'
import {BrowserRouter, Link, Route, Switch, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../store/user.redux2'

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
		<Switch>
			<Route path="/about/me" component={()=> <div>Me</div>}/>
			<Route path="/about/order" component={()=> <div>Order</div>}/>
			<Redirect to="/about/me"/>
		</Switch>
	</div>)
}

// {location}是直接解构默认传过来的props里的属性
const NoMatch = ({location}) =>{
	return (<div>
		404,{'  '}{location.pathname}不存在
	</div>)
}
const Detail = ({match, history}) => {
	return (<div>
		当前课程：{match.params.course} <br/>
		{/* 1. history：导航指令history.back() */}
		<button onClick={history.goBack}>后退</button>
	</div>)
}

const PrivateRoute = connect(
  state => ({ isLogin:state.user.isLogin })
)(
({component: Comp, isLogin, ...rest}) => {
  return(
    <Route {...rest} render={
      props => isLogin ?  <Comp/> :
        <Redirect to={{
          pathname: "/login", 
          state: { redirect: props.location.pathname } }}
        />
    }/>
  )
})

const Login = connect(
  state => ({
    isLogin: state.user.isLogin,
    loading: state.user.loading,
    // 增加登录错误信息:
    error: state.user.error
  }),
  { login }
  )(
  ({location, isLogin, login, loading, error }) => {
    const redirectUrl = location.state.redirect || '/';
    // 用户名输入状态：为了避免改为class
    const [uname, setUname] = useState('')
    if (isLogin) {
      return <Redirect to={redirectUrl}/>
    }
    return (
      <div>
        <p>用户登录</p>
        <hr />
        {/* 登录错误信息展示 */}
        {error && <p style={{'color': 'red'}}>{error}</p>}
        {/* 输入用户名 */}
        <input
          type="text"
          onChange={e => setUname(e.target.value)}
          value={uname}
        />
        <button onClick={() => login(uname)} disabled={loading}>
          {loading ? "登录中..." : "登录"}
        </button>
      </div>
    )
  }
)


export default function ReduxSaga() {
	return (
			<BrowserRouter>        
				<div>
					<div>
						<Link to="/">首页</Link>{' | '}
						<Link to="/about">关于</Link>
					</div>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/detail/:course" component={Detail} />
						<PrivateRoute path="/about" component={About} />
						<Route path="/login" component={Login} />
						<Route component={NoMatch}/>
					</Switch>
        </div>
			</BrowserRouter>
	)
}
