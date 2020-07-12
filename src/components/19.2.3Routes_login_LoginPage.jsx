import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const LoginPage = props => {
  const {login, isLogin, location} = props
  const redirect = location.state.redirect || '/'
  if(isLogin) {
    return <Redirect to={redirect}/>
  }
  return <div>
    <h1>Login page</h1>
    <button onClick={login}>Login</button>
  </div>}

export default connect(
  // mapStateToProps:
  state => ({ isLogin: state.user.isLogin }),
  // mapDispatchToProps:
  { login: () => ({type: 'loginSuccess'}) }
)(LoginPage)
