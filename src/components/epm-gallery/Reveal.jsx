import React, { useEffect, useRef, useState } from 'react';

// One IntersectionObserver shared by every <Reveal> on the page, rather than one per card.
let sharedObserver = null;
const onVisible = new WeakMap();

function getObserver() {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        sharedObserver.unobserve(entry.target);
        onVisible.get(entry.target)?.();
        onVisible.delete(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  }
  return sharedObserver;
}

// Fades its content up into place the first time it scrolls into view (see .epg-reveal in
// epmGallery.css, which also turns this off for prefers-reduced-motion). `delay` is in ms, for
// staggering the cards of a grid.
export default function Reveal({ as: Tag = 'div', className = '', delay = 0, style, children, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return undefined;
    }
    const observer = getObserver();
    onVisible.set(el, () => setShown(true));
    observer.observe(el);
    return () => {
      observer.unobserve(el);
      onVisible.delete(el);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={`epg-reveal${shown ? ' is-shown' : ''}${className ? ` ${className}` : ''}`}
      style={delay ? { ...style, '--epg-reveal-delay': `${delay}ms` } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
