import React, { useEffect, useState } from 'react';
import { NextPageWithLayout } from '../_app';
import Layout from '@/components/Layout/Layout';
import { ReactElement } from 'react';
import { useSearchParams } from 'next/navigation';
import { IRecommendedProduct } from '@/store/home/useHome';
import { Utils } from '@/utils';
import axiosInstance from '@/lib/axiosInstance';
import RecommendedProductCard from '@/components/RecommendedProductCard/RecommendedProductCard';
import { useRouter } from 'next/router';
import SearchFilter from '@/components/SearchFilter/SearchFilter';

const SearchPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [products, setProducts] = useState<IRecommendedProduct[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const searchParams = useSearchParams();

  useEffect(() => {
    const search_term = searchParams.get('search_term');
    async function getProducts() {
      try {
        const response = await axiosInstance(
          `/products?search_term=${search_term}&page=${currentPage}`,
        );
        setProducts(response.data.data.products);
        console.log(response);
      } catch (error) {
        Utils.handleGeneralError(error);
        console.error(error);
      }
    }
    getProducts();
  }, []);

  return (
    <div className="w-full">
      <div className="w-full md:w-[75vw] mx-auto">
        <div className="w-full md:my-5 px-2">
          <SearchFilter />
        </div>
        <div className="w-full grid grid-cols-2">
          {products &&
            products.map((product, index) => (
              <RecommendedProductCard key={index} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
};

SearchPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default SearchPage;
