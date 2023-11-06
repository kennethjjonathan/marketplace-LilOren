import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ArrowLeft } from 'lucide-react';
import BackButton from '@/components/BackButton/BackButton';
import UserSettingsLayout from '@/components/UserSettingsLayout/UserSettingsLayout';
import { InputWithLabel } from '@/components/InputWithLabel/InputWithLabel';
import { Label } from '@/components/ui/label';
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
import Modal from '@/components/Modal/Modal';
import styles from './SellerOnboardingForm.module.scss';
import { SellerMerchantClient } from '@/service/SellerMerchant/SellerMerchantClient';
import { Utils } from '@/utils';
import { ToastContainer, ToastContent } from 'react-toastify';
import AsyncButton from '@/components/AsyncButton/AsyncButton';
import DotsLoading from '@/components/DotsLoading/DotsLoading';

export interface IShopInfoFormData {
  shop_name: string;
  address_id: string;
}

interface IUserAddress {
  id: number;
  receiver_name: string;
  address: string;
  postal_code: string;
}

const SHOP_NAME = 'Shop Name';
const SHOP_ADDRESS = 'Shop Address';

const SellerOnboardingForm = () => {
  const [userAddresses, setUserAddresses] = useState<IUserAddress[]>([
    {
      id: 2,
      receiver_name: 'Aditya Tresnobudi',
      address:
        'Jl. Raflesia II No. 16/ Taman Yasmin, Cilendek Timur, Bogor Barat ',
      postal_code: '16112',
    },
    {
      id: 1,
      receiver_name: 'Aditya Tresnobudi',
      address:
        'Jl. Raflesia II No. 16/ Taman Yasmin, Cilendek Timur, Bogor Barat',
      postal_code: '80351',
    },
    {
      id: 4,
      receiver_name: 'Aditya Tresnobudi',
      address: 'Jl. Dago Asri Blok C No. 17A, Cilendek Timur, Bogor Barat',
      postal_code: '40135',
    },
  ]);
  const [selectedAddress, setSelectedAddress] = useState<IUserAddress>(
    userAddresses[0],
  );

  const [shopInfoFormData, setShopInfoFormData] = useState<IShopInfoFormData>({
    shop_name: '',
    address_id: userAddresses[0].id.toString(),
  });

  const [isDataValid, setIsDataValid] = useState({
    shop_name: true,
    address_id: true,
  });

  const [showEditAddress, setShowEditAddress] = useState<boolean>(false);
  const [loadingPost, setLoadingPost] = useState<boolean>(false);
  const [loadingFetchUserDetails, setLoadingFetchUserDetails] =
    useState<boolean>(false);

  const fetchUserDetails = () => {
    setTimeout(() => {
      setLoadingFetchUserDetails(false);
    }, 2000);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    setShopInfoFormData({ ...shopInfoFormData, [key]: e.target.value });
  };

  const handleChangeAddress = (e: string) => {
    setShopInfoFormData({ ...shopInfoFormData, ['address_id']: e });
  };

  const validateData = (
    key: keyof typeof shopInfoFormData,
    pattern: RegExp,
  ): boolean => {
    const dataRegex = pattern;
    if (!dataRegex.test(shopInfoFormData[key])) {
      setIsDataValid({ ...isDataValid, [key]: false });
      return false;
    }
    setIsDataValid({ ...isDataValid, [key]: true });
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingPost(true);
    const responseSubmit = await SellerMerchantClient.create(shopInfoFormData);
    const error = responseSubmit?.error;
    const message = responseSubmit?.message;

    if (error) {
      Utils.notify(message as ToastContent, 'error', 'light');
    } else {
      Utils.notify(message as ToastContent, 'success', 'light');
    }
    setLoadingPost(false);
  };

  const setAddress = (address_id: string) => {
    const address = userAddresses.filter(
      (val) => val.id === parseInt(address_id),
    );
    setSelectedAddress(address[0]);
    setShowEditAddress(false);
  };

  useEffect(() => {
    setLoadingFetchUserDetails(true);
    fetchUserDetails();
  }, []);

  return (
    <div className="h-[90vh]">
      <ToastContainer />
      {loadingFetchUserDetails ? (
        <DotsLoading />
      ) : (
        <form className="bg-white pb-[100px]" onSubmit={handleSubmit}>
          <div className="mb-6 mt-6 px-[14px] flex flex-col gap-4">
            <InputWithLabel
              type="text"
              label={SHOP_NAME}
              id="shop-name"
              labelStyling="font-light"
              value={shopInfoFormData.shop_name}
              minLength={5}
              maxLength={30}
              onChange={(e) => handleChange(e, 'shop_name')}
              isValid={isDataValid.shop_name}
              onBlur={() => validateData('shop_name', /^.{5,35}$/)}
              validation="Please enter 5 - 30 characters"
              required
            />
          </div>
          <div className="divider bg-accent h-2"></div>
          <div className="mb-6 mt-6 px-[14px] flex flex-col gap-4">
            <Label className="font-light w-full md:text-base">
              {SHOP_ADDRESS}
              <span className="text-primary">{' *'}</span>
            </Label>
            <div className="detail address text-[14px]">
              <div className="">
                <p className="font-bold ">{selectedAddress.receiver_name}</p>
                <p>{selectedAddress.address}</p>
                <p>{selectedAddress.postal_code}</p>
              </div>
              <Button
                className="pl-0"
                variant={'link'}
                onClick={() => setShowEditAddress(true)}
              >
                {'Edit'}
              </Button>
            </div>
          </div>
          {loadingPost ? (
            <div className={styles.button_wrapper}>
              <AsyncButton className="w-full" isLoading={true}>
                {'Submit'}
              </AsyncButton>
            </div>
          ) : (
            <div className={styles.button_wrapper}>
              <Button
                disabled={
                  !Object.values(shopInfoFormData).every((val) => val !== '')
                }
                className="w-full"
                type="submit"
                variant={'default'}
              >
                {'Register Shop'}
              </Button>
            </div>
          )}
          <Modal
            title={'Edit Address'}
            isVisible={showEditAddress}
            onClose={() => setShowEditAddress(false)}
          >
            <div className="Edit Address bg-white w-full rounded-t-2xl pt-6 h-[50vh] px-4 flex flex-col gap-4 justify-between">
              {/* Address */}
              <div className="">
                <p className="Edit Address Title mb-4">{'Edit Address'}</p>
                <Label className="font-light w-full md:text-base">
                  {SHOP_ADDRESS}
                </Label>
                <Select onValueChange={(e) => handleChangeAddress(e)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Address" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className="h-fit w-[90vw] overflow-y-scroll">
                      <SelectLabel>{'Address'}</SelectLabel>
                      {userAddresses.map((address) => (
                        <SelectItem
                          className="text-left"
                          key={`key:${address.address}`}
                          value={String(address.id)}
                        >
                          {address.address}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="h-[60px] bg-white w-full pr-8 flex justify-center items-center text-ellipsis whitespace-nowrap overflow-hidden fixed bottom-0">
                <Button
                  disabled={shopInfoFormData.address_id === ''}
                  onClick={() => setAddress(shopInfoFormData.address_id)}
                  className={'bottom-0 w-full'}
                >
                  {'Save'}
                </Button>
              </div>
            </div>
          </Modal>
        </form>
      )}
    </div>
  );
};

const SET_SHOP_INFORMATION = 'Set Shop Information';

const SellerOnboardingFormHeading = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>LilOren Seller Center</title>
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
      <div className="lg:hidden SellerOnboardingForm__navbar w-[100%] min-w-auto flex justify-start items-center top-0 h-[52px] border-b-[1px] sticky bg-white">
        <BackButton
          icon={<ArrowLeft size={24} className="text-primary" />}
          onClick={() => router.back()}
        />
        <div>
          <p className="user__address__heading block relative font-medium m-0 text-[16px]">
            {SET_SHOP_INFORMATION}
          </p>
        </div>
      </div>
    </>
  );
};

SellerOnboardingForm.getLayout = function getLayout(page: ReactElement) {
  return (
    <UserSettingsLayout component={<SellerOnboardingFormHeading />}>
      {page}
    </UserSettingsLayout>
  );
};

export default SellerOnboardingForm;
