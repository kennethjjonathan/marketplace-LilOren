import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { Star } from 'lucide-react';
import ImageCarousel from '@/components/ImageCarousel/ImageCarousel';
import ProductPageLayout from '@/components/ProductPageLayout/ProductPageLayout';
import { Separator } from '@/components/ui/separator';
import SellerProfileSnippet from '@/components/SellerProfileSnippet/SellerProfileSnippet';
import ProductDetailDesc from '@/components/ProductDetailDesc/ProductDetailDesc';
import CONSTANTS from '@/constants/constants';
import { IProductPage, IProductVariant } from '@/interface/productPage';
import ReviewComponent from '@/components/ReviewComponent/ReviewComponent';
import { Utils } from '@/utils';

interface ProductPageProps {
  productPage: IProductPage;
}

const ProductPage = ({ productPage }: ProductPageProps) => {
  const [quantity, setQuantity] = useState<number>(0);
  const [variant, setVariant] = useState<IProductVariant>(
    productPage.product_variant[0],
  );

  return (
    <>
      <section className="flex flex-col justify-center items-center w-full bg-white roboto-text">
        <div className="w-full md:w-[75vw] pt-5 pb-16">
          <div className="w-full flex flex-col gap-6 lg:flex-row">
            <div className="w-full lg:w-1/3">
              {/* <ImageCarousel mediaArray={productPage.product_media} /> */}
            </div>
            <div className="flex-1 px-2 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h1 className="text-lg font-semibold sm:text-xl lg:text-3xl">
                  {productPage.product.name}
                </h1>
                <div className="w-full flex justify-start items-center gap-2">
                  <p className="text-base sm:text-lg lg:text-xl">
                    Sold: <span className="font-light">{`(${50})`}</span>
                  </p>
                  <div className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
                  <div className="flex items-center">
                    <Star className="fill-yellow-300 text-yellow-300 aspect-square h-5 mb-[0.125rem] sm:h-6" />{' '}
                    <p className="text-base sm:text-lg lg:text-xl">
                      4.3 <span className="font-light">{`(${4} rating)`}</span>
                    </p>
                  </div>
                </div>
                <div className="lg:mt-12">
                  <p className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
                    {variant.discount === 0
                      ? Utils.convertPrice(variant.price)
                      : Utils.convertPrice(variant.discounted_price)}
                  </p>
                  {variant.discount !== 0 && (
                    <div className="flex items-center gap-2 mt-1 text-base sm:text-lg lg:text-xl">
                      <p className="px-1.5 py-0.5 bg-destructive text-white font-semibold rounded-md">{`%${variant.discount}`}</p>
                      <p className="text-gray-400 font-semibold line-through">
                        {Utils.convertPrice(variant.price)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <Separator className="h-0.5 rounded-md" />
              <div>
                <div className="mt-2">
                  {/* <TypeSelector variant_group={productPage.variant_group} chosenType={}/> */}
                </div>
              </div>
            </div>
          </div>
          <div className="px-2 w-full my-4">
            <Separator className="h-0.5 rounded-md" />
          </div>
          <SellerProfileSnippet seller={productPage.Shop} />
          <div className="px-2 w-full my-4">
            <Separator className="h-0.5 rounded-md" />
          </div>
          <ProductDetailDesc desc={productPage.product.description} />
          <div className="px-2 w-full my-4">
            <Separator className="h-0.5 rounded-md" />
          </div>
          <ReviewComponent />
        </div>
      </section>
      <ProductPageLayout quantity={quantity} setQuantity={setQuantity} />
    </>
  );
};

export default ProductPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let productPage: IProductPage | null = null;
  try {
    const response = await fetch(
      `${CONSTANTS.BASEURL}/product/${params!.productId}`,
    );
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    productPage = data.data;
  } catch (error) {
    console.error(error);
  }

  console.log(productPage);

  if (!productPage) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      productPage: productPage,
    },
  };
};
