import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
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
}
const Tabs = ({ datas }: TabsProps) => {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const [currentTab, setCurrentTab] = useState<string>();

  useEffect(() => {
    if (status === null) {
      setCurrentTab('');
    } else {
      setCurrentTab(status);
    }
  }, [status]);

  return (
    <div
      className={`bg-white shadow-sm rounded-t-xl flex gap-2 p-2 overflow-x-auto`}
    >
      {datas.map((data) => (
        <div key={`key:${data.id}`}>
          <Link href={data.href}>
            <Button
              variant={'ghost'}
              size={'customBlank'}
              className={`lg:hover:text-primary text-[12px] lg:text-[14px] p-4 ${
                currentTab && currentTab === data.status && 'text-primary'
              }`}
            >
              {data.label}
            </Button>
          </Link>
          {currentTab === data.status && (
            <div
              className={`border-2 border-primary rounded-xl duration-150 ease-in-out`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
