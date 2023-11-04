import React, { ReactElement } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/router';
import UserSettingsLayout from '@/components/UserSettingsLayout/UserSettingsLayout';
import BackButton from '@/components/BackButton/BackButton';
import Navigation from '@/components/Navigation/Navigation';

const UserSettingsAddress = () => {
  return <div>User Address</div>;
};

const PATH_USER = '/user';
const MY_ADDRESSES = 'My Addresses';
const ADD_ADDRESS = 'Add Address';
const PATH_USER_ADDRESS_CREATE = '/user/address/create';

const UserSettingsAddressHeading = () => {
  const router = useRouter();

  return (
    <>
      <div className="hidden sm:block">
        <Navigation />
      </div>
      <div className="sm:hidden UserSettingsAddress__navbar w-[100%] min-w-auto flex items-center top-0 h-[52px] border-b-[1px] sticky bg-white">
        <BackButton
          icon={<ArrowLeft size={24} />}
          onClick={() => router.push(PATH_USER)}
        />
        <div>
          <p className="user__address__heading block relative font-medium m-0 text-[16px]">
            {MY_ADDRESSES}
          </p>
        </div>
        <button
          className="px-4 min-w-[fit] ml-auto inline-block text-[16px] text-primary font-medium"
          onClick={() => router.push(PATH_USER_ADDRESS_CREATE)}
        >
          {ADD_ADDRESS}
        </button>
      </div>
    </>
  );
};

UserSettingsAddress.getLayout = function getLayout(page: ReactElement) {
  return (
    <UserSettingsLayout component={<UserSettingsAddressHeading />}>
      {page}
    </UserSettingsLayout>
  );
};

export default UserSettingsAddress;
