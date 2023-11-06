import React, { ReactNode } from 'react';
import Navigation from '../Navigation/Navigation';
import UserPresentation from '../UserPresentation/UserPresentation';
import styles from './UserSettingsLayout.module.scss';
import { useRouter } from 'next/router';

interface UserSettingsLayoutProps {
  children: ReactNode;
  component: ReactNode;
  currentTab: string;
}

const UserSettingsLayout = ({
  children,
  component,
  currentTab,
}: UserSettingsLayoutProps) => {
  const router = useRouter();
  return (
    <div>
      <div className="hidden lg:block">
        <Navigation />
      </div>
      <div className="flex justify-center items-center">
        <div className="hidden lg:block lg:w-[75vw]">
          <UserPresentation />
          <div className={`${styles.tab}`}>
            <div className={`${styles.tab_wrapper}`}>
              <div className={`${styles.tab_holder}`}>
                <button
                  className={`${styles.text}`}
                  onClick={() => router.push('/user')}
                >
                  <p
                    className={`${styles.heading} ${styles.p} ${
                      currentTab === 'My Biodata' && 'text-primary'
                    }`}
                  >
                    {'My Biodata'}
                  </p>
                </button>
                <button
                  className={`${styles.text}`}
                  onClick={() => router.push('/user/settings/address')}
                >
                  <p
                    className={`${styles.heading} ${styles.p} ${
                      currentTab === 'My Addresses' && 'text-primary'
                    }`}
                  >
                    {'Addresses'}
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {component}
      <main>{children}</main>
    </div>
  );
};

export default UserSettingsLayout;
