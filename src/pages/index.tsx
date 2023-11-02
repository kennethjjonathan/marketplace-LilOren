import Layout from '@/components/Layout/Layout';
import { NextPageWithLayout } from './_app';
import { ReactElement } from 'react';
import PromotionCarousel from '@/components/PromotionCarousel/PromotionCarousel';
import RecommendedProductCard from '@/components/RecommendedProductCard/RecommendedProductCard';
import ButtonWithIcon from '@/components/ButtonWithIcon/ButtonWithIcon';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const recommendationProducts: {
  image: string;
  name: string;
  price: number;
  discount?: number;
  totalSold?: number;
}[] = [
  {
    image:
      'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//92/MTA-5070654/dc_dc_trase_tx_m_shoe_adys300126-bgm_black-gum_full02_g0b376j9.jpg',
    name: 'DC Trase TX M Shoe Sepatu Sneaker Pria - Black Gum [ADYS300126-BGM]',
    price: 475000,
    discount: 35,
    totalSold: 72,
  },
  {
    image:
      'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//106/MTA-54664297/apple_airpods_2nd_gen_full01_vdjk5uyz.jpg',
    name: 'AirPods (generasi ke-2)',
    price: 1929000,
    discount: 35,
    totalSold: 72,
  },
  {
    image:
      'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//90/MTA-71482212/apple_apple_watch_series_8_gps_full23_u2ssmscf.jpg',
    name: 'Apple Watch Series 8 GPS',
    price: 1929000,
    discount: 35,
    totalSold: 72,
  },
  {
    image:
      'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//catalog-image/113/MTA-113898659/raptic_raptic_iphone_14_pro_max_full02_u61ocb6s.jpg',
    name: 'Raptic iPhone 14 Pro Max Case',
    price: 429000,
  },
  {
    image:
      'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//112/MTA-55497289/apple_usb-c_to_lightning_cable_-2m-_full01_qlaofs1z.jpg',
    name: 'USB-C to Lightning Cable (2m)',
    price: 609000,
    discount: 13,
    totalSold: 100,
  },
  {
    image:
      'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//95/MTA-55432616/apple_ipad_pro_5th_gen_12-9-inch_full01_n557vk6l.jpg',
    name: 'iPad Pro 12,9 inci (generasi ke-5)',
    price: 18499000,
    discount: 4,
    totalSold: 100,
  },
  {
    image:
      'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//92/MTA-5070654/dc_dc_trase_tx_m_shoe_adys300126-bgm_black-gum_full02_g0b376j9.jpg',
    name: 'DC Trase TX M Shoe Sepatu Sneaker Pria - Black Gum [ADYS300126-BGM]',
    price: 475000,
    discount: 35,
    totalSold: 72,
  },
  {
    image:
      'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//106/MTA-54664297/apple_airpods_2nd_gen_full01_vdjk5uyz.jpg',
    name: 'AirPods (generasi ke-2)',
    price: 1929000,
    discount: 35,
    totalSold: 72,
  },
  {
    image:
      'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//90/MTA-71482212/apple_apple_watch_series_8_gps_full23_u2ssmscf.jpg',
    name: 'Apple Watch Series 8 GPS',
    price: 1929000,
    discount: 35,
    totalSold: 72,
  },
  {
    image:
      'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//catalog-image/113/MTA-113898659/raptic_raptic_iphone_14_pro_max_full02_u61ocb6s.jpg',
    name: 'Raptic iPhone 14 Pro Max Case',
    price: 429000,
  },
  {
    image:
      'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//112/MTA-55497289/apple_usb-c_to_lightning_cable_-2m-_full01_qlaofs1z.jpg',
    name: 'USB-C to Lightning Cable (2m)',
    price: 609000,
    discount: 13,
    totalSold: 100,
  },
  {
    image:
      'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//95/MTA-55432616/apple_ipad_pro_5th_gen_12-9-inch_full01_n557vk6l.jpg',
    name: 'iPad Pro 12,9 inci (generasi ke-5)',
    price: 18499000,
    discount: 4,
    totalSold: 100,
  },
  {
    image:
      'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//92/MTA-5070654/dc_dc_trase_tx_m_shoe_adys300126-bgm_black-gum_full02_g0b376j9.jpg',
    name: 'DC Trase TX M Shoe Sepatu Sneaker Pria - Black Gum [ADYS300126-BGM]',
    price: 475000,
    discount: 35,
    totalSold: 72,
  },
  {
    image:
      'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//106/MTA-54664297/apple_airpods_2nd_gen_full01_vdjk5uyz.jpg',
    name: 'AirPods (generasi ke-2)',
    price: 1929000,
    discount: 35,
    totalSold: 72,
  },
  {
    image:
      'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//90/MTA-71482212/apple_apple_watch_series_8_gps_full23_u2ssmscf.jpg',
    name: 'Apple Watch Series 8 GPS',
    price: 1929000,
    discount: 35,
    totalSold: 72,
  },
  {
    image:
      'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//catalog-image/113/MTA-113898659/raptic_raptic_iphone_14_pro_max_full02_u61ocb6s.jpg',
    name: 'Raptic iPhone 14 Pro Max Case',
    price: 429000,
  },
  {
    image:
      'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//112/MTA-55497289/apple_usb-c_to_lightning_cable_-2m-_full01_qlaofs1z.jpg',
    name: 'USB-C to Lightning Cable (2m)',
    price: 609000,
    discount: 13,
    totalSold: 100,
  },
  {
    image:
      'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//95/MTA-55432616/apple_ipad_pro_5th_gen_12-9-inch_full01_n557vk6l.jpg',
    name: 'iPad Pro 12,9 inci (generasi ke-5)',
    price: 18499000,
    discount: 4,
    totalSold: 100,
  },
];

const Home: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full px-1 bg-primary-foreground md:bg-white">
      <main className="w-full md:w-[75vw]">
        <PromotionCarousel
          imageArray={[
            'https://down-id.img.susercontent.com/file/id-50009109-af0948f69bef33259d862b058bc82b84',
            'https://down-id.img.susercontent.com/file/id-50009109-af0948f69bef33259d862b058bc82b84',
            'https://down-id.img.susercontent.com/file/id-50009109-af0948f69bef33259d862b058bc82b84',
          ]}
        />
        <section className="recommendedProductList flex flex-col justify-center items-center w-full">
          <div className='flex flex-row justify-between w-full'>
            <div className="w-full md:w-[75vw] bg-accent text-left text-primary py-3 pl-2 text-[12px] md:border-b-[5px] md:border-b-primary md:text-center md:text-[16px] md:bg-white md:mb-2">
              {'RECOMMENDED'}
            </div>

              <div className="w-full md:w-[75vw] bg-accent text-right text-muted-foreground py-3 pr-2 text-[12px] md:hidden">
              <Link href={"/"} className='justify-end items-center flex flex-row w-full'>
                {'See More'} <ChevronRight size={20} />
            </Link>
              </div>
          </div>
          
          <div className="productsWrapper grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 ">
            {recommendationProducts.map((product) => (
              <RecommendedProductCard
                key={`key: lilOren-recommendation-${product.name}`}
                name={product.name}
                image={product.image}
                price={product.price}
                discount={product.discount}
                totalSold={product.totalSold!}
              />
            ))}
          </div>
          <ButtonWithIcon 
            variant={"outline"}
            href='/'
            className='mt-5'
          >
            {"See More"}
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
