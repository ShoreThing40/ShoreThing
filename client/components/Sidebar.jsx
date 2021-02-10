import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import config from '../../config.js';

const Sidebar = () => {
  const [zipcode, setZipcode] = useState(sessionStorage.getItem('location'));
  const [weather, setWeather] = useState({});
  const [AQI, setAQI] = useState('');
  const history = useHistory();

  const weatherMap = {
    Clouds: '../assets/cloud.svg',
    Clear: '../assets/sunny.svg',
    Rain: '../assets/rain.svg',
    Drizzle: '../assets/drizzle.svg',
    Snow: '../assets/snowflake.svg',
  };

  

  useEffect(() => {
    fetch(`https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=${zipcode}&facet=state&facet=timezone&facet=dst`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        const long = data.records[0].fields.longitude;
        const lat = data.records[0].fields.latitude;
      
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${config.weatherAPI}`)
          .then((res) => res.json())
          .then((weatherData) => {
          // console.log('weather', weatherData)
          setWeather({weather: weatherData.weather[0].main, temp: Math.floor((weatherData.main.temp - 273.15) * (9/5) + 32)});

        }).catch(err => { throw new Error(err) });
      
        // fetch to AQI api
        fetch(`https://api.waqi.info/feed/geo:${long};${lat}/?token=${config.aqiAPI}`)
          .then((res) => res.json())
          .then(({data}) => setAQI(data.aqi))
          .catch(err => {throw new Error(err)});

      }).catch(err => {throw new Error(err)});

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
    <div className='card' id="sidebar-card">
      <img src={weatherMap[weather.weather]} className="card-img-top" id="weather-image"/>
      <h5 className='card-title'>Weather: {weather.weather}</h5>
      <h5 className='card-title'>Temp: {weather.temp}°F</h5>
    </div>

    {/* // current AQI svg + text */}
    <div className='card' id="sidebar-card2">
      <h2 className='card-title'>AQI: {AQI}</h2>
    </div>

    {/* // sign out button */}
    <div>
      <button className='btn btn-primary' onClick={()=> {sessionStorage.clear(); history.push('/')}}>Sign Out</button>
    </div>
  </div>
  )
}

export default Sidebar;

{/* <div className='card' style={{width: "18rem"}}>
<div>
<img src={imgUrl} className="card-img-top" /> 
</div>
  <div className="card-body">
  <h5 className="card-title">{parkName}</h5>
  <div>
    <img src={weatherMap[weather.weather]} style={{width: '50%'}}/>
    <p className='card-text'>Weather: {weather.weather} Temp: {weather.temp} °F</p>
    <p className='card-text'>AQI: {AQI}</p>
  </div>
</div>   
</div> */}