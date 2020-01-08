import React, { useEffect, useState } from 'react';

/**
 * Example component of using `useEffect` hook without lifecycle method
 *
 * IMPORTANT:
 * Make sure to pass empty array as param in use Effect.
 * This will make sure effet hook is called one time.
 * Otherwise it will be called every time component updated.
 */
const Me = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('https://randomuser.me/api/')
      .then((results) => results.json())
      .then((data) => {
        setUser(data.results[0]);
      });
  }, []);

  return (
    <div className="me">
      <h2>*** Example for using useEffect! ***</h2>
      <h3>My random name: {user ? `${user.name.first} ${user.name.last}` : ''}</h3>
    </div>
  );
};

export default Me;
