import React, { ReactNode } from 'react';

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
      {component}
      <main>{children}</main>
    </div>
  );
};

export default UserSettingsLayout;
