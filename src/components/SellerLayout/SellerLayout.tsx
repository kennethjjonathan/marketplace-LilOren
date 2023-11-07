import React, { PropsWithChildren, useState } from 'react';
import { Store } from 'lucide-react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import styles from './SellerLayout.module.scss';

const SellerLayout = (props: PropsWithChildren) => {
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
        {props.children}
      </div>
    </div>
  );
};

export default SellerLayout;
