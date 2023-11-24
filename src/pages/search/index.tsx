import DotsLoading from '@/components/DotsLoading/DotsLoading';
import EmptyNotify from '@/components/EmptyNotify/EmptyNotify';
import Layout from '@/components/Layout/Layout';
import RecommendedProductCard from '@/components/RecommendedProductCard/RecommendedProductCard';
import SearchFilter from '@/components/SearchFilter/SearchFilter';
import SearchPagination from '@/components/SearchPagination/SearchPagination';
import axiosInstance from '@/lib/axiosInstance';
import { IRecommendedProduct } from '@/store/home/useHome';
import { Utils } from '@/utils';
import Head from 'next/head';
import { useSearchParams } from 'next/navigation';
import { ReactElement, useEffect, useState } from 'react';
import { NextPageWithLayout } from '../_app';

const SearchPage: NextPageWithLayout = () => {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<IRecommendedProduct[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchParams = new URLSearchParams(window.location.search);

    async function getProducts() {
      setIsLoading(true);
      try {
        const response = await axiosInstance(`/products`, {
          params: {
            ...Object.fromEntries(fetchParams.entries()),
          },
        });
        console.log(response);
        setProducts(response.data.data.products);
        setTotalPage(response.data.data.total_page);
      } catch (error) {
        Utils.handleGeneralError(error);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    getProducts();
  }, [searchParams]);

  return (
    <>
      <Head>
        <title>LilOren</title>
      </Head>
      <div className="w-full">
        <div className="w-full md:w-[75vw] mx-auto sm:flex sm:gap-2 sm:mt-5">
          <div className="w-full px-2 sm:w-fit">
            <SearchFilter />
          </div>
          <div className="w-full sm:flex-1">
            {isLoading ? (
              <DotsLoading />
            ) : (
              <>
                {products.length === 0 ? (
                  <EmptyNotify message="No product found" />
                ) : (
                  <div className="w-full grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {products.map((product, index) => (
                      <RecommendedProductCard key={index} product={product} />
                    ))}
                  </div>
                )}
                <div className="w-full flex items-center py-3 justify-center">
                  <SearchPagination totalPage={totalPage} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

SearchPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default SearchPage;
