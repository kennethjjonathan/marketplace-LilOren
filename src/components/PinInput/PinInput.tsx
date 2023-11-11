import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

import styles from './PinInput.module.css';

interface PinInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  pins: string[];
  setPins: Dispatch<SetStateAction<string[]>>;
}

let currentActiveIndex: number = 0;
const PinInput = ({ pins, setPins, ...props }: PinInputProps) => {
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
    <div className="flex items-center space-x-1">
      {pins.map((_, index) => (
        <input
          ref={index === activeIndex ? pinRef : null}
          key={index}
          type="number"
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          value={pins[index]}
          className={` ${styles.hideIndicator} aspect-square w-8 border-[1px] rounded bg-transparent outline-none text-center text-xl border-black focus:border-primary focus:text-black text-black`}
        />
      ))}
    </div>
  );
};

export default PinInput;
