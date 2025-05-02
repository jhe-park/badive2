'use client';

import { CountUp } from 'countup.js';
import { useEffect, useRef } from 'react';

export function useCounterUpAnimation() {
  const refForCounterElement = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const options = {
      rootMargin: '0px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(countUp, options);
    observer.observe(refForCounterElement.current);

    function countUp() {
      const countUp = new CountUp('count-up', 1000, {
        duration: 3,
      });
      countUp.start();
    }
  }, []);

  return {
    refForCounterElement,
  };
}
