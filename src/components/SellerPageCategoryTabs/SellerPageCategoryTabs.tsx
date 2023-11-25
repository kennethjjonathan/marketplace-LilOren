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
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import PaginationNav from '@/components//PaginationNav/PaginationNav';
import { IPagination } from '@/interface/pagination';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useSellerPage } from '@/store/sellerPage/sellerPage';

interface SellerPageCategoryTabsProps {
  setCurrentPage: Dispatch<React.SetStateAction<number>>;
  setActiveFilter: Dispatch<React.SetStateAction<string>>;
  setSortByPriceDesc: Dispatch<React.SetStateAction<boolean>>;
  activeFilter: string;
  shop_name: string;
  sort_desc: string;
  seller_pagination: IPagination;
  sort_by: string;
  sortByPriceDesc: boolean;
}

const SellerPageCategoryTabs = ({
  setCurrentPage,
  setActiveFilter,
  activeFilter,
  shop_name,
  sort_desc,
  seller_pagination,
  sort_by,
}: SellerPageCategoryTabsProps) => {
  const searchParams = useSearchParams();
  const fetchSellerDetails = useSellerPage.use.fetchSellerDetails();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('BestSeller');
  const [labelSortPrice, setLabelSortPrice] = useState('Price');

  const handleSortByPrice = (e: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    params.set('sort_by', 'price');
    params.set('sort_desc', e);
    setActiveTab('Price');
    setActiveFilter('Price');
    router.push(`/shop/${shop_name}?${params}`);
    fetchSellerDetails(shop_name, `${params.toString()}`);
  };
  const handleFilterBy = (menu: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete('sort_desc');
    params.delete('sort_by');
    params.delete('category_name');
    params.set('page', '1');

    setActiveTab(menu);
    setActiveFilter(menu);
    if (menu === 'MostRecent') {
      params.set('sort_desc', 'true');
    }
    router.push(`/shop/${shop_name}?${params}`);
    fetchSellerDetails(shop_name, `${params.toString()}`);
  };

  useEffect(() => {
    if (sort_by === 'price' && sort_desc == 'false') {
      setActiveTab('Price');
      setLabelSortPrice('Price: Low to High');
    } else if (sort_desc === 'true') {
      setActiveTab('Price');
      setLabelSortPrice('Price: High to Low');
    }
  }, []);

  return (
    <ScrollArea className="w-[calc(100vw-32vw)]">
      <div className="flex flex-row items-center gap-3 px-3 py-5">
        <div className="flex flex-row h-full justify-between items-center gap-3">
          <div className="hidden lg:block">
            <p className="text-muted-foreground">{'Sort'}</p>
          </div>
          {/* Most Recent */}
          <Button
            onClick={() => handleFilterBy('MostRecent')}
            className={`${
              activeFilter === 'MostRecent' && 'text-primary'
            } bg-transparent lg:bg-accent border-0 p-0 lg:px-4 lg:border-[1px]`}
            variant={'secondary'}
          >
            {'Recent'}
          </Button>
          {/* Best Seller */}
          <Button
            onClick={() => handleFilterBy('BestSeller')}
            className={`${
              activeFilter === 'BestSeller' && 'text-primary'
            } bg-transparent border-0 p-0 lg:bg-accent lg:px-4 lg:border-[1px]`}
            variant={'secondary'}
          >
            {'Best Seller'}
          </Button>
          {/* Price Pop Over */}
          <Select onValueChange={(e) => handleSortByPrice(e)}>
            <SelectTrigger
              className={`w-[170px] lg:bg-accent ${
                activeTab === 'Price' &&
                activeFilter === 'Price' &&
                'text-primary'
              }`}
            >
              <SelectValue
                placeholder={`${
                  activeFilter === 'Price' ? labelSortPrice : 'Price'
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
