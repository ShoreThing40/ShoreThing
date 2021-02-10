import React, {useEffect, useState} from 'react';
import LocalParkCard from './FavParkCard.jsx';

const LocalParks = (props) => {
  const [localBeaches, setLocalBeaches] = useState([]);

  useEffect(() => {
    fetch(`https://api.coastal.ca.gov/access/v1/locations`)
    .then((beaches) => beaches.json())
    .then((data) => {
      const nearbyBeaches = data.filter((beach) => {
        return (Math.abs(beach.LONGITUDE - props.location.longitude) < .2
          && Math.abs(beach.LATITUDE - props.location.latitude) < .2);
      })
      setLocalBeaches(nearbyBeaches);
    })
      .catch((err) => {throw new Error(err)});
  }, [props.location]);
  
  const localBtnHandler = (id) => {
    fetch('/trails/interested', {
      method: 'POST',
      headers: {'Content-Type': 'application/json; charset=UTF-8'},
      body: JSON.stringify({username: sessionStorage.getItem('username'), parkId: id})
    })
      .then(() => {
        // fetch table to reset state to rerender here
      }) 
  }

  const cardHolder = [];
  for (let i = 0; i < 5; i++){
    cardHolder.push(<LocalParkCard parkId={localBeaches[i].ID} localBtnHandler={localBtnHandler}/>)
  }
  return (
  <div>
    {cardHolder};
  </div>
  )
};

export default LocalParks;