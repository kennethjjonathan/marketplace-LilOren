import React, { Dispatch, useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import PaginationNav from '@/components//PaginationNav/PaginationNav';
import { IPagination } from '@/interface/pagination';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface SellerPageCategoryTabsProps {
  setCurrentPage: Dispatch<React.SetStateAction<number>>;
  setActiveFilter: Dispatch<React.SetStateAction<string>>;
  shop_name: string;
  sort_desc: string;
  seller_pagination: IPagination;
  sort_by: string;
}

const SellerPageCategoryTabs = ({
  setCurrentPage,
  setActiveFilter,
  shop_name,
  sort_desc,
  seller_pagination,
  sort_by,
}: SellerPageCategoryTabsProps) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('BestSeller');
  const [labelSortPrice, setLabelSortPrice] = useState('Price');

  const handleSortByPrice = (e: string) => {
    setActiveTab('Price');
    router.push(`/shop/${shop_name}?sort_by=price&sort_desc=${e}`);
  };
  const handleFilterBy = (menu: string) => {
    setActiveTab(menu);
    setActiveFilter(menu);
    if (menu === 'MostRecent') {
      router.push(`/shop/${shop_name}?sort_desc=true&page=1`);
    }

    if (menu === 'BestSeller') {
      router.push(`/shop/${shop_name}?page=1`);
    }
  };

  useEffect(() => {
    if (sort_by === 'price' && (sort_desc == 'false' || sort_desc == 'true')) {
      setActiveTab('Price');
      sort_desc === 'false'
        ? setLabelSortPrice('Price: Low to High')
        : setLabelSortPrice('Price: High to Low');
    }
  }, []);

  return (
    <ScrollArea className="w-[calc(100vw-32vw)] flex">
      <div className="flex flex-row items-center gap-3 px-3 py-5">
        <div className="flex flex-row h-full justify-between items-center gap-3">
          <div className="hidden lg:block">
            <p className="text-muted-foreground">{'Sort'}</p>
          </div>
          {/* Most Recent */}
          <Button
            onClick={() => handleFilterBy('MostRecent')}
            className={`${
              activeTab === 'MostRecent' && 'text-primary'
            } h-[20px] bg-transparent lg:bg-accent border-0 p-0 lg:h-full lg:px-4 lg:border-[1px]`}
            variant={'secondary'}
          >
            {'Recent'}
          </Button>
          {/* Best Seller */}
          <Button
            onClick={() => handleFilterBy('BestSeller')}
            className={`${
              activeTab === 'BestSeller' && 'text-primary'
            } h-[20px] bg-transparent border-0 p-0 lg:bg-accent lg:h-full lg:px-4 lg:border-[1px]`}
            variant={'secondary'}
          >
            {'Best Seller'}
          </Button>
          {/* Price Pop Over */}
          <Select onValueChange={(e) => handleSortByPrice(e)}>
            <SelectTrigger
              className={`w-[170px] lg:bg-accent ${
                activeTab === 'Price' && 'text-primary'
              }`}
            >
              <SelectValue
                placeholder={`${
                  sort_by === 'price' ? labelSortPrice : 'Price'
                }`}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{'Price'}</SelectLabel>
                <SelectItem value={'false'}>Price: Low to High</SelectItem>
                <SelectItem value={'true'}>Price: High to Low</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default SellerPageCategoryTabs;
