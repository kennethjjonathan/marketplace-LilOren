import React, { useEffect, useState } from 'react';
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
import { IDistrict, IProvince, SortOptions } from '@/interface/searchFilter';
import { Checkbox } from '@/components/ui/checkbox';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

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
    const newProvince = [...provinceArray];
    setProvinceArray(newProvince);
    const params = new URLSearchParams(searchParams);
    params.delete('province_id');
    params.delete('district_id');
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
    params.set('province_id', chosenProvince!.toString());
    params.set('district_id', newChosenDistrict.toString());
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
    router.replace(`${pathname}?${params.toString()}`);
  }

  // ORDER --END

  function setInitialState() {
    const province_id: string | null = searchParams.get('province_id');
    const district_id: string | null = searchParams.get('district_id');
    const sort_by: string | null = searchParams.get('sort_by');
    const sort_desc: string | null = searchParams.get('sort_desc');
    if (typeof province_id === 'string') {
      getDistrict(province_id);
    }
    if (typeof district_id === 'string') {
      setChosenDistrict(district_id.split(','));
    }
    if (typeof sort_by === 'string' && typeof sort_desc === 'string') {
      sortSetter(sort_by, sort_desc);
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

  useEffect(() => {
    setInitialState();
  }, [searchParams]);

  useEffect(() => {
    getProvinces();
  }, []);
  return (
    <>
      <div className="w-full max-w-full py-3 flex items-center">
        <div className="w-full overflow-x-auto flex items-center flex-1">
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
            onClick={() => setIsLocationOpen(true)}
          >
            By Location
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
          <Button size={'customBlank'} variant={'outline'} className="p-1.5">
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
                <SelectContent className="h-60">
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
                  Select district
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
