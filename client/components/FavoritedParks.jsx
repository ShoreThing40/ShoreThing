import React, {useState, useEffect} from 'react';
import FavParkCard from './FavParkCard.jsx';
// import DummyCard from './DummyCard.jsx';

const FavoritedParks = () => {
  const [favBeaches, setFavBeaches] = useState([]);
  
  useEffect(() => {
    // request to retrieve favorite beaches
    fetch(`/trails/interested/${sessionStorage.getItem('user_id')}`)
      .then((favorites) => favorites.json())
      .then((data) => {
        console.log('what is data', data)
        setFavBeaches(data)
      })
      .catch((err) => {throw new Error(err)});
  }, []);
  
  const favoriteBtnHandler = (id) => {
    fetch('/trails/interested', {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json; charset=UTF-8'},
      body: JSON.stringify({username: sessionStorage.getItem('username'), parkId: id})
    })
      .then(() => {
        // fetch table to reset state to rerender here
      }) 
  };
  
  const cardHolder = [];
  for (let i = 0; i < favBeaches.length; i++){
    cardHolder.push(<FavParkCard key={favBeaches[i].trail_id} parkId={favBeaches[i].trail_id} favoriteBtnHandler={favoriteBtnHandler}/>)
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