import React, { Component } from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import PrivateRoute from './19.2.2Routes_login_PrivateRoute'
import LoginPage from './19.2.3Routes_login_LoginPage'

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
            <PrivateRoute path='/user' component={UserPage} isLogin={true} />
            {/* 2.  */}
            <Route path='/login' component={LoginPage} />
            <Route component={()=> <div><h1>404 page</h1></div>}/>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

const HomePage = () => <div><h1>Home</h1></div>
const UserPage = () => <div><h1>User</h1></div>