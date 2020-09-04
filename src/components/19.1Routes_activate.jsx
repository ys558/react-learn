import React, { Component } from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'

export default class RoutesActivate extends Component {
  render() {
    const searchId = 123
    return (
      <div>
        <h1>RouterPage</h1>
        <BrowserRouter>
          <nav>
            <Link to='/'>首页</Link>{' | '}
            {/* 1. 动态路由 */}
            <Link to={`/search/${searchId}`}>搜索</Link>
          </nav>

          <Switch>
            <Route exact path='/' component={HomePage} />
            {/* 1. 动态路由匹配 :params */}
            <Route path='/search/:id' component={Search} />
            <Route component={()=> <div><h1>404 page</h1></div>}/>

            {/* 2. 配置Search页面的子路由: */}
            <Route path='/search/detail' component={Detail}/>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

const HomePage = () => <div><h1>Home</h1></div>

const Search = props => {
  const {id} = props.match.params
  return<div>
    <h1>search /:id is {id}</h1>
    {/* 2. 配置子路由: */}
    <Link to='/search/detail'>详情: {id}</Link>
  </div>
}

const Detail = () => <div>detail</div>