import { ReactElement } from 'react';
import { ChevronRight, Star } from 'lucide-react';
import { NextPageWithLayout } from './_app';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/Layout/Layout';
import PromotionCarousel from '@/components/PromotionCarousel/PromotionCarousel';
import ButtonWithIcon from '@/components/ButtonWithIcon/ButtonWithIcon';
import HomeCategoryList from '@/components/HomeCategoryList/HomeCategoryList';
import styles from './Home.module.css';
import { Utils } from '@/utils';

const recommendationProducts: {
  image: string;
  name: string;
  base_price: number;
  discounted_price: number;
  discount?: number;
  totalSold?: number;
  shop: {
    shop_loc: string;
    shop_name: string;
    rating_average: number;
    total_sold: number;
  };
}[] = [
  {
    image:
      'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//92/MTA-5070654/dc_dc_trase_tx_m_shoe_adys300126-bgm_black-gum_full02_g0b376j9.jpg',
    name: 'ACMIC DIGIMAX SuperMini Digital 10000mAh Power Bank (QC4 + PD + VOOC)',
    base_price: 799000,
    discounted_price: 295000,
    discount: 63,
    totalSold: 72,
    shop: {
      shop_loc: 'Jakarta Timur',
      shop_name: 'Unilever',
      rating_average: 4.9,
      total_sold: 720,
    },
  },
  {
    image:
      'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//92/MTA-5070654/dc_dc_trase_tx_m_shoe_adys300126-bgm_black-gum_full02_g0b376j9.jpg',
    name: 'ACMIC DIGIMAX SuperMini Digital 10000mAh Power Bank (QC4 + PD + VOOC)',
    base_price: 799000,
    discounted_price: 295000,
    discount: 63,
    totalSold: 72,
    shop: {
      shop_loc: 'Jakarta Timur',
      shop_name: 'Unilever',
      rating_average: 4.9,
      total_sold: 720,
    },
  },
  {
    image:
      'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//92/MTA-5070654/dc_dc_trase_tx_m_shoe_adys300126-bgm_black-gum_full02_g0b376j9.jpg',
    name: 'ACMIC DIGIMAX SuperMini Digital 10000mAh Power Bank (QC4 + PD + VOOC)',
    base_price: 799000,
    discounted_price: 295000,
    discount: 63,
    totalSold: 72,
    shop: {
      shop_loc: 'Jakarta Timur',
      shop_name: 'Unilever',
      rating_average: 4.9,
      total_sold: 720,
    },
  },
  {
    image:
      'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//92/MTA-5070654/dc_dc_trase_tx_m_shoe_adys300126-bgm_black-gum_full02_g0b376j9.jpg',
    name: 'ACMIC DIGIMAX SuperMini Digital 10000mAh Power Bank (QC4 + PD + VOOC)',
    base_price: 799000,
    discounted_price: 295000,
    discount: 63,
    totalSold: 72,
    shop: {
      shop_loc: 'Jakarta Timur',
      shop_name: 'Unilever',
      rating_average: 4.9,
      total_sold: 720,
    },
  },
  {
    image:
      'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//92/MTA-5070654/dc_dc_trase_tx_m_shoe_adys300126-bgm_black-gum_full02_g0b376j9.jpg',
    name: 'ACMIC DIGIMAX SuperMini Digital 10000mAh Power Bank (QC4 + PD + VOOC)',
    base_price: 799000,
    discounted_price: 295000,
    discount: 63,
    totalSold: 72,
    shop: {
      shop_loc: 'Jakarta Timur',
      shop_name: 'Unilever',
      rating_average: 4.9,
      total_sold: 720,
    },
  },
  {
    image:
      'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//92/MTA-5070654/dc_dc_trase_tx_m_shoe_adys300126-bgm_black-gum_full02_g0b376j9.jpg',
    name: 'ACMIC DIGIMAX SuperMini Digital 10000mAh Power Bank (QC4 + PD + VOOC)',
    base_price: 799000,
    discounted_price: 295000,
    discount: 63,
    totalSold: 72,
    shop: {
      shop_loc: 'Jakarta Timur',
      shop_name: 'Unilever',
      rating_average: 4.9,
      total_sold: 720,
    },
  },
  {
    image:
      'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//92/MTA-5070654/dc_dc_trase_tx_m_shoe_adys300126-bgm_black-gum_full02_g0b376j9.jpg',
    name: 'ACMIC DIGIMAX SuperMini Digital 10000mAh Power Bank (QC4 + PD + VOOC)',
    base_price: 799000,
    discounted_price: 295000,
    discount: 63,
    totalSold: 72,
    shop: {
      shop_loc: 'Jakarta Timur',
      shop_name: 'Unilever',
      rating_average: 4.9,
      total_sold: 720,
    },
  },
  {
    image:
      'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//92/MTA-5070654/dc_dc_trase_tx_m_shoe_adys300126-bgm_black-gum_full02_g0b376j9.jpg',
    name: 'ACMIC DIGIMAX SuperMini Digital 10000mAh Power Bank (QC4 + PD + VOOC)',
    base_price: 799000,
    discounted_price: 295000,
    discount: 63,
    totalSold: 72,
    shop: {
      shop_loc: 'Jakarta Timur',
      shop_name: 'Unilever',
      rating_average: 4.9,
      total_sold: 720,
    },
  },
  {
    image:
      'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//92/MTA-5070654/dc_dc_trase_tx_m_shoe_adys300126-bgm_black-gum_full02_g0b376j9.jpg',
    name: 'ACMIC DIGIMAX SuperMini Digital 10000mAh Power Bank (QC4 + PD + VOOC)',
    base_price: 799000,
    discounted_price: 295000,
    discount: 63,
    totalSold: 72,
    shop: {
      shop_loc: 'Jakarta Timur',
      shop_name: 'Unilever',
      rating_average: 4.9,
      total_sold: 720,
    },
  },
];

const Home: NextPageWithLayout = () => {
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
            {recommendationProducts.map((product, index) => (
              <div
                className={styles.product}
                key={`key:${product.name} ${index}`}
              >
                <div className={styles.product_feed}>
                  <div className={`${styles.product_wrapper}`}>
                    <div className={styles.master_product_card}>
                      <div className={styles.container_card}>
                        <div className={styles.container}>
                          <div className={styles.image}>
                            <Link href={'/'}>
                              <div
                                className={`img_container block w-[100%]`}
                              ></div>
                              <Image
                                src={product.image}
                                width={500}
                                height={500}
                                alt={'image'}
                                className={`w-[200] h-[200]`}
                              />
                            </Link>
                          </div>
                          <div className={`${styles.content}`}>
                            <Link
                              href={'/'}
                              className={`${styles.info_content}`}
                            >
                              <div className={`${styles.product_name}`}>
                                {product.name}
                              </div>
                              <div>
                                <div>
                                  <div className={`${styles.product_price}`}>
                                    {Utils.convertPrice(
                                      product.discounted_price !== 0
                                        ? product.discounted_price
                                        : product.base_price,
                                    )}
                                  </div>
                                  {product.discount !== 0 && (
                                    <div className={`${styles.slash_price}`}>
                                      <div
                                        className={`${styles.label_slash_price}`}
                                      >
                                        {Utils.convertPrice(product.base_price)}
                                      </div>
                                      <div
                                        className={`${styles.badge_slash_price}`}
                                      >
                                        {`${product.discount!}%`}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className={`${styles.shop}`}>
                                <div className={`${styles.shop_wrapper}`}>
                                  <div
                                    className={`${styles.shop_and_location}`}
                                  >
                                    <span className={`${styles.shop_loc}`}>
                                      {product.shop.shop_loc}
                                    </span>
                                    <span className={`${styles.shop_name}`}>
                                      {product.shop.shop_name}
                                    </span>
                                  </div>
                                </div>
                                <div
                                  className={`${styles.shop_rating_average_and_label}`}
                                >
                                  <Star
                                    size={15}
                                    fill={'#FFDF00'}
                                    className={
                                      'text-[#FFDF00] flex-shrink mr-[2px]'
                                    }
                                  />
                                  <span
                                    className={`${styles.shop_rating_average}`}
                                  >
                                    {product.shop.rating_average}
                                  </span>
                                  <span
                                    className={`${styles.separator}`}
                                  ></span>
                                  <span className={`${styles.shop_label}`}>
                                    {product.shop.total_sold}+ terjual
                                  </span>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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

export default Home;
