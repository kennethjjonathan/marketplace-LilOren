import ButtonWithIcon from '@/components/ButtonWithIcon/ButtonWithIcon';
import HomeCategoryList from '@/components/HomeCategoryList/HomeCategoryList';
import Layout from '@/components/Layout/Layout';
import PromotionCarousel from '@/components/PromotionCarousel/PromotionCarousel';
import RecommendedProductCard from '@/components/RecommendedProductCard/RecommendedProductCard';
import { HomeClient } from '@/service/home/HomeClient';
import { IRecommendedProductResponse } from '@/service/home/HomeService';
import { IRecommendedProduct } from '@/store/home/useHome';
import { ChevronRight } from 'lucide-react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';

type Props = {
  products: IRecommendedProduct[];
};

const Home: NextPageWithLayout<Props> = ({ products }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center w-full bg-primary-foreground">
      <main className="w-full flex flex-col justify-center items-center">
        <PromotionCarousel
          imageArray={[
            'https://down-id.img.susercontent.com/file/id-50009109-af0948f69bef33259d862b058bc82b84',
            'https://down-id.img.susercontent.com/file/id-50009109-af0948f69bef33259d862b058bc82b84',
            'https://down-id.img.susercontent.com/file/id-50009109-af0948f69bef33259d862b058bc82b84',
          ]}
        />
        <section className="home-category-list bg-white mt-3 lg:mt-5 md:w-[75vw]">
          <HomeCategoryList />
        </section>
        <section className="recommendedProductList flex flex-col justify-center items-center w-full mt-3 lg:mt-5 md:w-[75vw]">
          <div className="flex flex-row justify-between w-full">
            <div className="w-full md:w-[75vw] bg-white text-left text-primary py-3 pl-2 md:border-b-[5px] md:border-b-primary md:text-center md:text-[16px] md:bg-white md:mb-2 text-[14px] px-[10px]">
              {'RECOMMENDED'}
            </div>

            <div className="w-full md:w-[75vw] bg-white text-right text-muted-foreground py-3 pr-2 text-[12px] md:hidden">
              <Link
                href={'/'}
                className="justify-end items-center flex flex-row w-full"
              >
                {'See More'} <ChevronRight size={20} />
              </Link>
            </div>
          </div>

          <div className="HomeRecomProduct grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {products &&
              products.map((product, index) => (
                <RecommendedProductCard
                  product={product}
                  key={`key:${product.name},${index.toString()}`}
                />
              ))}
          </div>
          <ButtonWithIcon variant={'outline'} href="/" className="mt-5">
            {'See More'}
          </ButtonWithIcon>
        </section>
      </main>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps<Props> = async (_) => {
  let res: IRecommendedProductResponse;
  try {
    res = (await HomeClient.getRecommendedProduct())!;
  } catch (e) {
    return {
      props: {
        products: [],
      },
    };
  }

  if (res.error) {
    return {
      props: {
        products: [],
      },
    };
  }

  return {
    props: {
      products: res.data!,
    },
  };
};

export default Home;
