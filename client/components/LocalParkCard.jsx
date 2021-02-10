import React, {useState, useEffect} from 'react';
import config from '../../config.js';

const LocalParkCard = (props) => { // props will include id from DB corresponding to API
  const [parkName, setParkName] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [weather, setWeather] = useState({});
  const [AQI, setAQI] = useState('');
  const [numVisits, setNumVisits] = ('');
  
  const weatherMap = {
    Clouds: '../assets/cloud.svg',
    Clear: '../assets/sunny.svg',
    Rain: '../assets/rain.svg',
    Drizzle: '../assets/drizzle.svg',
    Snow: '../assets/snowflake.svg',
  };
  
  // , temperature: Math.floor((main.temp + 273.15) * (9/5) + 32)
  useEffect(() => {
    // fetch number of visits
    fetch(`/trails/visited/:${sessionStorage.getItem('username')}`)
      .then((data) => data.json())
      .then((result) => setNumVisits(result))
      .catch((err) => {throw new Error(err)});
    // fetch to beach api
    fetch(`https://api.coastal.ca.gov/access/v1/locations/id/${props.parkId}`)
    .then((res) => res.json())
    .then((park) => {
      setParkName(park[0].NameMobileWeb);
      setImgUrl(park[0].Photo_1);
      // fetch to weather api
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${park[0].LATITUDE}&lon=${park[0].LONGITUDE}&appid=${config.weatherAPI}`)
      .then((res) => res.json())
      .then((weatherData) => {
        // console.log('weather', weatherData)
        setWeather({weather: weatherData.weather[0].main, temp: Math.floor((weatherData.main.temp - 273.15) * (9/5) + 32)});

      }).catch(err => { throw new Error(err) });
      
      // fetch to AQI api
      fetch(`https://api.waqi.info/feed/geo:${park[0].LATITUDE};${park[0].LONGITUDE}/?token=${config.aqiAPI}`)
      .then((res) => res.json())
      .then(({data}) => setAQI(data.aqi))
      .catch(err => {throw new Error(err)});
      })

  }, []);

  const onClickHandler = () => {
    fetch('/trails/visited', {
      method: 'POST',
      headers: {'Content-Type': 'application/json; charset:utf-8'},
      body: JSON.stringify({visits: numVisits + 1, park_id: props.parkId, username: sessionStorage.getItem('username')}),
    })
    .then(() => setNumVisits(numVisits + 1))
    .catch(err => {throw new Error(err)});
  }

  return (
  <div className='card' style={{width: "18rem"}}>
    <div>
    {imgUrl.length > 0 ?
    <img src={imgUrl} className="card-img-top" /> 
    : <img src='../../assets/beach.svg' className="card-img-top" />
  }
    </div>
      <div className="card-body">
      <h5 className="card-title">{parkName}</h5>
      <div>
        <img src={weatherMap[weather.weather]} style={{width: '50%'}}/>
        <p className='card-text'>Weather: {weather.weather} Temp: {weather.temp} °F</p>
        <p className='card-text'>AQI: {AQI}</p>
      </div>
      <div className="card-button-container">
        <button className="btn btn-primary" onClick={() => onClickHandler()}>Visited {numVisits} times!</button>
        <button className="btn btn-primary" onClick={() => props.localBtnHandler(props.parkId)}>Favorite</button>
      </div>
    </div>   
  </div>
  )
};

export default LocalParkCard;

// GREEN: #009966
// YELLOW: #ffde33
// ORANGE: #ff9933
// RED: #cc0033
// PURPLE: #660099
// MAHOGANY: #7e0023