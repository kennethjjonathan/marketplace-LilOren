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
    <div className="p-1 bg-input flex items-center gap-2 w-fit lg:gap-5 h-11 xl:h-12">
      <button
        onClick={() => {
          if (handleMaximumValid !== undefined) {
            handleMaximumValid('minus');
            return;
          }
          setInputValue((prev) => prev - 1);
        }}
        disabled={inputValue <= 1}
        className="text-primary w-5 aspect-square lg:w-6 disabled:text-[#777777] disabled:cursor-not-allowed"
      >
        <Minus />
      </button>
      {isInput ? (
        <form
          className="max-w-fit"
          onSubmit={(e) => {
            e.preventDefault();
            if (isNaN(parseInt(inputValue.toString())) || inputValue < 1) {
              setInputValue(1);
              setIsInput(false);
            } else if (inputValue >= maximum) {
              setInputValue(maximum);
              setIsInput(false);
            } else {
              setIsInput(false);
            }
          }}
        >
          <Input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(parseInt(e.target.value))}
            onBlur={() => {
              if (isNaN(parseInt(inputValue.toString())) || inputValue < 1) {
                setInputValue(1);
                setIsInput(false);
              } else if (inputValue >= maximum) {
                setInputValue(maximum);
                setIsInput(false);
              } else {
                setIsInput(false);
              }
            }}
            className="text-base font-semibold lg:text-lg focus:outline-none max-w-fit bg-transparent"
            autoFocus={true}
          />
        </form>
      ) : (
        <p
          className="text-base font-semibold lg:text-lg"
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
        className={`w-5 aspect-square lg:w-6 disabled:text-[#777777] disabled:cursor-not-allowed  ${
          inputValue >= maximum
            ? 'text-[#777777] cursor-not-allowed'
            : 'text-primary'
        }`}
      >
        <Plus />
      </button>
    </div>
  );
}

export default QuantityController;
