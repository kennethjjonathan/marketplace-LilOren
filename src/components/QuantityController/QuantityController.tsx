import React, { Dispatch, SetStateAction } from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantityControllerProps extends React.HTMLAttributes<HTMLDivElement> {
  inputValue: number;
  setInputValue: Dispatch<SetStateAction<number>>;
  maximum: number;
}

function QuantityController({
  inputValue,
  setInputValue,
  maximum,
  ...props
}: QuantityControllerProps) {
  return (
    <div
      className="p-1 bg-input flex items-center gap-4 w-fit lg:gap-5"
      {...props}
    >
      {inputValue === 1 ? (
        <button disabled>
          <Minus className="text-[#777777] w-5 aspect-square lg:w-6" />
        </button>
      ) : (
        <button onClick={() => setInputValue((prev) => prev - 1)}>
          <Minus className="text-primary w-5 aspect-square lg:w-6" />
        </button>
      )}
      <p className="text-base font-semibold lg:text-lg">{inputValue}</p>
      {inputValue === maximum ? (
        <button disabled>
          <Plus className="text-[#777777] w-5 aspect-square lg:w-6" />
        </button>
      ) : (
        <button onClick={() => setInputValue((prev) => prev + 1)}>
          <Plus className="text-primary w-5 aspect-square lg:w-6" />
        </button>
      )}
    </div>
  );
}

export default QuantityController;
