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

interface SellerPageProps {
  sellerPage: ISellerDetails;
}

const SellerPage = ({ sellerPage }: SellerPageProps) => {
  const searchParams = useSearchParams();
  const sort_by = searchParams.get('sort_by');
  const sort_desc = searchParams.get('sort_desc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortByPriceDesc, setSortByPriceDesc] = useState<string>('true');
  const [activeFilter, setActiveFilter] = useState('');
  const tabsRef = useRef(null);
  const l = useSellerPage.use.loading_fetch_seller_details();
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
      params = '?sort_desc=true';
    }
    if (sort_by === 'price') {
      params = '?sort_by=price';
      if (sort_desc === 'false') {
        params += '&sort_desc=false';
      }
    }
    fetchSellerDetails(sellerPage.shop_name, params);
    handleScroll(tabsRef);
  }, [activeFilter, sort_by, sort_desc]);

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
    <section className="flex flex-col justify-center items-center w-full bg-white p-2">
      <div className="flex flex-row"></div>
      {/* Heading */}
      <div className="flex flex-col justify-center w-full md:w-[75vw]">
        <SellerPageHeading sellerPage={seller_details} />
      </div>
      {/* Content Below */}
      <div className="flex flex-row">
        <div className="flex flex-col">
          <div
            className="flex flex-col justify-center w-full md:w-[75vw] sticky top-0 z-50 bg-white pb-4"
            ref={tabsRef}
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 md:w-[75vw]  mt-2">
            {seller_details.products.map((product, index) => (
              <SellerProductCard
                shop_name={sellerPage.shop_name}
                product={product}
                key={`key:${product.product_name},${index.toString()}`}
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
