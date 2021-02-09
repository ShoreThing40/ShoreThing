import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom'

const Sidebar = () => {
  const [zipcode, setZipcode] = useState(sessionStorage.getItem('location'));
  const [weather, setWeather] = useState({});
  const [aqi, setAqi] = useState({});
  const history = useHistory();

  useEffect(() => {
    fetch(`/weather/:${zipcode}`)
    .then((res) => setWeather(res))
    .catch((err) => { throw new Error(err) });


    fetch(`/airquality/:${zipcode}`)
      .then((res) => setAqi(res))
      .catch((err) => { throw new Error(err) });
  }, [zipcode] );

  const onClickHandler = () => {
    const enteredZip = document.getElementById('zipcode').value;
    if (/[^0-9]/.test(enteredZip) || enteredZip.length !== 5) alert('Invalid zipcode');
    else setZipcode(enteredZip);
  }


  return (
  <div className="sidebar">
    <div>
      <h2 className="display-4" id="current-user">Hi, {sessionStorage.getItem('username')}</h2>
    </div>
    <div>
      <h2>Current Location: {zipcode}</h2>
    </div>
      {/* // change zip form */}
    <div>
      <form className="container" id="changeZip">
        <input type="zipcode" className="form-control" id="zipcode" placeholder="Enter Zipcode" />
        <button type="button" className="btn btn-primary" style={{marginLeft: '1em'}} onClick={() => onClickHandler()}>Submit</button>
      </form>
    </div>

    {/* // current weather svg + text */}
    <div>
      {/* weather svg */}
      {/* <h2>{weather}</h2> */}
    </div>

    {/* // current AQI svg + text */}
    <div>
      {/* <h2>{aqi}</h2> */}
    </div>

    {/* // sign out button */}
    <div>
      <button className='btn btn-primary' onClick={()=> {sessionStorage.clear(); history.push('/')}}>Sign Out</button>
    </div>
  </div>
  )
}

export default Sidebar;