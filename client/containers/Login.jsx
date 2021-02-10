import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom'


const Login = () => {
  const [loginInfo, setLoginInfo] = useState({username: '', password: ''})
  const history = useHistory();

  const onClickHandler = () => {

    // check for non-alphanumeric characters
    // if ((/[^a-z0-9]/gi).test(loginInfo.username) || (/[^a-z0-9]/gi).test(loginInfo.password)) {
    //   // reject
    //   alert('Invalid username or password.')
    // } else {
    //   // fetch
    //   fetch('/user/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json; charset=utf-8'
    //     },
    //     body: JSON.stringify(loginInfo),
    //   })
    //   .then(() => {
    //     sessionStorage.setItem('username', loginInfo.username);
    //     history.push('/landing')
    //   });
    // }
    sessionStorage.setItem('username', loginInfo.username);
    // sessionStorage.setItem('location', response from database)
    history.push('/landing');
  }

  return (
  <div>
  <div style={{height: '33%'}}></div>
  <form className="container">
    <div className="form-group">
      <label htmlFor="username">Email address</label>
      <input type="username" className="form-control" id="username" placeholder="Enter username" onChange={(e)=> setLoginInfo({...loginInfo, username: e.target.value})}/>
    </div>
    <div className="form-group">
      <label htmlFor="password">Password</label>
      <input type="password" className="form-control" id="password" placeholder="Password" onChange={(e)=> setLoginInfo({...loginInfo, password: e.target.value})}/>
    </div>
    <div className="signup-link">
      <Link to='/signup'><small>Need an account? Sign up</small></Link>
    </div>
    <button type="button" className="btn btn-primary" onClick={() => onClickHandler()}>Submit</button>
  </form>
  <div style={{height: '33%'}}></div>
  </div>
  )
}

export default Login;