import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import Navigation from '../Navigation/Navigation';
import UserPresentation from '../UserPresentation/UserPresentation';
import styles from './UserSettingsLayout.module.scss';
import { useRouter } from 'next/router';
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
    href: '/user',
  },
  {
    id: 2,
    label: 'My Address',
    status: 'My Address',
    href: '/user/settings/address',
  },
];

const UserSettingsLayout = ({
  children,
  component,
  currentTab,
}: UserSettingsLayoutProps) => {
  const router = useRouter();
  const [currentTabItem, setCurrentTabItem] = useState(currentTab);
  return (
    <div>
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
