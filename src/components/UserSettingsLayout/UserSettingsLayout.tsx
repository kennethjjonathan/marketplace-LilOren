import React, { ReactNode } from 'react';
import Navigation from '../Navigation/Navigation';

interface UserSettingsLayoutProps {
  children: ReactNode;
  component: ReactNode;
}

const UserSettingsLayout = ({
  children,
  component,
}: UserSettingsLayoutProps) => {
  return (
    <div>
      <div className="hidden lg:block">
        <Navigation />
      </div>
      {component}
      <main>{children}</main>
    </div>
  );
};

export default UserSettingsLayout;
