import React, { useState } from "react";
import PICTURES from "./data/pictures";
import { useDynamicHook } from "./customHooks/useDynamicHook";

const SECONDS = 1000;

const Gallery = () => {
  const [delay, setDelay] = useState(3 * SECONDS);
  const [increment, setIncrement] = useState(1);

  const index = useDynamicHook({
    delay,
    increment,
    length: PICTURES.length
  });

  return (
    <div className="Gallery">
      <img src={PICTURES[index].image} alt="gallery" />
      <div className="multiform">
        <div>
          Gallery Transition Delay (Seconds)
          <input type="number" onClick={(e) => {
            const refDelay = Number(e.target.value) * SECONDS;
            setDelay(refDelay < SECONDS ? SECONDS : refDelay);
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

export default Gallery;
