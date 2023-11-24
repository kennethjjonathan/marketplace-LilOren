import React, {
  ReactElement,
  useCallback,
  useState,
  useEffect,
  useRef,
} from 'react';
import { GetServerSideProps } from 'next';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import CONSTANTS from '@/constants/constants';
import { ISellerDetails, useSellerPage } from '@/store/sellerPage/sellerPage';
import SellerPageCategoryTabs from '@/components/SellerPageCategoryTabs/SellerPageCategoryTabs';
import SellerPageHeading from '@/components/SellerPageHeading/SellerPageHeading';
import Layout from '@/components/Layout/Layout';
import SellerProductCard from '@/components/SellerProductCard/SellerProductCard';
import { Button } from '@/components/ui/button';
import DotsLoading from '@/components/DotsLoading/DotsLoading';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SellerPageProps {
  sellerPage: ISellerDetails;
}

const categories = ['Atasan', 'Beras', 'Kaos', 'Pulpen', 'Pensil', 'Laptop'];

const SellerPage = ({ sellerPage }: SellerPageProps) => {
  console.log(sellerPage);
  const searchParams = useSearchParams();
  const sort_by = searchParams.get('sort_by');
  const sort_desc = searchParams.get('sort_desc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortByPriceDesc, setSortByPriceDesc] = useState<string>('true');
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
  const tabsRef = useRef(null);
  const loading_fetch_seller_details =
    useSellerPage.use.loading_fetch_seller_details();
  const fetchSellerDetails = useSellerPage.use.fetchSellerDetails();
  const seller_details = useSellerPage.use.seller_details();
  const setSellerDetails = useSellerPage.use.setSellerDetails();

  const handleFilter = useCallback(async () => {
    let params = '';
    if (
      sort_by === null &&
      sort_desc === 'true' &&
      activeFilter === 'MostRecent'
    ) {
      params = `?sort_desc=true&page=${currentPage}`;
    }
    if (sort_by === 'price') {
      params = `?sort_by=price&page=${currentPage}`;
      if (sort_desc === 'false') {
        params += '&sort_desc=false';
      }
    }

    if (params !== '') {
      params += `&category_name=${selectedCategory}`;
    }
    setTimeout(() => {
      fetchSellerDetails(sellerPage.shop_name, params);
      handleScroll(tabsRef.current);
    }, 200);
  }, [activeFilter, sort_by, sort_desc, currentPage, selectedCategory]);

  const handleScroll = (ref: any) => {
    window.scrollTo({
      top: ref.offsetTop,
      left: 0,
      behavior: 'auto',
    });
  };

  useEffect(() => {
    handleFilter();
  }, [handleFilter]);

  useEffect(() => {
    setSellerDetails(sellerPage);
    if (!loading_fetch_seller_details) {
      handleScroll(tabsRef.current);
    }
  }, []);

  return (
    <section className="flex flex-col justify-center items-center w-full bg-white lg:px-0 pt-3">
      <div className="flex flex-row"></div>
      {/* Heading */}
      <div className="flex flex-col justify-center w-full md:w-[75vw]">
        <SellerPageHeading sellerPage={seller_details} />
      </div>
      {/* Content Below */}
      <ScrollArea className="max-w-full">
        <div className="flex flex-row gap-2 justify-start w-full lg:py-6 md:w-[75vw] py-3 px-2">
          <div className={'border-0 border-b-2 border-primary'}>
            <Button className="border-0" variant={'outline'}>
              {'Main Page'}
            </Button>
          </div>
          <div className={'border-0'}>
            <Button
              className="border-0"
              variant={'outline'}
              onClick={() => setActiveFilter('BestSeller')}
            >
              {'All Products'}
            </Button>
          </div>
          {categories.slice(0, 4).map((category, index) => (
            <Button
              className={'border-0'}
              key={`key:category${index.toString()}`}
              variant={'outline'}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
          {categories.length > 4 && (
            <Select>
              <SelectTrigger>
                <SelectValue placeholder={'More'} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {/* <SelectLabel>{'Category'}</SelectLabel> */}
                  {categories.slice(4).map((category) => (
                    <SelectItem key={`${category}`} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="w-full flex flex-col justify-center items-center bg-primary-foreground">
        {/* BEST SELLING PRODUCTS */}
        <div className="flex flex-row justify-between items-center  w-full md:w-[75vw] my-3">
          <p className="font-bold pl-3 lg:p-0 text-[12px] md:text-[14px] lg:text-[16px] lg:pl-2">
            {'BEST SELLING PRODUCTS'}
          </p>
          <Button
            variant={'link'}
            onClick={() => handleFilter()}
            className="font-bold"
          >
            {'See All >'}
          </Button>
        </div>
        <div className="w-full md:w-[75vw] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {seller_details.best_seller.map((product, index) => (
            <SellerProductCard
              key={`key:${product.product_name},${index.toString()}`}
              shop_name={sellerPage.shop_name}
              product={product}
            />
          ))}
        </div>

        <div className="lg:flex lg:flex-row w-full md:w-[75vw] gap-3">
          <div className="category border-[1px] rounded-lg bg-white px-4 py-2 mb-5 hidden lg:block">
            <div className="border-b-[1px] pb-3 pt-3 pr-5">
              <p className="font-bold text-[16px] leading-[21px] text-left">
                {'Category'}
              </p>
            </div>
            <ul className="categories  leading-[21px] flex flex-col gap-3 mt-4 text-[14px]">
              <li
                onKeyDown={() => setSelectedCategory('')}
                onClick={() => setSelectedCategory('')}
                className={`hover:text-primary hover:cursor-pointer text-[14px] ${
                  selectedCategory === ''
                    ? 'text-primary'
                    : 'font-light text-muted-foreground'
                }`}
              >
                {'All Products'}
              </li>
              {seller_details.categories.map((category) => (
                <li
                  key={`key:${category}`}
                  onKeyDown={() => setSelectedCategory(category)}
                  onClick={() => setSelectedCategory(category)}
                  className={`hover:text-primary hover:cursor-pointer ${
                    selectedCategory === category
                      ? 'text-primary'
                      : 'font-light text-muted-foreground'
                  }`}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
          {/* Tabs and product */}
          <div className="flex flex-row lg:sticky lg:top-0">
            <div className="flex flex-col">
              <div
                className="flex flex-col justify-center sticky lg:relative top-0 z-50 bg-white lg:mb-4 rounded-lg"
                ref={tabsRef}
                id="tabs"
              >
                <SellerPageCategoryTabs
                  shop_name={seller_details.shop_name}
                  sort_desc={sort_desc as string}
                  seller_pagination={seller_details.pagination}
                  setCurrentPage={setCurrentPage}
                  setActiveFilter={setActiveFilter}
                  sort_by={sort_by as string}
                />
              </div>
              {loading_fetch_seller_details ? (
                <div className="w-full flex justify-center h-[350px]">
                  <DotsLoading />
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-full md:w-[75vw] lg:mt-2 pt-3">
                  {seller_details.products.map((product, index) => (
                    <SellerProductCard
                      key={`key:${product.product_name},${index.toString()}`}
                      shop_name={sellerPage.shop_name}
                      product={product}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellerPage;

SellerPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let sellerPage = null;

  try {
    const response = await fetch(
      `${CONSTANTS.BASEURL}/shops/${params!.sellerId}`,
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    sellerPage = data.data;
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      sellerPage: sellerPage,
    },
  };
};
