import React, { useState } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

interface IData {
  id: number;
  label: string;
  href?: string;
}

interface TabsProps {
  datas: IData[];
}
const Tabs = ({ datas }: TabsProps) => {
  const [currentTab, setCCurrentTab] = useState(1);
  const [selectedTab, setSelectedTab] = useState(null);
  const handleChangeTab = (id: number) => {
    setCCurrentTab(id);
  };

  return (
    <div className="bg-white shadow-sm rounded-t-xl flex gap-2 p-2 overflow-x-auto w-[80vw] sm:w-[45vw] md:w-[47vw] lg:w-[65vw]">
      {datas.map((data) => (
        <div key={`key:${data.id}`}>
          <Link href={data.href ? data.href : '/'}>
            <Button
              variant={'ghost'}
              className="p-0 hover:text-primary"
              onClick={() => handleChangeTab(data.id)}
            >
              <p
                className={`text-[12px] lg:text-[14px] p-4 ${
                  currentTab === data.id && 'text-primary'
                }`}
              >
                {data.label}
              </p>
            </Button>
          </Link>
          {currentTab === data.id && (
            <div
              className={`border-2 border-primary rounded-xl translate-x- duration-150 ease-in-out`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
