import React from 'react';
import Me from 'components/Home/Me';
import Counter from 'components/Home/Counter';
import StarCount from 'components/Home/StarCount';

const Home = () => (
  <div className="home">
    <Me />
    <Counter />
    <StarCount />
  </div>
);

export default Home;
