import React from 'react';
import ship from '../assets/sea/ship.png';
import './SailingShip.css';

// The navbar's sea, on its own: a ship sailing left to right over three drifting wave layers, with the
// deep blue front wave over its hull so it sits down in the water. Purely decorative
const SailingShip = () => (
  <div className="sailing-ship" aria-hidden="true">
    <div className="sailing-ship-sea">
      <img src={ship} className="sailing-ship-boat" alt="" />
      <div className="sailing-ship-water" />
    </div>
  </div>
);

export default SailingShip;
