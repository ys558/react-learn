import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = props => {
  const { component:Cmp ,isLogin, location, ...rest } = props
  return <Route 
    {...rest}
    render={ props => isLogin ? 
    <Cmp {...props}/> 
    : 
    <Redirect to={{
      pathname: '/login',
      state: {redireact: location.pathname}
    }}/>
  }/>
}

export default connect(
  // mapStateToProps:
  state => ({ isLogin: state.user.isLogin })
)(PrivateRoute)