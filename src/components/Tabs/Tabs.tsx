import React, { Dispatch, SetStateAction, useState } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

interface IData {
  id: number;
  label: string;
  status: string;
  href: string;
}

interface TabsProps {
  datas: IData[];
  currentTab: string;
  setCurrentTab: Dispatch<SetStateAction<string>>;
}
const Tabs = ({ datas, currentTab, setCurrentTab }: TabsProps) => {
  // const [currentTab, setCCurrentTab] = useState(1);
  const [selectedTab, setSelectedTab] = useState(null);
  const handleChangeTab = (status: string) => {
    setCurrentTab(status);
  };

  return (
    <div className="bg-white shadow-sm rounded-t-xl flex gap-2 p-2 overflow-x-auto w-[85vw] sm:w-[45vw] md:w-[47vw] lg:w-[65vw]">
      {datas.map((data) => (
        <div key={`key:${data.id}`}>
          <Link href={data.href}>
            <Button
              variant={'ghost'}
              className="p-0 hover:text-primary"
              onClick={() => handleChangeTab(data.status)}
            >
              <p
                className={`text-[12px] lg:text-[14px] p-4 ${
                  currentTab === data.status && 'text-primary'
                }`}
              >
                {data.label}
              </p>
            </Button>
          </Link>
          {currentTab === data.status && (
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
