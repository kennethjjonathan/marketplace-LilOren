import React, { ReactNode, useState } from 'react';
import { Store } from 'lucide-react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import styles from './SellerLayout.module.scss';

interface SellerLayoutProps {
  children: ReactNode;
  header: string;
}

const SellerLayout = ({ children, header }: SellerLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="grid min-h-screen grid-rows-header bg-zinc-100">
      <div className="bg-white shadow-sm z-10">
        <Navbar onMenuButtonClick={() => setSidebarOpen((prev) => !prev)} />
      </div>
      <div className="grid md:grid-cols-sidebar">
        <div className="shadow-md bg-zinc-50">
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        </div>
        <div className="flex flex-col pt-[10px] lg:pl-[24px] pb-[24px]">
          <div className={`${styles.shopname} text-muted-foreground`}>
            <Store className="mr-4 text-muted-foreground" />
            {header}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default SellerLayout;
