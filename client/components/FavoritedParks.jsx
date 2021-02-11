import React, {useState, useEffect} from 'react';
// import FavParkCard from './FavParkCard.jsx';
// import DummyCard from './DummyCard.jsx';

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
    // for (let i = 0; i < 5; i++){
    // cardHolder.push(<DummyCard key={i} />)
    cardHolder.push(<FavParkCard parkId={favBeaches.ID} favoriteBtnHandler={favoriteBtnHandler}/>)
  }
  if (!cardHolder.length) return null;
  return (
    <div className="card-set">
    <h2 className="card-holder-label">Favorites</h2>
    <div className="cardHolder">
      <div className="scroll-div">
      {cardHolder}
      </div>
    </div>
  </div>
  )
};

export default FavoritedParks;