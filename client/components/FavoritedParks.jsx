import React, {useState, useEffect} from 'react';
import FavParkCard from './FavParkCard.jsx';

const FavoritedParks = () => {
  const [favBeaches, setFavBeaches] = useState([]);
  
  useEffect(() => {
    // request to retrieve favorite beaches
    fetch(`/trails/interested/:${sessionStorage.getItem('username')}`)
      .then((favorites) => favorites.json())
      .then((data) => setFavBeaches(data))
      .catch((err) => {throw new Error(err)});
  })
  
  const favoriteBtnHandler = (id) => {
    fetch('/trails/interested', {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json; charset=UTF-8'},
      body: JSON.stringify({username: sessionStorage.getItem('username'), parkId: id})
    })
      .then(() => {
        // fetch table to reset state to rerender here
      }) 
  }
  
  const cardHolder = [];
  for (let i = 0; i < favBeaches.length; i++){
    cardHolder.push(<FavParkCard parkId={favBeaches.ID} favoriteBtnHandler={favoriteBtnHandler}/>)
  }
  return (
  <div>
    {cardHolder}
  </div>
  )
};

export default FavoritedParks;