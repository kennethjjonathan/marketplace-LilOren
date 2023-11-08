import React, { ReactElement, useState, ChangeEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { ToastContainer, ToastContent } from 'react-toastify';
import { Utils } from '@/utils';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import BackButton from '@/components/BackButton/BackButton';
import UserSettingsLayout from '@/components/UserSettingsLayout/UserSettingsLayout';
import { InputWithLabel } from '@/components/InputWithLabel/InputWithLabel';
import DotsLoading from '@/components/DotsLoading/DotsLoading';
import SkeletonSelect from '@/components/SkeletonSelect/SkeletonSelect';
import TextAreaWithLabel from '@/components/TextAreaWithLabel/TextAreaWithLabel';
import AsyncButton from '@/components/AsyncButton/AsyncButton';
import CONSTANTS from '@/constants/constants';
import { UserAddressClient } from '@/service/userAddress/userAddressClient';
import styles from './UserAddressCreate.module.scss';

const RECEIVER_NAME = 'Receiver Name';
const PHONE_NUMBER = 'Phone Number';
const PROVINCE_NAME = 'Province';
const CITY_NAME = 'City';
const SUB_DISTRICT_NAME = 'Sub District';
const SUB_FROM_SUB_DISTRICT_NAME = 'Sub from Sub District';
const ADDRESS_DETAILS = 'Address Details';
const PATH_USER_SETTINGS_ADDRESS = '/user/settings/address';

export interface IAddAddressData {
  receiver_name: string;
  receiver_phone_number: string;
  province_id: string;
  city_id: string;
  sub_district: string;
  sub_sub_district: string;
  postal_code: string;
  address: string;
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
  const [provinces, setProvinces] = useState<IROProvince[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);
  const [loadingFetchProvince, setLoadingFetchProvince] =
    useState<boolean>(false);
  const [loadingFetchCity, setLoadingFetchCity] = useState<boolean>(false);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const router = useRouter();

  const [addAddressData, setAddAddressData] = useState<IAddAddressData>({
    receiver_name: '',
    receiver_phone_number: '',
    province_id: '',
    city_id: '',
    sub_district: '',
    sub_sub_district: '',
    postal_code: '',
    address: '',
  });

  const [isDataValid, setIsDataValid] = useState({
    receiver_name: true,
    receiver_phone_number: true,
    province_id: true,
    city_id: true,
    sub_district: true,
    sub_sub_district: true,
    postal_code: true,
    address: true,
  });

  const fetchProvince = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: CONSTANTS.RO_API_PROVINCE,
      });

      const provinces: IROProvince[] = response.data.data.rajaongkir.results;
      setProvinces(provinces);
      setLoadingFetchProvince(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Utils.notify(error.message, 'error', 'light');
        setLoadingFetchProvince(false);
      }
    }
  };

  const handleChangeProvince = async (e: string) => {
    setLoadingFetchCity(true);
    setAddAddressData({ ...addAddressData, ['province_id']: e });
    const response = await axios({
      method: 'GET',
      url: `${CONSTANTS.RO_API_CITY}/${e}`,
    });
    const cities = response.data.data.rajaongkir.results;
    setCities(cities);
    setLoadingFetchCity(false);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string,
  ) => {
    setAddAddressData({ ...addAddressData, [key]: e.target.value });
  };

  const handleChangeCity = (e: string) => {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingSubmit(true);
    const responseSubmit = await UserAddressClient.create(addAddressData);
    const error = responseSubmit?.error!;
    const message = responseSubmit?.message!;

    if (error) {
      Utils.notify(message as ToastContent, 'error', 'light');
    } else {
      Utils.notify(message as ToastContent, 'success', 'light');
    }
    router.push(PATH_USER_SETTINGS_ADDRESS);
    setLoadingSubmit(false);
  };

  useEffect(() => {
    setLoadingFetchProvince(true);
    fetchProvince();
  }, []);

  return (
    <div className="h-[90vh]">
      <ToastContainer />
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
              value={addAddressData.receiver_name}
              minLength={1}
              maxLength={50}
              onChange={(e) => handleChange(e, 'receiver_name')}
              isValid={isDataValid.receiver_name}
              onBlur={() => validateData('receiver_name', /^[a-zA-Z\s]+$/)}
              validation="Must not be a blank"
              required
            />
            <InputWithLabel
              type="tel"
              label={PHONE_NUMBER}
              id="phone-number"
              labelStyling="font-light"
              value={addAddressData.receiver_phone_number}
              minLength={9}
              maxLength={15}
              onChange={(e) => handleChange(e, 'receiver_phone_number')}
              isValid={isDataValid.receiver_phone_number}
              onKeyDown={(e) => handleNumber(e)}
              onBlur={() =>
                validateData('receiver_phone_number', /^\+?\d{9,15}$/)
              }
              validation="Min 9 numbers"
              required
            />
          </div>
          <div className="divider bg-accent h-2"></div>
          <div className="mb-6 mt-6 px-[14px] flex flex-col gap-4">
            {/* Province */}
            <Label className="font-light w-full md:text-base">
              {PROVINCE_NAME}
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
                    {CITY_NAME}
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
            {addAddressData.city_id !== '' && (
              <>
                <InputWithLabel
                  type="text"
                  label={SUB_DISTRICT_NAME}
                  id="sub-district"
                  labelStyling="font-light"
                  value={addAddressData.sub_district}
                  minLength={1}
                  maxLength={50}
                  onChange={(e) => handleChange(e, 'sub_district')}
                  isValid={isDataValid.sub_district}
                  onBlur={() => validateData('sub_district', /^[a-zA-Z\s]+$/)}
                  validation="Must not be a blank"
                  required
                />
                <InputWithLabel
                  type="text"
                  label={SUB_FROM_SUB_DISTRICT_NAME}
                  id="sub-from-sub-district"
                  labelStyling="font-light"
                  value={addAddressData.sub_sub_district}
                  minLength={1}
                  maxLength={50}
                  onChange={(e) => handleChange(e, 'sub_sub_district')}
                  isValid={isDataValid.sub_sub_district}
                  onBlur={() =>
                    validateData('sub_sub_district', /^[a-zA-Z\s]+$/)
                  }
                  validation="Must not be a blank"
                  required
                />
                <InputWithLabel
                  type="number"
                  label="Zip Code"
                  id="zip-code"
                  labelStyling="font-light"
                  value={addAddressData.postal_code}
                  minLength={5}
                  maxLength={10}
                  onChange={(e) => handleChange(e, 'postal_code')}
                  onKeyDown={(e) => handleNumber(e)}
                  isValid={isDataValid.postal_code}
                  onBlur={() => validateData('postal_code', /^\+?\d{5,15}$/)}
                  validation="Please enter a valid zip code"
                  required
                />
                <TextAreaWithLabel
                  id={'full-address'}
                  label={'Full Address'}
                  labelStyling="font-light"
                  value={addAddressData.address}
                  minLength={1}
                  maxLength={500}
                  onChange={(e) => handleChange(e, 'address')}
                  isValid={isDataValid.address}
                  onBlur={() => validateData('address', /^[#.0-9a-zA-Z\s,-]+$/)}
                  validation="Must not be a blank"
                  required
                />
              </>
            )}
          </div>
          {loadingSubmit ? (
            <div className={styles.button_wrapper}>
              <AsyncButton className="w-full" isLoading={true}>
                {'Submit'}
              </AsyncButton>
            </div>
          ) : (
            <div className={styles.button_wrapper}>
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
          )}
        </form>
      )}
    </div>
  );
};

const UserAddressCreateHeading = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Jual Beli Online Aman dan Nyaman | LilOren</title>
        <meta
          data-rh="true"
          name="viewport"
          content="initial-scale=1, minimum-scale=1, maximum-scale=5, user-scalable=no, width=device-width"
        />
        <meta data-rh="true" property="site_name" content="LilOren" />
        <meta
          data-rh="true"
          property="title"
          content="Jual Beli Online Aman dan Nyaman | LilOren"
        />
        <meta
          data-rh="true"
          name="description"
          content="Mal online terbesar Indonesia, tempat berkumpulnya toko / online shop terpercaya se Indonesia. Jual beli online semakin aman dan nyaman di LilOren."
        ></meta>
      </Head>
      <div className="lg:hidden UserSettingsAddressCreate__navbar w-[100%] min-w-auto flex items-center top-0 h-[52px] border-b-[1px] sticky bg-white">
        <BackButton
          icon={<ArrowLeft size={24} />}
          onClick={() => router.back()}
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
    <UserSettingsLayout
      component={<UserAddressCreateHeading />}
      currentTab={'My Bio'}
    >
      {page}
    </UserSettingsLayout>
  );
};

export default UserAddressCreate;
