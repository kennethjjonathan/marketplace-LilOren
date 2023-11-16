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
const Tabs = ({ datas, currentTab }: TabsProps) => {
  return (
    <div
      className={`bg-white shadow-sm rounded-t-xl flex gap-2 p-2 overflow-x-auto`}
    >
      {datas.map((data) => (
        <div key={`key:${data.id}`}>
          <Link href={data.href}>
            <Button variant={'ghost'} className="p-0 hover:text-primary">
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
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
