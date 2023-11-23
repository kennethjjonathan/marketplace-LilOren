import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { ArrowDownUp, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Utils } from '@/utils';
import axiosInstance from '@/lib/axiosInstance';
import {
  ICategory,
  IDistrict,
  IProvince,
  SortOptions,
} from '@/interface/searchFilter';
import { Checkbox } from '@/components/ui/checkbox';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { Input } from '../ui/input';
import styles from './SearchFilter.module.scss';

const sortOptions: SortOptions[] = [
  'Lowest price',
  'Highest price',
  'Latest',
  'Oldest',
];

const SearchFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // LocationFilter --START
  const [isLocationOpen, setIsLocationOpen] = useState<boolean>(false);
  const [chosenProvince, setChosenProvince] = useState<number | undefined>(
    undefined,
  );
  const [provinceArray, setProvinceArray] = useState<IProvince[]>([]);
  const [isDistrictLoading, setIsDistrciLoading] = useState<boolean>(false);
  const [districtArray, setDistrictArray] = useState<IDistrict[]>([]);
  const [chosenDistrict, setChosenDistrict] = useState<string[]>([]);

  function clearLoactionFilter() {
    setChosenDistrict([]);
    setChosenProvince(undefined);
    const params = new URLSearchParams(searchParams);
    params.delete('province');
    params.delete('districts');
    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`);
    setIsLocationOpen(false);
  }

  function handleDistrictChange(isChecked: boolean, value: string) {
    const newChosenDistrict: string[] = [...chosenDistrict];
    if (isChecked) {
      newChosenDistrict.push(value);
    } else {
      const delIndex = newChosenDistrict.findIndex((item) => item === value);
      newChosenDistrict.splice(delIndex, 1);
    }
    setChosenDistrict(newChosenDistrict);
    const params = new URLSearchParams(searchParams);
    if (newChosenDistrict.length === 0) {
      params.delete('province');
      params.delete('districts');
    } else {
      params.set('province', chosenProvince!.toString());
      params.set('districts', newChosenDistrict.join(','));
    }
    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`);
  }

  async function getProvinces() {
    try {
      const response = await axiosInstance(
        `/dropdowns/location-unit/provinces`,
      );
      setProvinceArray(response.data.data);
    } catch (error) {
      Utils.handleGeneralError(error);
      console.error(error);
    }
  }

  async function getDistrict(value: string) {
    setIsDistrciLoading(true);
    setChosenProvince(parseInt(value));
    setChosenDistrict([]);
    try {
      const response = await axiosInstance(
        `/dropdowns/location-unit/provinces/${value}/districts`,
      );
      setDistrictArray(response.data.data);
    } catch (error) {
      Utils.handleGeneralError(error);
      console.error(error);
    } finally {
      setIsDistrciLoading(false);
    }
  }
  // LocationFilter --END

  // CategoryFilter --START
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
  const [chosenCategory1, setChosenCategory1] = useState<string | undefined>(
    undefined,
  );
  const [chosenCategory2, setChosenCategory2] = useState<string | undefined>(
    undefined,
  );
  const [category1Array, setCategory1Array] = useState<ICategory[]>([]);
  const [category2Array, setCategory2Array] = useState<ICategory[]>([]);
  const [isCategory2Loading, setIscCategory2Loading] = useState<boolean>(false);

  async function getCategory1() {
    try {
      const response = await axiosInstance(
        `/dropdowns/products/top-categories`,
      );
      setCategory1Array(response.data.data);
    } catch (error) {
      Utils.handleGeneralError(error);
      console.error(error);
    }
  }

  async function handleCategory1Change(value: string) {
    setIscCategory2Loading(true);
    setChosenCategory1(value);
    setChosenCategory2(undefined);
    try {
      const response = await axiosInstance(
        `/dropdowns/products/child-category?parent_id=${value}`,
      );
      setCategory2Array(response.data.data);
    } catch (error) {
      Utils.handleGeneralError(error);
      console.error(error);
    } finally {
      setIscCategory2Loading(false);
    }
  }

  function handleChoseCategory2(value: string) {
    setChosenCategory2(value);
    const params = new URLSearchParams(searchParams);
    params.set('category1', chosenCategory1!);
    params.set('category', value);
    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`);
    setIsCategoryOpen(false);
  }

  function clearCategoryFilter() {
    setChosenCategory1(undefined);
    setChosenCategory2(undefined);
    setCategory2Array([]);
    const params = new URLSearchParams(searchParams);
    params.delete('category1');
    params.delete('category');
    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`);
    setIsCategoryOpen(false);
  }
  // CategoryFilter --END

  // PriceFilter --START
  const [isPriceOpen, setIsPriceOpen] = useState<boolean>(false);
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
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

  function applyPriceFilter() {
    if (minPrice > maxPrice && minPrice !== '' && maxPrice !== '') {
      setMinPrice('');
      setMaxPrice('');
      setIsPriceOpen(false);
      return;
    }
    const params = new URLSearchParams(searchParams);
    if (minPrice === '' || (minPrice as number) <= 0) {
      params.delete('min_price');
    } else {
      params.set('min_price', minPrice.toString());
    }
    if (maxPrice === '' || (maxPrice as number) <= 0) {
      params.delete('max_price');
    } else {
      params.set('max_price', minPrice.toString());
    }
    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`);
    setIsPriceOpen(false);
  }

  function clearPriceFilter() {
    const params = new URLSearchParams(searchParams);
    params.delete('min_price');
    params.delete('max_price');
    setMinPrice('');
    setMaxPrice('');
    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`);
    setIsPriceOpen(false);
  }

  // PriceFilter --END

  // ORDER --START
  const [isOrderOpen, setIsOrderOpen] = useState<boolean>(false);
  const [chosenOrder, setChosenOrder] = useState<SortOptions>('Lowest price');

  function handleOrderChange(value: SortOptions) {
    const params = new URLSearchParams(searchParams);
    if (value === 'Lowest price') {
      params.set('sort_by', 'price');
      params.set('sort_desc', 'false');
    } else if (value === 'Highest price') {
      params.set('sort_by', 'price');
      params.set('sort_desc', 'true');
    } else if (value === 'Latest') {
      params.set('sort_by', 'created_at');
      params.set('sort_desc', 'true');
    } else {
      params.set('sort_by', 'created_at');
      params.set('sort_desc', 'false');
    }
    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`);
    setIsOrderOpen(false);
  }
  // ORDER --END

  function setInitialState() {
    const province: string | null = searchParams.get('province');
    const districts: string | null = searchParams.get('districts');
    const sort_by: string | null = searchParams.get('sort_by');
    const sort_desc: string | null = searchParams.get('sort_desc');
    const category1: string | null = searchParams.get('category1');
    const category: string | null = searchParams.get('category');
    const min_price: string | null = searchParams.get('min_price');
    const max_price: string | null = searchParams.get('max_price');
    if (typeof province === 'string') {
      getDistrict(province);
    }
    if (typeof districts === 'string') {
      setChosenDistrict(districts.split(','));
    }
    if (typeof sort_by === 'string' && typeof sort_desc === 'string') {
      sortSetter(sort_by, sort_desc);
    }
    if (typeof category1 === 'string') {
      handleCategory1Change(category1);
    }
    if (typeof category === 'string') {
      setChosenCategory2(category);
    }
    if (typeof min_price === 'string') {
      setMinPrice(parseInt(min_price));
    }
    if (typeof max_price === 'string') {
      setMaxPrice(parseInt(max_price));
    }
  }

  function sortSetter(sort_by: string, sort_desc: string) {
    if (sort_by === 'price') {
      sort_desc === 'false'
        ? setChosenOrder('Lowest price')
        : setChosenOrder('Highest price');
    }
    if (sort_by === 'created_at') {
      sort_desc === 'false'
        ? setChosenOrder('Oldest')
        : setChosenOrder('Latest');
    }
  }

  function cleanAllFilter() {
    const params = new URLSearchParams(searchParams);
    params.delete('province');
    params.delete('districts');
    params.delete('sort_by');
    params.delete('sort_desc');
    params.delete('category1');
    params.delete('category');
    params.delete('min_price');
    params.delete('max_price');
    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`);
  }

  useEffect(() => {
    setInitialState();
  }, [searchParams]);

  useEffect(() => {
    getProvinces();
    getCategory1();
  }, []);
  return (
    <>
      <div className="w-full max-w-full flex items-center">
        <div className="w-full overflow-x-auto flex items-center flex-1 space-x-2 py-5">
          <Button
            size={'customBlank'}
            variant={'outline'}
            className="p-1.5"
            onClick={() => setIsLocationOpen(true)}
          >
            By Location
          </Button>
          <Button
            size={'customBlank'}
            variant={'outline'}
            className="p-1.5"
            onClick={() => setIsCategoryOpen(true)}
          >
            By Category
          </Button>
          <Button
            size={'customBlank'}
            variant={'outline'}
            className="p-1.5"
            onClick={() => setIsPriceOpen(true)}
          >
            By Price
          </Button>
        </div>
        <div className="flex items-center gap-2 pl-2">
          <Button
            size={'customBlank'}
            variant={'outline'}
            className="p-1.5"
            onClick={() => setIsOrderOpen(true)}
          >
            <ArrowDownUp className="w-5 h-5" />
          </Button>
          <Button
            size={'customBlank'}
            variant={'outline'}
            className="p-1.5"
            onClick={cleanAllFilter}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>
      {/* BY LOCATION --START */}
      <Sheet open={isLocationOpen} onOpenChange={setIsLocationOpen}>
        <SheetContent side={'bottom'} className="h-[75vh] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Filter by location</SheetTitle>
          </SheetHeader>
          <div className="w-full flex justify-end">
            <Button
              onClick={clearLoactionFilter}
              variant={'outline'}
              size={'customBlank'}
              className="p-1"
            >
              Clear
            </Button>
          </div>
          {provinceArray.length !== 0 && (
            <div className="w-full mt-3 flex flex-col gap-3">
              <Label
                className="w-full text-left font-bold"
                htmlFor="province-dropdown"
              >
                Select a Province
              </Label>
              <Select
                onValueChange={(value) => getDistrict(value)}
                defaultValue={
                  chosenProvince !== undefined
                    ? chosenProvince.toString()
                    : undefined
                }
              >
                <SelectTrigger id="province-dropdown">
                  <SelectValue placeholder="Select a province" />
                </SelectTrigger>
                <SelectContent className="max-h-[15rem]">
                  <SelectGroup>
                    <SelectLabel>Provinces</SelectLabel>
                    {provinceArray.map((province, index) => (
                      <SelectItem key={index} value={province.value.toString()}>
                        {province.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
          {!isDistrictLoading &&
            chosenProvince !== undefined &&
            districtArray.length !== 0 && (
              <div className="w-full mt-3 flex flex-col gap-3">
                <Label className="w-full text-left font-bold">
                  Select district <span className="text-primary">{' *'}</span>
                </Label>
                <div className="w-full flex flex-col h-56 overflow-y-auto border-[1px] border-gray-300 p-2 divide-y-[1px]">
                  {districtArray.map((district, index) => (
                    <div key={index} className="flex items-center gap-2 py-2">
                      <Checkbox
                        checked={chosenDistrict.includes(
                          district.value.toString(),
                        )}
                        id={district.label}
                        onCheckedChange={(checked: boolean) =>
                          handleDistrictChange(
                            checked,
                            district.value.toString(),
                          )
                        }
                      />
                      <Label htmlFor={district.label}>{district.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </SheetContent>
      </Sheet>
      {/* BY LOCATION --END */}
      {/* BY CATEGORY --START */}
      <Sheet open={isCategoryOpen} onOpenChange={setIsCategoryOpen}>
        <SheetContent side={'bottom'} className="h-[75vh] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Filter by category</SheetTitle>
          </SheetHeader>
          <div className="w-full flex justify-end">
            <Button
              variant={'outline'}
              size={'customBlank'}
              className="p-1"
              onClick={clearCategoryFilter}
            >
              Clear
            </Button>
          </div>
          {category1Array.length !== 0 && (
            <div className="w-full mt-3 flex flex-col gap-3">
              <Label
                className="w-full text-left font-bold"
                htmlFor="category-1-dropdown"
              >
                Select Category 1
              </Label>
              <Select
                defaultValue={chosenCategory1}
                onValueChange={(value) => handleCategory1Change(value)}
              >
                <SelectTrigger id="category-1-dropdown">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="max-h-[15rem]">
                  <SelectGroup>
                    <SelectLabel>Category 1</SelectLabel>
                    {category1Array.map((category) => (
                      <SelectItem
                        key={category.label}
                        value={category.value.toString()}
                      >
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
          {!isCategory2Loading &&
            chosenCategory1 !== undefined &&
            category2Array.length !== 0 && (
              <div className="w-full mt-3 flex flex-col gap-3">
                <Label
                  className="w-full text-left font-bold"
                  htmlFor="category-2-dropdown"
                >
                  Select Category 2 <span className="text-primary">{' *'}</span>
                </Label>
                <Select
                  defaultValue={chosenCategory2}
                  onValueChange={(value) => handleChoseCategory2(value)}
                >
                  <SelectTrigger id="category-2-dropdown">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[15rem]">
                    <SelectGroup>
                      <SelectLabel>Category 2</SelectLabel>
                      {category2Array.map((category) => (
                        <SelectItem
                          key={category.label}
                          value={category.value.toString()}
                        >
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
        </SheetContent>
      </Sheet>
      {/* BY CATEGORY --END */}
      {/* BY PRICE --START */}
      <Sheet open={isPriceOpen} onOpenChange={setIsPriceOpen}>
        <SheetContent side={'bottom'} className="h-[75vh] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Filter by price</SheetTitle>
          </SheetHeader>
          <div className="w-full flex justify-end">
            <Button
              variant={'outline'}
              size={'customBlank'}
              className="p-1"
              onClick={clearPriceFilter}
            >
              Clear
            </Button>
          </div>
          <div className="w-full mt-3 flex flex-col gap-3">
            <Label
              className="w-full text-left font-bold"
              htmlFor="min-price-input"
            >
              Min-Price
            </Label>
            <Input
              min={0}
              id="min-price-input"
              type="number"
              value={minPrice}
              onChange={(e) => handleNumInput(e, setMinPrice)}
              className={styles.hideIndicator}
              onKeyDown={(e) => handleNumKeyDown(e)}
              onWheel={(e) => e.currentTarget.blur()}
            />
          </div>
          <div className="w-full mt-3 flex flex-col gap-3">
            <Label
              className="w-full text-left font-bold"
              htmlFor="max-price-input"
            >
              Max-Price
            </Label>
            <Input
              min={0}
              id="max-price-input"
              type="number"
              value={maxPrice}
              onChange={(e) => handleNumInput(e, setMaxPrice)}
              className={styles.hideIndicator}
              onKeyDown={(e) => handleNumKeyDown(e)}
              onWheel={(e) => e.currentTarget.blur()}
            />
          </div>
          <div className="w-full mt-10 ">
            <Button
              variant={'default'}
              className="w-full"
              onClick={applyPriceFilter}
            >
              Apply
            </Button>
          </div>
        </SheetContent>
      </Sheet>
      {/* BY PRICE --END */}
      {/* ORDER --START */}
      <Sheet open={isOrderOpen} onOpenChange={setIsOrderOpen}>
        <SheetContent side={'bottom'} className="h-[75vh]">
          <SheetHeader>
            <SheetTitle>Sort by</SheetTitle>
          </SheetHeader>
          <RadioGroup
            className="w-full divide-y-[1px] divide-gray-300"
            defaultValue={chosenOrder}
            onValueChange={(value: SortOptions) => handleOrderChange(value)}
          >
            {sortOptions.map((option) => (
              <div
                className="flex items-center space-x-5 py-3 pt-6"
                key={option}
              >
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option} className="text-base">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </SheetContent>
      </Sheet>
      {/* ORDER --START */}
    </>
  );
};

export default SearchFilter;
