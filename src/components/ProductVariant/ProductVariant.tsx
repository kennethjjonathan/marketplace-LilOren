import React, { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';
import { IProdcutVariant } from '@/interface/addProduct';

const ProductVariant = () => {
  const maxLength: number = 3;
  const [isVariantActive, setIsVariantActive] = useState<boolean>(false);
  const [noVarPrice, setNoVarPrice] = useState<number>(0);
  const [noVarStock, setNoVarStock] = useState<number>(0);
  const [variants, setVariants] = useState<IProdcutVariant[]>([
    { variant_name: '', options: [''] },
  ]);
  const [stocks, setStocks] = useState<number[][]>(
    new Array(maxLength).fill(new Array(maxLength).fill(0)),
  );
  const [price, setPrice] = useState<number[][]>(
    new Array(maxLength).fill(new Array(maxLength).fill(0)),
  );

  function handleVariantNameInput(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) {
    const { value } = e.target;
    const newVariants = [...variants];
    newVariants[index].variant_name = value;
    setVariants(newVariants);
  }

  function handleOptionChange(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    biggerIndex: number,
  ) {
    const { value } = e.target;
    const newVariants = [...variants];
    if (
      newVariants[biggerIndex].options[index] === '' &&
      index === newVariants[biggerIndex].options.length - 1 &&
      newVariants[biggerIndex].options.length < maxLength
    ) {
      newVariants[biggerIndex].options.push('');
    }
    newVariants[biggerIndex].options[index] = value;
    setVariants(newVariants);
  }

  function handleDeleteOptions(index: number, biggerIndex: number) {
    if (biggerIndex === 0) {
      const newPrice = [...price];
      newPrice.splice(index, 1);
      newPrice.push([0, 0, 0]);
      setPrice(newPrice);
      const newStocks = [...stocks];
      newStocks.splice(index, 1);
      newStocks.push([0, 0, 0]);
      setStocks(newStocks);
    } else {
      const newPrice = [...price];
      const newStocks = [...stocks];
      for (let i = 0; i < maxLength; i++) {
        newPrice[i].splice(index, 1);
        newPrice[i].push(0);
        newStocks[i].splice(index, 1);
        newPrice[i].push(0);
      }
      setPrice(newPrice);
      setStocks(newStocks);
    }
    const newVariants = [...variants];
    newVariants[biggerIndex].options.splice(index, 1);
    setVariants(newVariants);
  }

  function handleAddVariant() {
    const newVariants = [...variants];
    newVariants.push({ variant_name: '', options: [''] });
    setVariants(newVariants);
  }

  function handlePriceInput(
    e: React.ChangeEvent<HTMLInputElement>,
    index0: number,
    index1: number | undefined,
  ) {
    const { value } = e.target;
    const valNum = parseInt(value);
    const newPrice = [...price];
    if (index1 !== undefined) {
      const newSmallArray = [...newPrice[index0]];
      newSmallArray[index1] = valNum;
      newPrice[index0] = newSmallArray;
      setPrice(newPrice);
    }
  }

  function handleStockInput(
    e: React.ChangeEvent<HTMLInputElement>,
    index0: number,
    index1: number | undefined,
  ) {
    const { value } = e.target;
    const valNum = parseInt(value);
    const newStocks = [...stocks];
    if (index1 !== undefined) {
      const newSmallArray = [...newStocks[index0]];
      newSmallArray[index1] = valNum;
      newStocks[index0] = newSmallArray;
      setStocks(newStocks);
    }
  }

  useEffect(() => {
    console.log('price', price);
    console.log('stock', stocks);
  }, [price, stocks]);

  if (!isVariantActive) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <p>Variant:</p>
          <Button onClick={() => setIsVariantActive(true)}>
            Activate Variant
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <p>Price:</p>
          <Input
            type="number"
            value={noVarPrice}
            onChange={(e) => setNoVarPrice(parseInt(e.target.value))}
          />
        </div>
        <div className="flex items-center gap-2">
          <p>Stock:</p>
          <Input
            type="number"
            value={noVarStock}
            onChange={(e) => setNoVarStock(parseInt(e.target.value))}
          />
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="bg-gray-500 flex flex-col gap-3">
        {variants.map((variant, biggerIndex) => (
          <div key={biggerIndex}>
            <div className="flex items-center gap-2">
              <p className="min-w-fit">Variant {`${biggerIndex + 1}`}:</p>
              <Input
                type="string"
                value={variant.variant_name}
                onChange={(e) => handleVariantNameInput(e, biggerIndex)}
              />
            </div>
            <div className="grid grid-rows-2 grid-cols-3 w-full">
              {variant.options.map((option, index) => (
                <div className="flex items-center gap-1" key={index}>
                  <Input
                    value={option}
                    onChange={(e) => handleOptionChange(e, index, biggerIndex)}
                  />
                  <button
                    onClick={() => handleDeleteOptions(index, biggerIndex)}
                  >
                    <Trash2 />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
        {variants.length < 2 && (
          <Button onClick={handleAddVariant}>Add Variant</Button>
        )}
        <div className="w-full flex gap-2">
          <div>
            <p>{variants[0].variant_name}</p>
            {variants[0].options.map((option, index0) => {
              if (option !== '') {
                return (
                  <div key={index0} className="flex border-2 border-green-500">
                    <p className="bg-yellow-500">{option}</p>
                    {variants[1] !== undefined && (
                      <div className="flex flex-col">
                        {variants[1].options.map((option, index1) => {
                          if (option !== '') {
                            return (
                              <div key={index1} className="flex">
                                <div className="bg-red-500">{option}</div>
                                <Input
                                  type="number"
                                  value={price[index0][index1]}
                                  onChange={(e) =>
                                    handlePriceInput(e, index0, index1)
                                  }
                                />
                                <Input
                                  type="number"
                                  value={stocks[index0][index1]}
                                  onChange={(e) =>
                                    handleStockInput(e, index0, index1)
                                  }
                                />
                              </div>
                            );
                          } else return null;
                        })}
                      </div>
                    )}
                  </div>
                );
              } else return null;
            })}
          </div>
          {variants.length > 1 && (
            <div>
              <p>{variants[1].variant_name}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductVariant;
