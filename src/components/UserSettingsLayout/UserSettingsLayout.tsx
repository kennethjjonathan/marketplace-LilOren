import React, { ReactNode } from 'react';
import Navigation from '../Navigation/Navigation';
import UserPresentation from '../UserPresentation/UserPresentation';
import Tabs from '../Tabs/Tabs';

interface UserSettingsLayoutProps {
  children: ReactNode;
  component: ReactNode;
  currentTab: string;
}

const data = [
  {
    id: 1,
    label: 'Info',
    status: 'Info',
    href: '/user?status=Info',
  },
  {
    id: 2,
    label: 'My Address',
    status: 'Address',
    href: '/user/address?status=Address',
  },
  {
    id: 3,
    label: 'My Whislist',
    status: 'Wishlist',
    href: '/user/wishlist?status=Wishlist',
  },
];

const UserSettingsLayout = ({
  children,
  component,
  currentTab,
}: UserSettingsLayoutProps) => {
  return (
    <div className={currentTab}>
      <div className="hidden lg:block">
        <Navigation />
      </div>
      <div className="flex justify-center items-center">
        <div className="hidden lg:block lg:w-[75vw]">
          <UserPresentation />
          <Tabs datas={data} />
        </div>
      </div>
      {component}
      <div className="flex justify-center items-center flex-col">
        <main className="lg:w-[75vw] w-full">{children}</main>
      </div>
    </div>
  );
};

export default UserSettingsLayout;
