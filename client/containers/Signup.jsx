import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom'


const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({username: '', password: '', location: ''});
  const history = useHistory();

  const onClickHandler = () => {
    // check for non-alphanumeric characters
    if ((/[^a-z0-9]/gi).test(signupInfo.username) || (/[^a-z0-9]/gi).test(signupInfo.password)) {
      // reject
      alert('Invalid username or password.');
    } 
    else if (/[^0-9]/.test(signupInfo.location) || signupInfo.location.length !== 5) alert('Invalid zipcode')
    else {
      // fetch
      fetch('/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(signupInfo),
      })
      .then(() => {
        sessionStorage.setItem('username', signupInfo.username);
        sessionStorage.setItem('location', signupInfo.location);
        history.push('/landing')
      })
    }
  }

  return (
  <div>
  <div style={{height: '33%'}}></div>
  <form className="container">
    <div className="form-group">
      <label htmlFor="username">Email address</label>
      <input type="username" className="form-control" id="username" placeholder="Enter username" onChange={(e)=> setSignupInfo({...signupInfo, username: e.target.value})}/>
    </div>
    <div className="form-group">
      <label htmlFor="password">Password</label>
      <input type="password" className="form-control" id="password" placeholder="Password" onChange={(e)=> setSignupInfo({...signupInfo, password: e.target.value})}/>
    </div>
    <div className="form-group">
      <label htmlFor="ZIP">Zipcode</label>
      <input type="ZIP" className="form-control" id="ZIP" placeholder="Zipcode" onChange={(e)=> setSignupInfo({...signupInfo, location: e.target.value})}/>
    </div>
    <div className="signup-link">
      <Link to='/'><small>Back to Login</small></Link>
    </div>
    <button type="button" className="btn btn-primary" onClick={() => onClickHandler()}>Submit</button>
  </form>
  <div style={{height: '33%'}}></div>
  </div>
  )
}

export default Signup;