import React, { useEffect, useState } from 'react';

interface CounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}

export const Counter: React.FC<CounterProps> = ({
  target,
  suffix = '',
  duration = 1500,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setCount(target);
      return;
    }

    let start = 0;
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};
