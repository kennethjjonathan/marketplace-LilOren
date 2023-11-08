import React, { Dispatch, SetStateAction } from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { IVariantGroup, IVariantType } from '@/interface/productPage';

interface TypeSelectorProps {
  variant_group: IVariantGroup;
  chosenType: IVariantType;
  setChosenType: Dispatch<SetStateAction<IVariantType>>;
}

const TypeSelector = ({
  variant_group,
  chosenType,
  setChosenType,
}: TypeSelectorProps) => {
  return (
    <div className="flex flex-col items-baseline w-full">
      <p className="text-base font-semibold sm:text-lg lg:text-xl">
        {`${variant_group.group_name}:`}{' '}
        <span className="font-light">{chosenType.type_name}</span>
      </p>
      <ScrollArea className="max-w-full mt-2">
        <div className="flex space-x-5 py-1">
          {variant_group.variant_types.map((type) => (
            <div
              key={type.type_id}
              className={`min-w-fit px-3 py-1 rounded-md border-2 cursor-pointer group duration-300 lg:hover:border-primary lg:hover:opacity-100 lg:hover:bg-[#FEF6F0] lg:hover:text-primary ${
                chosenType.type_id === type.type_id
                  ? 'border-primary bg-[#FEF6F0] text-primary'
                  : 'border-gray-300 bg-transparent text-gray-500'
              }`}
              onClick={() => setChosenType(type)}
            >
              {type.type_name}
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default TypeSelector;
