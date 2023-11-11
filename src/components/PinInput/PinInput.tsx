import React, { useEffect, useRef, useState } from 'react';
import styles from './PinInput.module.css';

let currentActiveIndex: number = 0;

const PinInput = () => {
  const [pins, setPins] = useState<string[]>(new Array(8).fill(''));
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const pinRef = useRef<HTMLInputElement>(null);

  function handleChange(
    { target }: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) {
    const { value } = target;
    const newPins: string[] = [...pins];
    newPins[currentActiveIndex] = value.substring(value.length - 1);

    if (!value) {
      setActiveIndex(currentActiveIndex - 1);
    } else {
      setActiveIndex(currentActiveIndex + 1);
    }
    setPins(newPins);
  }
  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) {
    currentActiveIndex = index;
    if (e.key === 'Tab') {
      e.preventDefault();
      setActiveIndex(currentActiveIndex + 1);
    }
    if (e.key === 'Backspace' && !pins[index]) {
      e.preventDefault();
      setActiveIndex(currentActiveIndex - 1);
    }
  }

  useEffect(() => {
    pinRef.current?.focus();
  }, [activeIndex]);
  return (
    <>
      {pins.map((pin, index) => (
        <input
          ref={index === activeIndex ? pinRef : null}
          key={index}
          type="number"
          className={`w-12 h-12 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl border-gray-400 focus:border-gray-700 focus:text-gray-700 text-gray-400 ${styles.hideIndicator}`}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          value={pins[index]}
        />
      ))}
    </>
  );
};

export default PinInput;
