import React, { ReactElement, useState, ChangeEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import BackButton from '@/components/BackButton/BackButton';
import Navigation from '@/components/Navigation/Navigation';
import UserSettingsLayout from '@/components/UserSettingsLayout/UserSettingsLayout';
import { InputWithLabel } from '@/components/InputWithLabel/InputWithLabel';
import { Label } from '@/components/ui/label';
import DotsLoading from '@/components/DotsLoading/DotsLoading';
import SkeletonSelect from '@/components/SkeletonSelect/SkeletonSelect';
import { Button } from '@/components/ui/button';

const RECEIVER_NAME = 'Receiver Name';
const PHONE_NUMBER = 'Receiver Name';
const ADDRESS_LABEL = 'Receiver Name';
const PROVINCE_NAME = 'Receiver Name';
const CITY_NAME = 'Receiver Name';
const DISTRICT_NAME = 'Receiver Name';

interface IAddAddressData {
  receiverName: string;
  phoneNumber: number;
  addressLabel: string;
  province_id: string;
  city_id: string;
  districName: string;
}

export interface IROProvince {
  province_id: number;
  province: string;
}

export interface ICity {
  city_id: string;
  province_id: string;
  province: string;
  type: string;
  city_name: string;
  postal_code: string;
}

const UserAddressCreate = () => {
  const [provinceId, setProvinceId] = useState<string>('');
  const [cityId, setCityId] = useState<string>('');
  const [provinces, setProvinces] = useState<IROProvince[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);
  const [loadingFetchProvince, setLoadingFetchProvince] =
    useState<boolean>(false);
  const [loadingFetchCity, setLoadingFetchCity] = useState<boolean>(false);

  const [addAddressData, setAddAddressData] = useState({
    receiverName: '',
    phoneNumber: '',
    addressLabel: '',
    province_id: '',
    city_id: '',
    subDistrict: '',
    subSubDistrict: '',
    zipCode: '',
    fullAddress: '',
  });

  const [isDataValid, setIsDataValid] = useState({
    receiverName: true,
    phoneNumber: true,
    addressLabel: true,
    province_id: true,
    city_id: true,
    subDistrict: true,
    subSubDistrict: true,
    zipCode: true,
    fullAddress: true,
  });

  const fetchProvince = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `/api/rajaongkirprovince`,
      });

      const provinces: IROProvince[] = response.data.data.rajaongkir.results;
      setProvinces(provinces);
      setLoadingFetchProvince(false);
    } catch (error) {
      // toastify
    }
  };

  const handleChangeProvince = async (e: string) => {
    setLoadingFetchCity(true);
    setProvinceId(e);
    const response = await axios({
      method: 'GET',
      url: `/api/rajaongkir/${e}`,
    });
    const cities: ICity[] = response.data.data.rajaongkir.results;
    setCities(cities);
    setAddAddressData({ ...addAddressData, ['province_id']: e });
    setLoadingFetchCity(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    setAddAddressData({ ...addAddressData, [key]: e.target.value });
  };

  const handleChangeCity = (e: string) => {
    setCityId(e);
    setAddAddressData({ ...addAddressData, ['city_id']: e });
  };

  const handleNumber = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key < '0' || e.key > '9') {
      if (e.key !== 'Backspace') {
        e.preventDefault();
      }
    }
  };

  const validateData = (
    key: keyof typeof addAddressData,
    pattern: RegExp,
  ): boolean => {
    const dataRegex = pattern;
    if (!dataRegex.test(addAddressData[key])) {
      setIsDataValid({ ...isDataValid, [key]: false });
      return false;
    }
    setIsDataValid({ ...isDataValid, [key]: true });
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.target);
  };

  useEffect(() => {
    setLoadingFetchProvince(true);
    fetchProvince();
  }, []);

  return (
    <div className="h-[100vh]">
      {loadingFetchProvince ? (
        <DotsLoading />
      ) : (
        <form
          className="bg-white overflow-y-auto pb-[100px]"
          onSubmit={handleSubmit}
        >
          <div className="mb-6 mt-6 px-[14px] flex flex-col gap-4">
            <InputWithLabel
              type="text"
              label={RECEIVER_NAME}
              id="receiver-name"
              labelStyling="font-light"
              value={addAddressData.receiverName}
              minLength={1}
              maxLength={50}
              onChange={(e) => handleChange(e, 'receiverName')}
              isValid={isDataValid.receiverName}
              onBlur={() => validateData('receiverName', /^[a-zA-Z\s]+$/)}
              validation="Must not be a blank"
              required
            />
            <InputWithLabel
              type="tel"
              label="Phone Number"
              id="phone-number"
              labelStyling="font-light"
              value={addAddressData.phoneNumber}
              minLength={9}
              maxLength={15}
              onChange={(e) => handleChange(e, 'phoneNumber')}
              isValid={isDataValid.phoneNumber}
              onKeyDown={(e) => handleNumber(e)}
              onBlur={() => validateData('phoneNumber', /^\+?\d{9,15}$/)}
              validation="Min 9 numbers"
              required
            />
          </div>
          <div className="divider bg-accent h-2"></div>
          <div className="mb-6 mt-6 px-[14px] flex flex-col gap-4">
            <InputWithLabel
              type="text"
              label="Address Label"
              id="address-label"
              labelStyling="font-light"
              value={addAddressData.addressLabel}
              minLength={1}
              maxLength={30}
              onChange={(e) => handleChange(e, 'addressLabel')}
              isValid={isDataValid.addressLabel}
              onBlur={() => validateData('addressLabel', /^[a-zA-Z\s]+$/)}
              validation="Must not be a blank"
              required
            />
            {/* Province */}
            <Label className="font-light w-full md:text-base">
              {'Province'}
              <span className="text-primary">{' *'}</span>
            </Label>
            <Select required onValueChange={(e) => handleChangeProvince(e)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a province" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="h-[200px] overflow-y-scroll">
                  <SelectLabel>{'Province'}</SelectLabel>
                  {provinces.map((province) => (
                    <SelectItem
                      key={`key:${province.province}`}
                      value={String(province.province_id)}
                    >
                      {province.province}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {/* City */}
            {loadingFetchCity ? (
              <SkeletonSelect label="City" />
            ) : (
              cities.length !== 0 && (
                <>
                  <Label className="font-light w-full md:text-base">
                    {'City'}
                    <span className="text-primary">{' *'}</span>
                  </Label>
                  <Select required onValueChange={(e) => handleChangeCity(e)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup className="h-[200px] overflow-y-scroll">
                        <SelectLabel>{'City'}</SelectLabel>
                        {cities.map((city) => (
                          <SelectItem
                            key={`key:${city.city_id}`}
                            value={String(city.city_id)}
                          >
                            {city.city_name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </>
              )
            )}
            {cityId && (
              <>
                <InputWithLabel
                  type="text"
                  label="Sub District"
                  id="sub-district"
                  labelStyling="font-light"
                  value={addAddressData.subDistrict}
                  minLength={1}
                  maxLength={50}
                  onChange={(e) => handleChange(e, 'subDistrict')}
                  isValid={isDataValid.subDistrict}
                  onBlur={() => validateData('subDistrict', /^[a-zA-Z\s]+$/)}
                  validation="Must not be a blank"
                  required
                />
                <InputWithLabel
                  type="text"
                  label="Sub from Sub-District"
                  id="sub-from-sub-district"
                  labelStyling="font-light"
                  value={addAddressData.subSubDistrict}
                  minLength={1}
                  maxLength={50}
                  onChange={(e) => handleChange(e, 'subSubDistrict')}
                  isValid={isDataValid.subSubDistrict}
                  onBlur={() => validateData('subSubDistrict', /^[a-zA-Z\s]+$/)}
                  validation="Must not be a blank"
                  required
                />
                <InputWithLabel
                  type="number"
                  label="Zip Code"
                  id="zip-code"
                  labelStyling="font-light"
                  value={addAddressData.zipCode}
                  minLength={5}
                  maxLength={10}
                  onChange={(e) => handleChange(e, 'zipCode')}
                  onKeyDown={(e) => handleNumber(e)}
                  isValid={isDataValid.zipCode}
                  onBlur={() => validateData('zipCode', /^\+?\d{5,15}$/)}
                  validation="Please enter a valid zip code"
                  required
                />
              </>
            )}
          </div>
          <div className="h-[60px] bg-white w-full flex justify-center items-center text-ellipsis whitespace-nowrap overflow-hidden px-4 pt-4 pb-4 fixed shadow-[0_-1px_6px_0_rgba(141,150,170,0.4)] bottom-0">
            <Button
              disabled={
                !Object.values(addAddressData).every((val) => val !== '')
              }
              className="w-full"
              type="submit"
              variant={'default'}
            >
              {'Submit'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

const ADDRESS_DETAILS = 'Address Details';
const PATH_USER_SETTINGS_ADDRESS = '/user/settings/address';

const UserAddressCreateHeading = () => {
  const router = useRouter();

  return (
    <>
      <div className="hidden sm:block">
        <Navigation />
      </div>
      <div className="sm:hidden UserSettingsAddress__navbar w-[100%] min-w-auto flex items-center top-0 h-[52px] border-b-[1px] sticky bg-white">
        <BackButton
          icon={<ArrowLeft size={24} />}
          onClick={() => router.push(PATH_USER_SETTINGS_ADDRESS)}
        />
        <div>
          <p className="user__address__heading block relative font-medium m-0 text-[16px]">
            {ADDRESS_DETAILS}
          </p>
        </div>
      </div>
    </>
  );
};

UserAddressCreate.getLayout = function getLayout(page: ReactElement) {
  return (
    <UserSettingsLayout component={<UserAddressCreateHeading />}>
      {page}
    </UserSettingsLayout>
  );
};

export default UserAddressCreate;
