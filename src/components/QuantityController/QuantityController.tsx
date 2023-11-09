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
    <div className="p-1 bg-white border-[1px] flex items-center gap-4 w-fit lg:gap-5 rounded-md">
      <button
        onClick={() => setInputValue((prev) => prev - 1)}
        disabled={inputValue === 1}
        className="text-primary w-5 aspect-square disabled:text-[#777777] disabled:cursor-not-allowed"
      >
        <Minus className="w-[19px]" />
      </button>
      <p className="text-sm font-semibold lg:text-base">{inputValue}</p>
      <button
        onClick={() => setInputValue((prev) => prev + 1)}
        disabled={inputValue === maximum}
        className="text-primary w-5 aspect-square disabled:text-[#777777] disabled:cursor-not-allowed"
      >
        <Plus className="w-[19px]" />
      </button>
    </div>
  );
}

export default QuantityController;
