import React, { useEffect, useState, ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';
import Layout from '@/components/Layout/Layout';
import { useSearchParams } from 'next/navigation';
import { IRecommendedProduct } from '@/store/home/useHome';
import { Utils } from '@/utils';
import axiosInstance from '@/lib/axiosInstance';
import RecommendedProductCard from '@/components/RecommendedProductCard/RecommendedProductCard';
import SearchFilter from '@/components/SearchFilter/SearchFilter';
import SearchPagination from '@/components/SearchPagination/SearchPagination';
import DotsLoading from '@/components/DotsLoading/DotsLoading';
import Head from 'next/head';

const SearchPage: NextPageWithLayout = () => {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<IRecommendedProduct[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchParams = new URLSearchParams();
    const search_term: string | null = searchParams.get('search_term');
    const page: string | null = searchParams.get('page');
    const category: string | null = searchParams.get('category');
    const districts: string | null = searchParams.get('districts');
    const sort_by: string | null = searchParams.get('sort_by');
    const sort_desc: string | null = searchParams.get('sort_desc');
    const min_price: string | null = searchParams.get('min_price');
    const max_price: string | null = searchParams.get('max_price');
    if (typeof search_term === 'string') {
      fetchParams.set('search_term', search_term);
    }
    if (typeof page === 'string') {
      fetchParams.set('page', page);
    }
    if (typeof category === 'string') {
      fetchParams.set('category', category);
    }
    if (typeof districts === 'string') {
      fetchParams.set('districts', districts);
    }
    if (typeof sort_by === 'string') {
      fetchParams.set('sort_by', sort_by);
    }
    if (typeof sort_desc === 'string') {
      fetchParams.set('sort_desc', sort_desc);
    }
    if (typeof min_price === 'string') {
      fetchParams.set('min_price', min_price);
    }
    if (typeof max_price === 'string') {
      fetchParams.set('max_price', max_price);
    }
    async function getProducts() {
      setIsLoading(true);
      try {
        const response = await axiosInstance(
          `/products?${fetchParams.toString()}`,
        );
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
                <div className="w-full grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {products.map((product, index) => (
                    <RecommendedProductCard key={index} product={product} />
                  ))}
                </div>
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
