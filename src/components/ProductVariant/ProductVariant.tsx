import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Trash2, Plus, X } from 'lucide-react';
import { IProdcutVariant } from '@/interface/addProduct';
import { Label } from '../ui/label';
import styles from './ProductVariant.module.css';

const maxOptLength: number = 3;
const maxVariant: number = 2;

const ProductVariant = () => {
  const [isVariantActive, setIsVariantActive] = useState<boolean>(false);
  const [noVarPrice, setNoVarPrice] = useState<number | ''>(0);
  const [noVarStock, setNoVarStock] = useState<number | ''>(0);
  const [isNoVarValid, setIsNoVarValid] = useState<{
    price: boolean;
    stock: boolean;
  }>({
    price: true,
    stock: true,
  });
  const [variants, setVariants] = useState<IProdcutVariant[]>([
    { variant_name: '', options: [undefined] },
  ]);
  const [price, setPrice] = useState<number[][]>(
    new Array(maxOptLength).fill(new Array(maxOptLength).fill(0)),
  );
  const [stocks, setStocks] = useState<number[][]>(
    new Array(maxOptLength).fill(new Array(maxOptLength).fill(0)),
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
      newVariants[biggerIndex].options[index] === undefined &&
      index === newVariants[biggerIndex].options.length - 1 &&
      newVariants[biggerIndex].options.length < maxOptLength
    ) {
      newVariants[biggerIndex].options.push(undefined);
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
      for (let i = 0; i < maxOptLength; i++) {
        newPrice[i].splice(index, 1);
        newPrice[i].push(0);
        newStocks[i].splice(index, 1);
        newStocks[i].push(0);
      }
      setPrice(newPrice);
      setStocks(newStocks);
    }
    const newVariants = [...variants];
    newVariants[biggerIndex].options.splice(index, 1);
    const optionsLength = newVariants[biggerIndex].options.length;
    if (
      optionsLength < maxOptLength &&
      newVariants[biggerIndex].options[optionsLength - 1] !== undefined
    ) {
      newVariants[biggerIndex].options.push(undefined);
    }
    setVariants(newVariants);
  }

  function handleAddVariant() {
    const newVariants = [...variants];
    newVariants.push({ variant_name: '', options: [undefined] });
    setVariants(newVariants);
    setPrice(new Array(maxOptLength).fill(new Array(maxOptLength).fill(0)));
    setStocks(new Array(maxOptLength).fill(new Array(maxOptLength).fill(0)));
  }

  function handlePriceInput(
    e: React.ChangeEvent<HTMLInputElement>,
    index0: number,
    index1: number,
  ) {
    const { value } = e.target;
    const valNum = parseInt(value);
    const newPrice = [...price];

    const newSmallArray = [...newPrice[index0]];
    newSmallArray[index1] = valNum;
    newPrice[index0] = newSmallArray;
    setPrice(newPrice);
  }

  function handleStockInput(
    e: React.ChangeEvent<HTMLInputElement>,
    index0: number,
    index1: number,
  ) {
    const { value } = e.target;
    const valNum = parseInt(value);
    const newStocks = [...stocks];
    const newSmallArray = [...newStocks[index0]];
    newSmallArray[index1] = valNum;
    newStocks[index0] = newSmallArray;
    setStocks(newStocks);
  }

  function handleDeleteVariant(biggerIndex: number) {
    const newVariant = [...variants];
    newVariant.splice(biggerIndex, 1);
    setVariants(newVariant);
    setPrice(new Array(maxOptLength).fill(new Array(maxOptLength).fill(0)));
    setStocks(new Array(maxOptLength).fill(new Array(maxOptLength).fill(0)));
  }

  useEffect(() => {
    console.log('price', price);
    console.log('stock', stocks);
    console.log('variants', variants);
  }, [price, stocks, variants]);

  function handleNumKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (['e', 'E', '+', '-', ' '].includes(e.key)) {
      e.preventDefault();
    }
  }

  function handleNumInput(
    e: React.ChangeEvent<HTMLInputElement>,
    setter: Dispatch<SetStateAction<number | ''>>,
  ) {
    if (e.target.value === '') {
      setter('');
      return;
    }
    const inputValue = parseInt(e.target.value);
    if (isNaN(inputValue) || inputValue < 0) {
      setter(0);
    } else {
      setter(inputValue);
    }
  }

  function validateNoVarOnBlur(
    inputValue: number | '',
    setter: Dispatch<SetStateAction<{ stock: boolean; price: boolean }>>,
    validationObject: { stock: boolean; price: boolean },
    key: keyof { stock: boolean; price: boolean },
  ) {
    if (inputValue === '' || inputValue < 0) {
      setter({ ...validationObject, [key]: false });
    } else {
      setter({ ...validationObject, [key]: true });
    }
  }

  function handleActivateVariant() {
    setVariants([{ variant_name: '', options: [undefined] }]);
    setPrice(new Array(maxOptLength).fill(new Array(maxOptLength).fill(0)));
    setStocks(new Array(maxOptLength).fill(new Array(maxOptLength).fill(0)));
    setIsVariantActive(true);
  }

  function handleDeactivateVariant() {
    setNoVarPrice(0);
    setNoVarStock(0);
    setIsNoVarValid({ price: true, stock: true });
    setIsVariantActive(false);
  }

  if (!isVariantActive) {
    return (
      <div className="flex flex-col gap-3 w-full">
        <div className="flex items-center gap-2 w-full">
          <Label
            className="min-w-fit w-40 text-right font-light text-xs lg:text-sm"
            htmlFor="activate-variant-button"
          >
            Variant:
          </Label>
          <Button
            size={'customBlank'}
            variant={'outline'}
            className="text-base px-3 py-2"
            onClick={handleActivateVariant}
            id="activate-variant-button"
          >
            Activate Variant
          </Button>
        </div>
        <div className="flex items-center gap-2 w-full">
          <Label
            className="min-w-fit w-40 text-right font-light text-xs lg:text-sm"
            htmlFor="non-variant-price"
          >
            Price
            <span className="text-primary">{'* '}</span>:
          </Label>
          <div className="w-4/12 flex flex-col gap-1">
            <Input
              id="non-variant-price"
              type="number"
              min={0}
              value={noVarPrice}
              onChange={(e) => handleNumInput(e, setNoVarPrice)}
              className={`w-full ${styles.hideIndicator}`}
              onKeyDown={(e) => handleNumKeyDown(e)}
              onBlur={() =>
                validateNoVarOnBlur(
                  noVarPrice,
                  setIsNoVarValid,
                  isNoVarValid,
                  'price',
                )
              }
              isValid={isNoVarValid.price}
            />
            {!isNoVarValid.price && (
              <p className="text-xs text-destructive">Price cannot be empty</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 w-full">
          <Label
            className="min-w-fit w-40 text-right font-light text-xs lg:text-sm"
            htmlFor="non-variant-stock"
          >
            Stock
            <span className="text-primary">{'* '}</span>:
          </Label>
          <div className="w-4/12 flex flex-col gap-1">
            <Input
              id="non-variant-stock"
              type="number"
              min={0}
              value={noVarStock}
              onChange={(e) => handleNumInput(e, setNoVarStock)}
              className={`w-full ${styles.hideIndicator}`}
              onKeyDown={(e) => handleNumKeyDown(e)}
              onBlur={() =>
                validateNoVarOnBlur(
                  noVarStock,
                  setIsNoVarValid,
                  isNoVarValid,
                  'stock',
                )
              }
              isValid={isNoVarValid.stock}
            />
            {!isNoVarValid.stock && (
              <p className="text-xs text-destructive">Stock cannot be empty</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-5">
      <Button
        size={'customBlank'}
        variant={'outline'}
        className="text-base px-3 py-2 w-fit"
        onClick={handleDeactivateVariant}
      >
        Deactivate Variant
      </Button>
      <div className="flex flex-col gap-5">
        <div className="w-full flex flex-col gap-5">
          {variants.map((variant, biggerIndex) => (
            <div
              key={biggerIndex}
              className="bg-gray-100 p-2 flex flex-col gap-3 relative"
            >
              <div className="flex items-center gap-2 w-full">
                <Label
                  className="min-w-fit text-right font-light text-xs lg:text-sm"
                  htmlFor={`variant-${biggerIndex + 1}-title`}
                >
                  Variant {`${biggerIndex + 1}`}
                  <span className="text-primary">{'* '}</span>:
                </Label>
                <Input
                  placeholder="Ex: Color, Size"
                  id={`variant-${biggerIndex + 1}-title`}
                  type="text"
                  value={variant.variant_name}
                  onChange={(e) => handleVariantNameInput(e, biggerIndex)}
                  className="w-96"
                />
              </div>
              <div className="flex items-start gap-2 w-full">
                <p className="min-w-fit text-right font-light text-xs lg:text-sm">
                  Option&#40;s&#41;
                  <span className="text-primary">{'* '}</span>:
                </p>
                <div className="grid grid-rows-2 grid-cols-2 gap-2 w-full">
                  {variant.options.map((option, index) => (
                    <div className="flex items-center gap-2" key={index}>
                      <Input
                        placeholder="Ex: Blue, S"
                        value={option === undefined ? '' : option}
                        onChange={(e) =>
                          handleOptionChange(e, index, biggerIndex)
                        }
                        className="w-5/6"
                      />
                      <button
                        onClick={() => handleDeleteOptions(index, biggerIndex)}
                        disabled={option === undefined}
                        className="disabled:hidden"
                      >
                        <Trash2 className="w-5 h-5 text-gray-500 opacity-80" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              {variants.length > 1 && (
                <Button
                  onClick={() => handleDeleteVariant(biggerIndex)}
                  size={'customBlank'}
                  variant={'destructive'}
                  disabled={variants.length < 2}
                  className="absolute right-2 top-2 px-2 py-1 text-base w-fit"
                >
                  <X className="w-5 h-5 mr-1" />
                  Delete Variant
                </Button>
              )}
              {variants.length < maxVariant && (
                <Button
                  disabled={variants.length > 1}
                  size={'customBlank'}
                  variant={'outline'}
                  onClick={handleAddVariant}
                  className="w-fit px-2 py-1 text-base disabled:hidden"
                >
                  <Plus className="w-5 h-5 mr-1" />
                  Add Variant
                </Button>
              )}
            </div>
          ))}
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="w-full flex">
            {variants.length === 1 && (
              <>
                <p className="w-1/3 border-2 border-gray-100 text-base text-center py-2 font-light truncate">
                  {variants[0].variant_name}
                </p>
                <p className="w-1/3 border-2 border-gray-100 text-base text-center py-2 font-light truncate">
                  Price
                </p>
                <p className="w-1/3 border-2 border-gray-100 text-base text-center py-2 font-light truncate">
                  Stock
                </p>
              </>
            )}
            {variants.length === 2 && (
              <>
                <p className="w-1/4 border-2 border-gray-100 text-base text-center py-2 font-light truncate">
                  {variants[0].variant_name}
                </p>
                <p className="w-1/4 border-2 border-gray-100 text-base text-center py-2 font-light truncate">
                  {variants[1].variant_name}
                </p>
                <p className="w-1/4 border-2 border-gray-100 text-base text-center py-2 font-light truncate">
                  Price
                </p>
                <p className="w-1/4 border-2 border-gray-100 text-base text-center py-2 font-light truncate">
                  Stock
                </p>
              </>
            )}
          </div>
          {variants.length > 1 ? (
            <div className="w-full">
              {variants[0].options.map(
                (option, index0) =>
                  option !== undefined && (
                    <div key={index0} className="flex w-full min-h-fit">
                      <p className="w-1/4 text-center min-h-full border-2 border-gray-100 flex justify-center items-center font-light truncate">
                        {option}
                      </p>
                      {variants[1] !== undefined && (
                        <div className="flex flex-col w-3/4">
                          {variants[1].options.map(
                            (option, index1) =>
                              option !== undefined && (
                                <div
                                  key={index1}
                                  className="flex w-full min-h-fit"
                                >
                                  <p className="w-1/3 text-center flex justify-center items-center min-h-full border-2 border-gray-100 font-light truncate">
                                    {option}
                                  </p>
                                  <div className="w-1/3 p-2 border-2 border-gray-100 min-h-fit">
                                    <Input
                                      type="number"
                                      className="h-12"
                                      value={price[index0][index1]}
                                      onChange={(e) =>
                                        handlePriceInput(e, index0, index1)
                                      }
                                      onKeyDown={(e) => handleNumKeyDown(e)}
                                      min={0}
                                    />
                                  </div>
                                  <div className="w-1/3 p-2 border-2 border-gray-100 min-h-fit">
                                    <Input
                                      type="number"
                                      className="h-12"
                                      value={stocks[index0][index1]}
                                      onChange={(e) =>
                                        handleStockInput(e, index0, index1)
                                      }
                                      onKeyDown={(e) => handleNumKeyDown(e)}
                                      min={0}
                                    />
                                  </div>
                                </div>
                              ),
                          )}
                        </div>
                      )}
                    </div>
                  ),
              )}
            </div>
          ) : (
            <div className="w-full">
              {variants[0].options.map(
                (option, index0) =>
                  option !== undefined && (
                    <div key={index0} className="flex w-full min-h-fit">
                      <p className="w-1/3 text-center min-h-full border-2 border-gray-100 flex justify-center items-center font-light truncate">
                        {option}
                      </p>
                      <div className="w-1/3 p-2 border-2 border-gray-100 min-h-fit">
                        <Input
                          type="number"
                          className="h-12"
                          value={price[index0][0]}
                          onChange={(e) => handlePriceInput(e, index0, 0)}
                          onKeyDown={(e) => handleNumKeyDown(e)}
                          min={0}
                        />
                      </div>
                      <div className="w-1/3 p-2 border-2 border-gray-100 min-h-fit">
                        <Input
                          type="number"
                          className="h-12"
                          value={stocks[index0][0]}
                          onChange={(e) => handleStockInput(e, index0, 0)}
                          onKeyDown={(e) => handleNumKeyDown(e)}
                          min={0}
                        />
                      </div>
                    </div>
                  ),
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductVariant;
