import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Plus, X } from 'lucide-react';
import {
  IIsProductVariantValid,
  IProdcutVariant,
} from '@/interface/addProduct';
import { Label } from '../ui/label';
import styles from './ProductVariant.module.css';

const maxOptLength: number = 3;
const maxVariant: number = 2;
const maxVariantNameLength: number = 15;
const maxOptNameLength: number = 20;

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
  const [isVariantsValid, setIsVariantsValid] = useState<
    IIsProductVariantValid[]
  >([{ variant_name: true, options: [true] }]);
  const [price, setPrice] = useState<(number | '')[][]>(
    new Array(maxOptLength).fill(new Array(maxOptLength).fill(0)),
  );
  const [stocks, setStocks] = useState<(number | '')[][]>(
    new Array(maxOptLength).fill(new Array(maxOptLength).fill(0)),
  );
  const [isPriceValid, setIsPriceValid] = useState<boolean[][]>(
    new Array(maxOptLength).fill(new Array(maxOptLength).fill(true)),
  );
  const [isStockValid, setIsStockValid] = useState<boolean[][]>(
    new Array(maxOptLength).fill(new Array(maxOptLength).fill(true)),
  );

  function handleVariantNameInput(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) {
    const { value } = e.target;
    if (value.length > maxVariantNameLength) return;
    if (/^\s+$/.test(value) || value === '') {
      const newVariants = [...variants];
      newVariants[index].variant_name = '';
      setVariants(newVariants);
    } else {
      const newVariants = [...variants];
      newVariants[index].variant_name = value;
      setVariants(newVariants);
    }
  }

  function handleOptionChange(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    biggerIndex: number,
  ) {
    const { value } = e.target;
    if (value.length > maxOptNameLength) return;
    const newVariants = [...variants];
    const newIsVariantsValid = [...isVariantsValid];
    if (
      !/^\s+$/.test(value) &&
      value !== '' &&
      newVariants[biggerIndex].options[index] === undefined &&
      index === newVariants[biggerIndex].options.length - 1 &&
      newVariants[biggerIndex].options.length < maxOptLength
    ) {
      newVariants[biggerIndex].options.push(undefined);
      newIsVariantsValid[biggerIndex].options.push(true);
    }
    if (
      (/^\s+$/.test(value) || value === '') &&
      newVariants[biggerIndex].options[index] === undefined
    ) {
      newVariants[biggerIndex].options[index] = undefined;
      setVariants(newVariants);
    } else {
      newVariants[biggerIndex].options[index] = value;
      setVariants(newVariants);
    }
  }

  function validateOptOnBlur(
    inputValue: string | undefined,
    index: number,
    biggerIndex: number,
  ) {
    if (inputValue === undefined) return;
    const newIsVariantsValid = [...isVariantsValid];
    if (inputValue === '') {
      newIsVariantsValid[biggerIndex].options[index] = false;
      setIsVariantsValid(newIsVariantsValid);
    } else {
      newIsVariantsValid[biggerIndex].options[index] = true;
      setIsVariantsValid(newIsVariantsValid);
    }
  }

  function handleDeleteOptions(index: number, biggerIndex: number) {
    if (biggerIndex === 0) {
      const newPrice = [...price];
      newPrice.splice(index, 1);
      newPrice.push([0, 0, 0]);
      setPrice(newPrice);
      const newIsPriceValid = [...isPriceValid];
      newIsPriceValid.splice(index, 1);
      newIsPriceValid.push([true, true, true]);
      setIsPriceValid(newIsPriceValid);
      const newStocks = [...stocks];
      newStocks.splice(index, 1);
      newStocks.push([0, 0, 0]);
      setStocks(newStocks);
      const newIsStockValid = [...isStockValid];
      newIsStockValid.splice(index, 1);
      newIsStockValid.push([true, true, true]);
      setIsStockValid(newIsStockValid);
    } else {
      const newPrice = [...price];
      const newIsPriceValid = [...isPriceValid];
      const newStocks = [...stocks];
      const newIsStockValid = [...isStockValid];
      for (let i = 0; i < maxOptLength; i++) {
        newPrice[i].splice(index, 1);
        newPrice[i].push(0);
        newIsPriceValid[i].splice(index, 1);
        newIsPriceValid[i].push(true);
        newStocks[i].splice(index, 1);
        newStocks[i].push(0);
        newIsStockValid[i].splice(index, 1);
        newIsStockValid[i].push(true);
      }
      setPrice(newPrice);
      setIsPriceValid(newIsPriceValid);
      setStocks(newStocks);
      setIsStockValid(newIsStockValid);
    }
    const newVariants = [...variants];
    const newIsVariantsValid = [...isVariantsValid];
    newVariants[biggerIndex].options.splice(index, 1);
    newIsVariantsValid[biggerIndex].options.splice(index, 1);
    const optionsLength = newVariants[biggerIndex].options.length;
    if (
      optionsLength < maxOptLength &&
      newVariants[biggerIndex].options[optionsLength - 1] !== undefined
    ) {
      newVariants[biggerIndex].options.push(undefined);
      newIsVariantsValid[biggerIndex].options.push(true);
    }
    setVariants(newVariants);
    setIsVariantsValid(newIsVariantsValid);
  }

  function handleAddVariant() {
    const newVariants = [...variants];
    const newIsVariantsValid = [...isVariantsValid];
    newVariants.push({ variant_name: '', options: [undefined] });
    newIsVariantsValid.push({ variant_name: true, options: [true] });
    setVariants(newVariants);
    setIsVariantsValid(newIsVariantsValid);
    setPrice(new Array(maxOptLength).fill(new Array(maxOptLength).fill(0)));
    setIsPriceValid(
      new Array(maxOptLength).fill(new Array(maxOptLength).fill(true)),
    );
    setStocks(new Array(maxOptLength).fill(new Array(maxOptLength).fill(0)));
    setIsStockValid(
      new Array(maxOptLength).fill(new Array(maxOptLength).fill(true)),
    );
  }

  function handlePriceInput(
    e: React.ChangeEvent<HTMLInputElement>,
    index0: number,
    index1: number,
  ) {
    const { value } = e.target;
    if (value === '') {
      const newPrice = [...price];
      const newSmallArray = [...newPrice[index0]];
      newSmallArray[index1] = value;
      newPrice[index0] = newSmallArray;
      setPrice(newPrice);
      return;
    }
    const valNum = parseInt(value);
    if (isNaN(valNum) || valNum < 0) {
      const newPrice = [...price];
      const newSmallArray = [...newPrice[index0]];
      newSmallArray[index1] = 0;
      newPrice[index0] = newSmallArray;
      setPrice(newPrice);
    } else {
      const newPrice = [...price];
      const newSmallArray = [...newPrice[index0]];
      newSmallArray[index1] = valNum;
      newPrice[index0] = newSmallArray;
      setPrice(newPrice);
    }
  }

  function handleStockInput(
    e: React.ChangeEvent<HTMLInputElement>,
    index0: number,
    index1: number,
  ) {
    const { value } = e.target;
    if (value === '') {
      const newStocks = [...stocks];
      const newSmallArray = [...newStocks[index0]];
      newSmallArray[index1] = value;
      newStocks[index0] = newSmallArray;
      setStocks(newStocks);
      return;
    }
    const valNum = parseInt(value);
    if (isNaN(valNum) || valNum < 0) {
      const newStocks = [...stocks];
      const newSmallArray = [...newStocks[index0]];
      newSmallArray[index1] = 0;
      newStocks[index0] = newSmallArray;
      setStocks(newStocks);
    } else {
      const newStocks = [...stocks];
      const newSmallArray = [...newStocks[index0]];
      newSmallArray[index1] = valNum;
      newStocks[index0] = newSmallArray;
      setStocks(newStocks);
    }
  }

  function handleDeleteVariant(biggerIndex: number) {
    const newVariant = [...variants];
    const newIsVariantsValid = [...isVariantsValid];
    newVariant.splice(biggerIndex, 1);
    newIsVariantsValid.splice(biggerIndex, 1);
    setVariants(newVariant);
    setIsVariantsValid(newIsVariantsValid);
    setPrice(new Array(maxOptLength).fill(new Array(maxOptLength).fill(0)));
    setIsPriceValid(
      new Array(maxOptLength).fill(new Array(maxOptLength).fill(true)),
    );
    setStocks(new Array(maxOptLength).fill(new Array(maxOptLength).fill(0)));
    setIsStockValid(
      new Array(maxOptLength).fill(new Array(maxOptLength).fill(true)),
    );
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
    if (key === 'price') {
      if (inputValue === '' || inputValue < 99) {
        setter({ ...validationObject, [key]: false });
      } else {
        setter({ ...validationObject, [key]: true });
      }
    } else if (key === 'stock') {
      if (inputValue === '' || inputValue < 0) {
        setter({ ...validationObject, [key]: false });
      } else {
        setter({ ...validationObject, [key]: true });
      }
    }
  }

  function validateVarOnBlur(
    inputValue: number | '',
    key: 'price' | 'stock',
    index0: number,
    index1: number,
  ) {
    if (key === 'price') {
      if (inputValue === '' || inputValue < 99) {
        const newIsPriceValid = [...isPriceValid];
        const newSmallArray = [...newIsPriceValid[index0]];
        newSmallArray[index1] = false;
        newIsPriceValid[index0] = newSmallArray;
        setIsPriceValid(newIsPriceValid);
      } else if (isPriceValid[index0][index1] === true) {
        return;
      } else {
        const newIsPriceValid = [...isPriceValid];
        const newSmallArray = [...newIsPriceValid[index0]];
        newSmallArray[index1] = true;
        newIsPriceValid[index0] = newSmallArray;
        setIsPriceValid(newIsPriceValid);
      }
    } else {
      if (inputValue === '' || inputValue < 0) {
        const newIsStockValid = [...isStockValid];
        const newSmallArray = [...newIsStockValid[index0]];
        newSmallArray[index1] = false;
        newIsStockValid[index0] = newSmallArray;
        setIsStockValid(newIsStockValid);
      } else if (isStockValid[index0][index1]) {
        return;
      } else {
        const newIsStockValid = [...isStockValid];
        const newSmallArray = [...newIsStockValid[index0]];
        newSmallArray[index1] = true;
        newIsStockValid[index0] = newSmallArray;
        setIsStockValid(newIsStockValid);
      }
    }
  }

  function validateVarNameOnBlur(inputValue: string, index: number) {
    if (inputValue === '') {
      const newIsVariantsValid = [...isVariantsValid];
      newIsVariantsValid[index].variant_name = false;
      setIsVariantsValid(newIsVariantsValid);
    } else {
      const newIsVariantsValid = [...isVariantsValid];
      newIsVariantsValid[index].variant_name = true;
      setIsVariantsValid(newIsVariantsValid);
    }
  }

  function handleActivateVariant() {
    setVariants([{ variant_name: '', options: [undefined] }]);
    setIsVariantsValid([{ variant_name: true, options: [true] }]);
    setPrice(new Array(maxOptLength).fill(new Array(maxOptLength).fill(0)));
    setIsPriceValid(
      new Array(maxOptLength).fill(new Array(maxOptLength).fill(true)),
    );
    setStocks(new Array(maxOptLength).fill(new Array(maxOptLength).fill(0)));
    setIsStockValid(
      new Array(maxOptLength).fill(new Array(maxOptLength).fill(true)),
    );
    setIsVariantActive(true);
  }

  function handleDeactivateVariant() {
    setNoVarPrice(0);
    setNoVarStock(0);
    setIsNoVarValid({ price: true, stock: true });
    setIsVariantActive(false);
  }

  function validateNoVar(): boolean {
    let isContinue: boolean = true;
    if (noVarPrice === '' || noVarPrice < 99) {
      isContinue = false;
      setIsNoVarValid({ ...isNoVarValid, price: false });
    }
    if (noVarStock === '' || noVarStock < 0) {
      isContinue = false;
      setIsNoVarValid({ ...isNoVarValid, stock: false });
    }
    return isContinue;
  }

  function validateVar(): boolean {
    let isContinue: boolean = true;
    const newIsVariantsValid = [...isVariantsValid];
    for (let i = 0; i < variants.length; i++) {
      if (variants[i].variant_name === '') {
        isContinue = false;
        newIsVariantsValid[i].variant_name = false;
      }
      for (let j = 0; j < variants[i].options.length; j++) {
        if (
          (variants[i].options.length === 1 &&
            variants[i].options[j] === undefined) ||
          variants[i].options[j] === ''
        ) {
          isContinue = false;
          newIsVariantsValid[i].options[j] = false;
        }
      }
    }
    setIsVariantsValid(newIsVariantsValid);
    if (variants.length === 1) {
      const newIsPriceValid = [...isPriceValid];
      const newIsStockValid = [...isStockValid];
      for (let i = 0; i < variants[0].options.length; i++) {
        if (price[i][0] === '' || (price[i][0] as number) < 99) {
          isContinue = false;
          const newSmallArray = [...newIsPriceValid[i]];
          newSmallArray[0] = false;
          newIsPriceValid[i] = newSmallArray;
        }
        if (stocks[i][0] === '' || (stocks[i][0] as number) < 0) {
          isContinue = false;
          const newSmallArray = [...newIsStockValid[i]];
          newSmallArray[0] = false;
          newIsStockValid[i] = newSmallArray;
        }
      }
      setIsPriceValid(newIsPriceValid);
      setIsStockValid(newIsStockValid);
    }
    if (variants.length === 2) {
      const newIsPriceValid = [...isPriceValid];
      const newIsStockValid = [...isStockValid];
      for (let i = 0; i < variants[0].options.length; i++) {
        for (let j = 0; j < variants[1].options.length; j++) {
          if (
            variants[0].options[i] !== undefined &&
            variants[1].options[j] !== undefined &&
            (price[i][j] === '' || (price[i][j] as number) < 99)
          ) {
            isContinue = false;
            const newSmallArray = [...newIsPriceValid[i]];
            newSmallArray[j] = false;
            newIsPriceValid[j] = newSmallArray;
          }
          if (
            variants[0].options[i] !== undefined &&
            variants[1].options[j] !== undefined &&
            (stocks[i][j] === '' || (stocks[i][j] as number) < 0)
          ) {
            isContinue = false;
            const newSmallArray = [...newIsStockValid[i]];
            newSmallArray[j] = false;
            newIsStockValid[i] = newSmallArray;
          }
        }
      }
      setIsPriceValid(newIsPriceValid);
      setIsStockValid(newIsStockValid);
    }
    return isContinue;
  }

  function validateAll() {
    let isContinue: boolean = true;
    if (!isVariantActive && !validateNoVar()) {
      isContinue = false;
    }
    return isContinue;
  }

  function logEndProduct() {
    validateVar();
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
              <p className="text-xs text-destructive">
                Price cannot be empty and must be 99 minimum
              </p>
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
                <div className="w-96 flex flex-col gap-1">
                  <p className="w-full text-black text-xs pl-2">{`${variant.variant_name.length}/${maxVariantNameLength} characters`}</p>
                  <Input
                    placeholder="Ex: Color, Size"
                    id={`variant-${biggerIndex + 1}-title`}
                    type="text"
                    value={variant.variant_name}
                    onChange={(e) => handleVariantNameInput(e, biggerIndex)}
                    isValid={isVariantsValid[biggerIndex].variant_name}
                    onBlur={() =>
                      validateVarNameOnBlur(variant.variant_name, biggerIndex)
                    }
                    className="w-full"
                  />
                  {!isVariantsValid[biggerIndex].variant_name && (
                    <p className="w-full text-left text-xs text-destructive">
                      Variant name cannot be empty
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-start gap-2 w-full">
                <p className="min-w-fit text-right font-light text-xs lg:text-sm">
                  Option&#40;s&#41;
                  <span className="text-primary">{'* '}</span>:
                </p>
                <div className="grid grid-rows-2 grid-cols-2 gap-2 w-full">
                  {variant.options.map((option, index) => (
                    <div className="flex items-center gap-2" key={index}>
                      <div className="w-5/6 flex flex-col gap-1">
                        {option !== undefined && (
                          <p className="w-full text-black text-xs pl-2">{`${option.length}/${maxOptNameLength} characters`}</p>
                        )}
                        <Input
                          type="text"
                          placeholder="Ex: Blue, S"
                          value={option === undefined ? '' : option}
                          onChange={(e) =>
                            handleOptionChange(e, index, biggerIndex)
                          }
                          isValid={isVariantsValid[biggerIndex].options[index]}
                          onBlur={() =>
                            validateOptOnBlur(option, index, biggerIndex)
                          }
                          className="w-full"
                        />
                        {!isVariantsValid[biggerIndex].options[index] && (
                          <p className="w-full text-left text-xs text-destructive">
                            Option name cannot be empty
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteOptions(index, biggerIndex)}
                        disabled={option === undefined}
                        className="disabled:hidden"
                      >
                        <X className="w-5 h-5 text-gray-500 opacity-80" />
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
        <div className="w-full flex flex-col">
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
                                  <div className="w-1/3 p-2 border-2 border-gray-100 min-h-fit flex flex-col gap-2">
                                    <Input
                                      type="number"
                                      className={`${styles.hideIndicator} h-12`}
                                      value={price[index0][index1]}
                                      onChange={(e) =>
                                        handlePriceInput(e, index0, index1)
                                      }
                                      isValid={isPriceValid[index0][index1]}
                                      onBlur={() =>
                                        validateVarOnBlur(
                                          price[index0][index1],
                                          'price',
                                          index0,
                                          index1,
                                        )
                                      }
                                      onKeyDown={(e) => handleNumKeyDown(e)}
                                      min={0}
                                    />
                                    {!isPriceValid[index0][index1] && (
                                      <p className="text-xs text-destructive w-full text-left">
                                        Price cannot be empty and must be 99
                                        minimum
                                      </p>
                                    )}
                                  </div>
                                  <div className="w-1/3 p-2 border-2 border-gray-100 min-h-fit flex flex-col gap-2">
                                    <Input
                                      type="number"
                                      className={`${styles.hideIndicator} h-12`}
                                      value={stocks[index0][index1]}
                                      onChange={(e) =>
                                        handleStockInput(e, index0, index1)
                                      }
                                      isValid={isStockValid[index0][index1]}
                                      onBlur={() =>
                                        validateVarOnBlur(
                                          stocks[index0][index1],
                                          'stock',
                                          index0,
                                          index1,
                                        )
                                      }
                                      onKeyDown={(e) => handleNumKeyDown(e)}
                                      min={0}
                                    />
                                    {!isStockValid[index0][index1] && (
                                      <p className="text-xs text-destructive w-full text-left">
                                        Stock cannot be empty
                                      </p>
                                    )}
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
                      <div className="w-1/3 p-2 border-2 border-gray-100 min-h-fit flex flex-col gap-2">
                        <Input
                          type="number"
                          className={`${styles.hideIndicator} h-12`}
                          value={price[index0][0]}
                          onChange={(e) => handlePriceInput(e, index0, 0)}
                          isValid={isPriceValid[index0][0]}
                          onBlur={() =>
                            validateVarOnBlur(
                              price[index0][0],
                              'price',
                              index0,
                              0,
                            )
                          }
                          onKeyDown={(e) => handleNumKeyDown(e)}
                          min={0}
                        />
                        {!isPriceValid[index0][0] && (
                          <p className="text-xs text-destructive w-full text-left">
                            Price cannot be empty and must be 99 minimum
                          </p>
                        )}
                      </div>
                      <div className="w-1/3 p-2 border-2 border-gray-100 min-h-fit flex flex-col gap-2">
                        <Input
                          type="number"
                          className={`${styles.hideIndicator} h-12`}
                          value={stocks[index0][0]}
                          onChange={(e) => handleStockInput(e, index0, 0)}
                          isValid={isStockValid[index0][0]}
                          onBlur={() =>
                            validateVarOnBlur(
                              stocks[index0][0],
                              'stock',
                              index0,
                              0,
                            )
                          }
                          onKeyDown={(e) => handleNumKeyDown(e)}
                          min={0}
                        />
                        {!isStockValid[index0][0] && (
                          <p className="text-xs text-destructive w-full text-left">
                            Stock cannot be empty
                          </p>
                        )}
                      </div>
                    </div>
                  ),
              )}
            </div>
          )}
        </div>
      </div>
      <Button onClick={logEndProduct}>Log End Product</Button>
    </div>
  );
};

export default ProductVariant;
