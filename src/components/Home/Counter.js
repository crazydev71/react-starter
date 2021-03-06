import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount(count + 1);
  };

  const decrease = () => {
    setCount(count - 1);
  };

  return (
    <div className="counter">
      <h2>*** Example for using useState ***</h2>
      <div>
        <button onClick={decrease}>-</button>
        <span>{count}</span>
        <button onClick={increase}>+</button>
      </div>
    </div>
  );
};

export default Counter;
