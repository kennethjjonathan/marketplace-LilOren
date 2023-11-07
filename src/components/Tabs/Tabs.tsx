import React, { useState } from 'react';
import { Button } from '../ui/button';

const data = [
  {
    id: 1,
    label: 'All Order',
  },
  {
    id: 2,
    label: 'New Order',
  },
  {
    id: 3,
    label: 'Ready to Ship',
  },
  {
    id: 4,
    label: 'In Delivery',
  },
  {
    id: 5,
    label: 'Completed',
  },
  {
    id: 6,
    label: 'Cancelled',
  },
];
const Tabs = () => {
  const [currentTab, setCCurrentTab] = useState(1);
  const [selectedTab, setSelectedTab] = useState(null);
  const handleChangeTab = (id: number) => {
    setCCurrentTab(id);
  };

  return (
    <div className="bg-white shadow-sm rounded-t-xl flex gap-2 p-2 overflow-x-auto w-[80vw] sm:w-[45vw] md:w-[47vw] lg:w-[65vw]">
      {data.map((orderStatus) => (
        <div key={`key:${orderStatus.id}`}>
          <Button
            variant={'ghost'}
            className="p-0 hover:text-primary"
            onClick={() => handleChangeTab(orderStatus.id)}
          >
            <p
              className={`text-[12px] lg:text-[14px] p-4 ${
                currentTab === orderStatus.id && 'text-primary'
              }`}
            >
              {orderStatus.label}
            </p>
          </Button>
          {currentTab === orderStatus.id && (
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
