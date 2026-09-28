import React, { useEffect, useRef, useState } from 'react';
import './FadeImage.css';

// <img> that stays invisible until it has loaded, then fades in - so a card's placeholder
// gradient shows while the photo downloads instead of a half-painted image.
export default function FadeImage({ className = '', onLoad, ...props }) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // A cached photo can finish loading before React has attached the handler.
  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth > 0) setLoaded(true);
  }, []);

  return (
    <img
      ref={ref}
      className={`fade-img ${loaded ? 'is-loaded' : ''} ${className}`}
      onLoad={(e) => { setLoaded(true); if (onLoad) onLoad(e); }}
      {...props}
    />
  );
}
