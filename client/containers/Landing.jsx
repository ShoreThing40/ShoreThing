import React from 'react';
import Sidebar from '../components/Sidebar.jsx';
import FavoritedParks from '../components/FavoritedParks.jsx';
import LocalParks from '../components/LocalParks.jsx';

const Landing = () => {
  return (
  <div className='landing-page'>
    <div className='leftdiv'>
      <Sidebar />
    </div>
    <div className='rightdiv'>
      {/* <FavoritedParks />
      <LocalParks /> */}
    </div>
  </div>
  )
};

export default Landing;