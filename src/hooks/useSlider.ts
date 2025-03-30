import { useState } from "react";

const offset = 6;

function useSlider(length: number) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [direction, setDirection] = useState(true);
  
  const next = async () => {
    if (leaving || length <= 0) return;
    setLeaving(true);
    await setDirection(true);
    const maxIndex = Math.floor((length - 1) / offset) - 1;
    setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  const prev = async () => {
    if (leaving || length <= 0) return;
    setLeaving(true);
    await setDirection(false);
    const maxIndex = Math.floor((length - 1) / offset) - 1;
    setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  return { index, direction, leaving, next, prev, setLeaving };
}

export default useSlider;