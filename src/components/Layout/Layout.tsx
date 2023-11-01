import React, { ReactNode } from 'react';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
