import React, {useState, useEffect} from 'react';
import Sidebar from '../components/Sidebar.jsx';
import FavoritedParks from '../components/FavoritedParks.jsx';
import LocalParks from '../components/LocalParks.jsx';

const Landing = () => {
  const [location, setLocation] = useState({longitude: '', latitude: ''})
  const [zipcode, setZipcode] = useState(sessionStorage.getItem('location'));

  useEffect(() => {
    fetch(`https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=${zipcode}&facet=state&facet=timezone&facet=dst`)
      .then((res) => res.json())
      .then((data) => {
        const long = data.records[0].fields.longitude;
        const lat = data.records[0].fields.latitude;
        console.log('zip, lat and long from opendatasoft', zipcode, lat, long)
        setLocation({longitude: long, latitude: lat});
      })
      .catch(err => {throw new Error(err)})
  }, [zipcode])

  const zipcodeHandler = () => {
    const enteredZip = document.getElementById('zipcode').value;
    if (/[^0-9]/.test(enteredZip) || enteredZip.length !== 5) alert('Invalid zipcode');
    else setZipcode(enteredZip);
  }

  return (
  <div className='landing-page'>
    <div className='leftdiv'>
      <Sidebar location={location} zipcode={zipcode} zipcodeHandler={zipcodeHandler}/>
    </div>
    <div className='rightdiv'>
      <FavoritedParks />
      <LocalParks location={location}/>
    </div>
  </div>
  )
};

export default Landing;