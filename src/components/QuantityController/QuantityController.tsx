import React, { Dispatch, SetStateAction, useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { Input } from '../ui/input';

interface QuantityControllerProps extends React.HTMLAttributes<HTMLDivElement> {
  inputValue: number;
  setInputValue: Dispatch<SetStateAction<number>>;
  maximum: number;
  handleMaximumValid?: (sing: 'minus' | 'plus') => void;
}

function QuantityController({
  inputValue,
  setInputValue,
  maximum,
  handleMaximumValid,
}: QuantityControllerProps) {
  const [isInput, setIsInput] = useState<boolean>(false);
  return (
    <div className="p-1 bg-input flex items-center gap-5 w-fit lg:gap-5 h-11 xl:h-12">
      <button
        onClick={() => {
          if (handleMaximumValid !== undefined) {
            handleMaximumValid('minus');
            return;
          }
          setInputValue((prev) => prev - 1);
        }}
        disabled={inputValue <= 1}
        className="text-primary disabled:text-[#777777] disabled:cursor-not-allowed"
      >
        <Minus className="w-5 h-5" />
      </button>
      {isInput ? (
        <Input
          style={{ appearance: 'none' }}
          type="number"
          value={inputValue}
          onChange={(e) => {
            if (parseInt(e.target.value) < 1) {
              setInputValue(1);
            } else if (parseInt(e.target.value) >= maximum) {
              setInputValue(maximum);
            } else {
              setInputValue(parseInt(e.target.value));
            }
          }}
          onBlur={() => {
            if (isNaN(inputValue)) {
              setInputValue(1);
              setIsInput(false);
            } else {
              setIsInput(false);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (isNaN(inputValue)) {
                setInputValue(1);
                setIsInput(false);
              } else {
                setIsInput(false);
              }
            }
          }}
          className="text-sm font-semibold lg:text-lg w-10 text-center bg-transparent p-1 duration-300 sm:text-base sm:w-14 lg:w-16"
          autoFocus={true}
        />
      ) : (
        <p
          className="text-sm font-semibold lg:text-lg w-10 text-center sm:text-base sm:w-14 lg:w-16"
          onClick={() => setIsInput(true)}
        >
          {inputValue}
        </p>
      )}

      <button
        onClick={() => {
          if (handleMaximumValid !== undefined) {
            handleMaximumValid('plus');
            return;
          }
          setInputValue((prev) => prev + 1);
        }}
        disabled={inputValue >= maximum && handleMaximumValid === undefined}
        className={`disabled:text-[#777777] disabled:cursor-not-allowed  ${
          inputValue >= maximum
            ? 'text-[#777777] cursor-not-allowed'
            : 'text-primary'
        }`}
      >
        <Plus className="w-5 h-5" />
      </button>
    </div>
  );
}

export default QuantityController;
