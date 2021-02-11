import React, {useState, useEffect} from 'react';
// import config from '../../config.js';

const DummyCard = () => {
  return (
  <div className='card' 
  style={{width: "18rem", minWidth: "18rem"}} 
  // onMouseOver={() => this.style.backgroundColor = 'red'}
  id="beachCard">
    <div>
      <img src='../../assets/beach.svg' id="card-top-image" className="card-img-top" style={{width: '50%'}}/>
    </div>
      <div className="card-body">
      <h5 className="card-title">DummyPark</h5>
      <div className="info-container">
        <div className="weather-info">
        <img src='../assets/sunny.svg' style={{width: '30%'}}/>
        <p className='card-text'>Clouds </p>
        <p className='card-text'>Temp: 55°F</p>
        </div>
        <div className ="aqi-info">
        <p className='card-text'>AQI: 33</p>
        </div>
      </div>
      <div className="card-button-container">
        <button className="btn btn-primary" style={{marginRight: '1em'}}>Visited 54 times!</button>
        <button className="btn btn-secondary">Favorite?</button>
      </div>
    </div>   
  </div>
  )
};

export default DummyCard;

// GREEN: #009966
// YELLOW: #ffde33
// ORANGE: #ff9933
// RED: #cc0033
// PURPLE: #660099
// MAHOGANY: #7e0023