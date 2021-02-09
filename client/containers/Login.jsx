import React, {useState} from 'react';


const Login = () => {
  const [loginInfo, setLoginInfo] = useState({username: '', password: ''})

  const onClickHandler = () => {
    // NOTE: .length isn't working because if no match, undefined -- so use test method with negation operator instead
    // if (loginInfo.username.match(/[a-z0-9]/gi).length !== loginInfo.username.length || loginInfo.password.match(/[a-z0-9]/gi).length !== loginInfo.password.length){
    if ((/[^a-z0-9]/gi).test(loginInfo.username) || (/[^a-z0-9]/gi).test(loginInfo.password)) {
      // reject
      alert('Invalid username or password.')
    } else {
      // fetch
      fetch('/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(loginInfo),
      })
    }
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
      <small>Need an account? Sign up</small>
    </div>
    <button type="button" className="btn btn-primary" onClick={() => onClickHandler()}>Submit</button>
  </form>
  <div style={{height: '33%'}}></div>
  </div>
  )
}

export default Login;