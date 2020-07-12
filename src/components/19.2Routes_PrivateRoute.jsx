import React, { Component } from 'react'
import { BrowserRouter, Link, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

export default class RoutesPrivateRoute extends Component {
  render() {
    return (
      <div>
        <h1>RouterPage</h1>
        <BrowserRouter>
          <nav>
            <Link to='/'>首页</Link>{' | '}
            <Link to='user'>用户</Link>
          </nav>

          <Switch>
            <Route exact path='/' component={HomePage} />
            {/* 1. 用户登录页面改为路由守卫形式, 需验证:  */}
            <PrivateRoute path='/user' component={UserPage} />
            {/* 2.  */}
            <Route path='/login' component={LoginPage} />
            <Route component={()=> <div><h1>404 page</h1></div>}/>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}


const PrivateRoute = props => {
  const { isLogin, location } = props
  const redireact = location.pathname
  return isLogin ? <Route path='/user' component={UserPage}/> : <Redirect to="login" />}
connect(
  // mapStateToProps:
  state => ({ isLogin: state.user.isLogin })
)(PrivateRoute)


const LoginPage = ({login}) => {
  return <div>
    <h1>Login page</h1>
    <button onClick={login}>Login</button>
  </div>}
connect(
  // mapStateToProps:
  state => ({ isLogin: state.user.isLogin }),
  // mapDispatchToProps:
  { login: () => ({type: 'loginSuccess'}) }
)(LoginPage)


const HomePage = () => <div><h1>Home</h1></div>
const UserPage = () => <div><h1>User</h1></div>

