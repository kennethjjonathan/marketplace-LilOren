import React, {
  ReactElement,
  useCallback,
  useState,
  useEffect,
  useRef,
} from 'react';
import { GetServerSideProps } from 'next';
import { useSearchParams } from 'next/navigation';
import CONSTANTS from '@/constants/constants';
import { ISellerDetails, useSellerPage } from '@/store/sellerPage/sellerPage';
import SellerPageCategoryTabs from '@/components/SellerPageCategoryTabs/SellerPageCategoryTabs';
import SellerPageHeading from '@/components/SellerPageHeading/SellerPageHeading';
import Layout from '@/components/Layout/Layout';
import SellerProductCard from '@/components/SellerProductCard/SellerProductCard';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface SellerPageProps {
  sellerPage: ISellerDetails;
}

const SellerPage = ({ sellerPage }: SellerPageProps) => {
  const searchParams = useSearchParams();
  const sort_by = searchParams.get('sort_by');
  const sort_desc = searchParams.get('sort_desc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortByPriceDesc, setSortByPriceDesc] = useState<string>('true');
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('');
  const tabsRef = useRef(null);
  const l = useSellerPage.use.loading_fetch_seller_details();
  const fetchSellerDetails = useSellerPage.use.fetchSellerDetails();
  const seller_details = useSellerPage.use.seller_details();
  const setSellerDetails = useSellerPage.use.setSellerDetails();

  const handleFilter = useCallback(async () => {
    console.log('masuk sini yow');
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
    fetchSellerDetails(sellerPage.shop_name, params);
    handleScroll(tabsRef.current);
  }, [activeFilter, sort_by, sort_desc, currentPage]);

  const handleScroll = (ref: any) => {
    window.scrollTo({
      top: ref.offsetTop,
      left: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    handleFilter();
  }, [handleFilter]);

  useEffect(() => {
    setSellerDetails(sellerPage);
  }, []);

  return (
    <section className="flex flex-col justify-center items-center w-full bg-white lg:p-2">
      <div className="flex flex-row"></div>
      {/* Heading */}
      <div className="flex flex-col justify-center w-full md:w-[75vw]">
        <SellerPageHeading sellerPage={seller_details} />
      </div>
      {/* Content Below */}
      <div className="flex flex-row gap-2 justify-start w-full lg:py-6 md:w-[75vw]">
        <Button>{'All Products'}</Button>
        {seller_details.categories.map((category, index) => (
          <Button key={`key:category${index.toString()}`}>{category}</Button>
        ))}
      </div>
      {/* BEST SELLING PRODUCTS */}
      <div className="flex flex-row justify-between items-center  w-full md:w-[75vw] my-3">
        <p className="font-bold">{'BEST SELLING PRODUCTS'}</p>
        <Button
          variant={'link'}
          onClick={() => setActiveFilter('BestSeller')}
          className="font-bold"
        >
          {'See All'}
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

      {/* Tabs */}
      <div className="flex flex-row">
        <div className="flex flex-col">
          <div
            className="flex flex-col justify-center w-full md:w-[75vw] sticky lg:relative top-0 z-50 bg-white lg:pb-4"
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:w-[75vw] lg:mt-2 pt-3">
            {seller_details.products.map((product, index) => (
              <SellerProductCard
                key={`key:${product.product_name},${index.toString()}`}
                shop_name={sellerPage.shop_name}
                product={product}
              />
            ))}
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
