import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Star } from 'lucide-react';
import ImageCarousel from '@/components/ImageCarousel/ImageCarousel';
import ProductPageLayout from '@/components/ProductPageLayout/ProductPageLayout';
import { Separator } from '@/components/ui/separator';
import SellerProfileSnippet from '@/components/SellerProfileSnippet/SellerProfileSnippet';
import ProductDetailDesc from '@/components/ProductDetailDesc/ProductDetailDesc';
import CONSTANTS from '@/constants/constants';
import {
  IProductPage,
  IProductVariant,
  IVariantType,
} from '@/interface/productPage';
import ReviewComponent from '@/components/ReviewComponent/ReviewComponent';
import TypeSelector from '@/components/TypeSelector/TypeSelector';
import { Utils } from '@/utils';

interface ProductPageProps {
  productPage: IProductPage;
}

const dummyProductPage: IProductPage = {
  product: {
    name: 'Shirt',
    description: 'desc',
  },
  Shop: {
    id: 1,
    name: 'Hyouka',
    profile_picture_url: '',
    location: 'Aceh Barat',
  },
  product_variant: [
    {
      id: 1,
      price: 100000,
      discounted_price: 95000,
      stock: 100,
      discount: 5,
      variant_type1_id: 2,
      variant_type2_id: 5,
    },
    {
      id: 2,
      price: 200000,
      discounted_price: 200000,
      stock: 10,
      discount: 0,
      variant_type1_id: 3,
      variant_type2_id: 5,
    },
  ],
  product_media: [
    {
      media_url: 'url',
      media_type: 'image',
    },
  ],
  variant_group1: {
    group_name: 'color',
    variant_types: [
      {
        type_id: 1,
        type_name: 'default',
      },
      {
        type_id: 2,
        type_name: 'red',
      },
      {
        type_id: 3,
        type_name: 'blue',
      },
    ],
  },
  variant_group2: {
    group_name: 'size',
    variant_types: [
      {
        type_id: 4,
        type_name: 'default',
      },
      {
        type_id: 5,
        type_name: 'L',
      },
    ],
  },
  high_price: 200000,
  low_price: 100000,
  is_variant: false,
};

const ProductPage = ({ productPage }: ProductPageProps) => {
  console.log(productPage);
  const [quantity, setQuantity] = useState<number>(0);
  const [group1, setGroup1] = useState<IVariantType | undefined>(undefined);
  const [group2, setGroup2] = useState<IVariantType | undefined>(undefined);
  const [variant, setVariant] = useState<IProductVariant>(
    productPage.product_variant[0],
  );

  function handleChooseType(typeNumber: 1 | 2, type: IVariantType) {
    if (typeNumber === 1) {
    }
  }

  // function setInitialState() {
  //   if (productPage)
  // }

  useEffect(() => {}, []);

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
                {productPage.variant_group1.variant_types.length > 1 && (
                  <div className="mt-2">
                    <TypeSelector
                      variant_group={productPage.variant_group1}
                      chosenType={group1}
                      setChosenType={setGroup1}
                    />
                  </div>
                )}
                {productPage.variant_group2.variant_types.length > 1 && (
                  <div className="mt-2">
                    <TypeSelector
                      variant_group={productPage.variant_group2}
                      chosenType={group2}
                      setChosenType={setGroup2}
                    />
                  </div>
                )}
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
