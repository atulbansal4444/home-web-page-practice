import React, { useState, useEffect } from "react";
import MATRIX_FRAMES from './data/matrix';

const minSec = 10;

const Matrix = () => {
  const [index, setIndex] = useState(0);
  const [delay, setDelay] = useState(500);
  const [increment, setIncrement] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((storedIndex) => {
        return (storedIndex + increment) % MATRIX_FRAMES.length;
      });
    }, delay);
    return () => {
      clearInterval(interval);
    }
  }, [delay, increment]);

  return (
    <div className="Matrix">
      <img src={MATRIX_FRAMES[index]} alt="matrix-animation" />
      <div className="multiform">
        <div>
          Gallery Transition Delay (Seconds)
          <input type="number" onClick={(e) => {
            const refDelay = Number(e.target.value);
            setDelay(refDelay < minSec ? minSec : refDelay);
          }} />
        </div>
        <div>
          Gallery Increment (Seconds)
          <input type="number" onClick={(e) => {
            const refInc = Number(e.target.value);
            setIncrement(refInc < 1 ? 1 : refInc);
          }} />
        </div>
      </div>
    </div>
  );
};

export default Matrix;
