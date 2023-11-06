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
}: QuantityControllerProps) {
  return (
    <div className="p-1 bg-input flex items-center gap-4 w-fit lg:gap-5 rounded-md">
      <button
        onClick={() => setInputValue((prev) => prev - 1)}
        disabled={inputValue === 1}
        className="text-primary w-5 aspect-square lg:w-6 disabled:text-[#777777] disabled:cursor-not-allowed"
      >
        <Minus />
      </button>
      <p className="text-base font-semibold lg:text-lg">{inputValue}</p>
      <button
        onClick={() => setInputValue((prev) => prev + 1)}
        disabled={inputValue === maximum}
        className="text-primary w-5 aspect-square lg:w-6 disabled:text-[#777777] disabled:cursor-not-allowed"
      >
        <Plus />
      </button>
    </div>
  );
}

export default QuantityController;
