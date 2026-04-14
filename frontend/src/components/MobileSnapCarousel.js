import React, { useEffect, useMemo, useRef, useState } from 'react';

export default function MobileSnapCarousel({ className, children }) {
  const containerRef = useRef(null);
  const items = useMemo(() => React.Children.toArray(children), [children]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || items.length <= 1) return undefined;

    let ticking = false;

    const updateActive = () => {
      ticking = false;
      const childNodes = Array.from(node.children);
      if (!childNodes.length) return;

      const containerCenter = node.scrollLeft + node.clientWidth / 2;
      let nextIndex = 0;
      let nextDistance = Number.POSITIVE_INFINITY;

      childNodes.forEach((child, index) => {
        const childCenter = child.offsetLeft + child.clientWidth / 2;
        const distance = Math.abs(childCenter - containerCenter);
        if (distance < nextDistance) {
          nextDistance = distance;
          nextIndex = index;
        }
      });

      setActiveIndex(nextIndex);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateActive);
    };

    updateActive();
    node.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateActive);

    return () => {
      node.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateActive);
    };
  }, [items.length]);

  const scrollToIndex = (index) => {
    const node = containerRef.current;
    const target = node?.children?.[index];
    if (!node || !target) return;
    node.scrollTo({
      left: target.offsetLeft - 8,
      behavior: 'smooth',
    });
    setActiveIndex(index);
  };

  return (
    <div className="mobile-carousel-shell">
      <div ref={containerRef} className={className}>
        {items}
      </div>
      {items.length > 1 ? (
        <div className="mobile-carousel-dots" aria-label="Karten-Navigation">
          {items.map((item, index) => (
            <button
              key={item.key ?? index}
              type="button"
              className={`mobile-carousel-dot ${index === activeIndex ? 'is-active' : ''}`}
              aria-label={`Karte ${index + 1} anzeigen`}
              aria-pressed={index === activeIndex}
              onClick={() => scrollToIndex(index)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
