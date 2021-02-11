import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom'


const Login = () => {
  const [loginInfo, setLoginInfo] = useState({username: '', password: ''})
  const history = useHistory();
  const onClickHandler = () => {
    // check for non-alphanumeric characters
    if ((/[^a-z0-9]/gi).test(loginInfo.username) || (/[^a-z0-9]/gi).test(loginInfo.password) || !loginInfo.username.length || !loginInfo.password.length) {
      // reject
      alert('Invalid username or password.')
    } else {
      // fetch
      fetch('/auth/check_pw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(loginInfo),
      })
        .then(res => res.json())
        .then((result) => {
          console.log(result);
          if (result.bool) {
            sessionStorage.setItem('username', loginInfo.username);
            sessionStorage.setItem('location', result.location);
            sessionStorage.setItem('user_id', result.user_id);
            history.push('/landing');
          } else {
            alert('Validation unsuccessful');
          }
        })
        .catch(err => console.error(err));
      };
    };

  return (
    <div className="login-page">
      <div style={{height: '33%'}} className="login-top">
        <h1 className="display-1" id="top-header">🏖️ Shore Thing! 🏖️</h1>
      </div>
      <form className="container">
        <div className="form-group">
          <label htmlFor="username">Username</label>
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
    </div>
  )
};

export default Login;
