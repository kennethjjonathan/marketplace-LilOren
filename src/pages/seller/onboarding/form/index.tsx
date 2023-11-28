import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ArrowLeft } from 'lucide-react';
import { ToastContent } from 'react-toastify';
import { Utils } from '@/utils';
import { withBasePath } from '@/lib/nextUtils';
import { IUserAddress } from '@/interface/user';
import { SellerMerchantClient } from '@/service/SellerMerchant/SellerMerchantClient';
import BackButton from '@/components/BackButton/BackButton';
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
import AsyncButton from '@/components/AsyncButton/AsyncButton';
import DotsLoading from '@/components/DotsLoading/DotsLoading';
import SellerOnboardingLayout from '@/components/SellerOnboardingLayout/SellerOnboardingLayout';
import { useUser } from '@/store/user/useUser';
import styles from './SellerOnboardingForm.module.scss';

export interface IShopInfoFormData {
  shop_name: string;
  address_id: string;
}
const SHOP_NAME = 'Shop Name';
const SHOP_ADDRESS = 'Shop Address';

const SellerOnboardingForm = () => {
  const router = useRouter();
  const user_addresses = useUser.use.user_addresses();
  const fetchUserAddresses = useUser.use.fetchUserAddresses();
  const user_default_address = useUser.use.user_default_address();
  const [selectedAddress, setSelectedAddress] =
    useState<IUserAddress>(user_default_address);

  const [shopInfoFormData, setShopInfoFormData] = useState<IShopInfoFormData>({
    shop_name: '',
    address_id:
      user_addresses.length !== 0 ? user_addresses[0].id.toString() : '0',
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
    }, 500);
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
    if (!showEditAddress) {
      setLoadingPost(true);
      const responseSubmit =
        await SellerMerchantClient.create(shopInfoFormData);
      const error = responseSubmit?.error;
      const message = responseSubmit?.message;
      if (error) {
        Utils.notify(message as ToastContent, 'error', 'light');
      } else {
        Utils.notify(message as ToastContent, 'success', 'light');
      }
      setLoadingPost(false);
    }
    router.push('/seller/portal');
  };

  const setAddress = (address_id: string) => {
    const address = user_addresses.filter(
      (val) => val.id === parseInt(address_id),
    );
    setSelectedAddress(address[0]);
    setShowEditAddress(false);
  };

  useEffect(() => {
    setLoadingFetchUserDetails(true);
    fetchUserDetails();
    fetchUserAddresses();
  }, []);

  return (
    <div className="h-[90vh] lg:flex lg:justify-center lg:w-full lg:bg-primary-foreground">
      {loadingFetchUserDetails ? (
        <DotsLoading />
      ) : user_addresses.length === 0 ? (
        <div className="px-[14px] pb-3 flex  h-full justify-center items-center">
          <div className="flex flex-col w-full h-[200px] bg-white justify-center items-center p-5 rounded-lg">
            <p className="">{'Please Register Your Shop Address'}</p>
            <Button
              className="w-[200px] mt-3"
              onClick={() => router.push('/user/address?status=Address')}
            >
              {'Add new address'}
            </Button>
          </div>
        </div>
      ) : (
        <form
          className="bg-white pb-[100px] lg:pb-2 lg:w-[30vw] flex flex-col justify-center lg:border-[1px] rounded-xl lg:h-fit lg:mt-[100px]"
          onSubmit={handleSubmit}
        >
          <div className="mb-6 mt-6 px-[14px] flex flex-col gap-4">
            <InputWithLabel
              type="text"
              label={SHOP_NAME}
              id="shop-name"
              labelStyling="font-light"
              value={shopInfoFormData.shop_name}
              minLength={3}
              maxLength={30}
              onChange={(e) => handleChange(e, 'shop_name')}
              isValid={isDataValid.shop_name}
              onBlur={() =>
                validateData('shop_name', /^(?!\s*$)[-a-zA-Z0-9_:,.\s]{3,30}$/)
              }
              validation="Please enter 3 - 30 characters"
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
            <>
              <div
                className={
                  'hidden w-full lg:flex justify-end items-center pr-3'
                }
              >
                <Button
                  disabled={
                    !Object.values(shopInfoFormData).every((val) => val !== '')
                  }
                  className="w-[150px]"
                  type="submit"
                  variant={'default'}
                >
                  {'Register Shop'}
                </Button>
              </div>
              <div className={styles.button_wrapper}>
                <Button
                  disabled={
                    !Object.values(shopInfoFormData).every(
                      (val) => val !== '',
                    ) || Object.values(isDataValid).find((val) => val === false)
                  }
                  className="w-full"
                  type="submit"
                  variant={'default'}
                >
                  {'Register Shop'}
                </Button>
              </div>
            </>
          )}
        </form>
      )}
      <Modal
        title={'Edit Address'}
        isVisible={showEditAddress}
        onClose={() => setShowEditAddress(false)}
        position="center"
      >
        <div className="Edit Address bg-white lg:w-[50vw] w-full rounded-xl pt-6 lg:h-[30vh] h-[50vh] px-4 flex flex-col gap-4 justify-between">
          {/* Address */}
          <div className="">
            <p className="Edit Address Title mb-4">{'Edit Address'}</p>
            <Label className="font-light md:text-base">{SHOP_ADDRESS}</Label>
            <Select onValueChange={(e) => handleChangeAddress(e)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Address" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="h-fit overflow-y-scroll">
                  <SelectLabel>{'Address'}</SelectLabel>
                  {user_addresses.map((address) => (
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
          <div className="hidden lg:flex flex-row w-full justify-end items-center pb-5">
            <Button
              disabled={shopInfoFormData.address_id === ''}
              onClick={() => setAddress(shopInfoFormData.address_id)}
              className={'bottom-0 w-[200px]'}
            >
              {'Save'}
            </Button>
          </div>
          <div className="h-[60px] bg-white w-full pr-8 flex justify-center items-center text-ellipsis whitespace-nowrap overflow-hidden fixed bottom-0 lg:hidden">
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
        <link rel="icon" href={withBasePath('favicon.ico')} />
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
    <SellerOnboardingLayout component={<SellerOnboardingFormHeading />}>
      {page}
    </SellerOnboardingLayout>
  );
};

export default SellerOnboardingForm;
