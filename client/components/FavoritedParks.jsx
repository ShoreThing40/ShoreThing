import React from 'react';
import FavParkCard from './FavParkCard.jsx';

const FavoritedParks = () => {
  
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
  return (
  <div>
    <FavParkCard parkId={1} favoriteBtnHandler={favoriteBtnHandler}/>
  </div>
  )
};

export default FavoritedParks;