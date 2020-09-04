import React, { Component } from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'

export default class RouterPage extends Component {
  render() {
    return (
      <div>
        <h1>RouterPage</h1>
        {/* 1. Link 复制导航到具体/routes */}
        <BrowserRouter>
          <nav>
            <Link to='/'>首页</Link>
            <Link to='user'>用户</Link>
          </nav>

          {/* 2. Switch 匹配到一条就不再往下匹配: 否则下面的404 page会和其他page一起显示: */}
          <Switch>
            {/* 3. Route 必须和上面Link 一一对应 */}
            {/* 3.1 exact 必须精确匹配, 否则会两个页面一同显示在同一界面下: */}
            <Route exact path='/' component={HomePage} />
            <Route path='/user' component={UserPage} />
            <Route component={()=> <div><h1>404 page</h1></div>}/>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

const HomePage = () => <div>
  <h1>Home</h1>
</div>
const UserPage = () => <div>
  <h1>User</h1>
</div>