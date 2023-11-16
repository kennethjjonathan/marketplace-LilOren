import React, { useEffect, useState, ReactElement } from 'react';
import { GetServerSideProps } from 'next';
import { Star } from 'lucide-react';
import CONSTANTS from '@/constants/constants';
import ImageCarousel from '@/components/ImageCarousel/ImageCarousel';
import ProductPageLayout from '@/components/ProductPageLayout/ProductPageLayout';
import { Separator } from '@/components/ui/separator';
import SellerProfileSnippet from '@/components/SellerProfileSnippet/SellerProfileSnippet';
import ProductDetailDesc from '@/components/ProductDetailDesc/ProductDetailDesc';
import {
  IProductPage,
  IProductVariant,
  IVariantType,
} from '@/interface/productPage';
import Layout from '@/components/Layout/Layout';
import ReviewComponent from '@/components/ReviewComponent/ReviewComponent';
import TypeSelector from '@/components/TypeSelector/TypeSelector';
import { Utils } from '@/utils';
import axiosInstance from '@/lib/axiosInstance';
import { useRouter } from 'next/router';

interface ProductPageProps {
  productPage: IProductPage;
  highestDiscount: number;
  isGroup1Variant: boolean;
  isGroup2Variant: boolean;
}

const ProductPage = ({
  productPage,
  highestDiscount,
  isGroup1Variant,
  isGroup2Variant,
}: ProductPageProps) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState<number>(1);
  const [group1, setGroup1] = useState<IVariantType>(
    productPage.variant_group1.variant_types[0],
  );
  const [group2, setGroup2] = useState<IVariantType>(
    productPage.variant_group2.variant_types[0],
  );
  const [initialAvailableGroup1, setInitialAvailableGroup1] =
    useState<Set<number>>();
  const [initialAvailableGroup2, setInitialAvailableGroup2] =
    useState<Set<number>>();
  const [availableGroup1, setAvailableGroup1] = useState<Set<number>>();
  const [availableGroup2, setAvailableGroup2] = useState<Set<number>>();
  const [variant, setVariant] = useState<IProductVariant | undefined>(
    undefined,
  );

  function handleChooseGroup1(type: IVariantType) {
    if (group1.type_name !== 'default' && group1.type_id === type.type_id) {
      setGroup1(productPage.variant_group1.variant_types[0]);
      setAvailableGroup2(initialAvailableGroup2);
      searchVariant(productPage.variant_group1.variant_types[0], group2);
    } else {
      setGroup1(type);
      searchAvailable(1, type);
      searchVariant(type, group2);
    }
  }

  function handleChooseGroup2(type: IVariantType) {
    if (group2.type_name !== 'default' && group2.type_id === type.type_id) {
      setGroup2(productPage.variant_group2.variant_types[0]);
      setAvailableGroup1(initialAvailableGroup1);
      searchVariant(group1, productPage.variant_group2.variant_types[0]);
    } else {
      setGroup2(type);
      searchAvailable(2, type);
      searchVariant(group1, type);
    }
  }

  function searchAvailable(typeNumber: 1 | 2, type: IVariantType) {
    if (typeNumber === 1) {
      const newAvailable = new Set<number>();
      for (let i = 0; i < productPage.product_variant.length; i++) {
        if (productPage.product_variant[i].variant_type1_id === type.type_id) {
          newAvailable.add(productPage.product_variant[i].variant_type2_id);
        }
      }
      setAvailableGroup2(newAvailable);
    } else {
      const newAvailable = new Set<number>();
      for (let i = 0; i < productPage.product_variant.length; i++) {
        if (productPage.product_variant[i].variant_type2_id === type.type_id) {
          newAvailable.add(productPage.product_variant[i].variant_type1_id);
        }
      }
      setAvailableGroup1(newAvailable);
    }
  }

  function searchVariant(type1: IVariantType, type2: IVariantType) {
    if (
      (type1.type_name === 'default' && isGroup1Variant) ||
      (type2.type_name === 'default' && isGroup2Variant)
    ) {
      setVariant(undefined);
    } else {
      for (let i = 0; i < productPage.product_variant.length; i++) {
        if (
          productPage.product_variant[i].variant_type1_id === type1.type_id &&
          productPage.product_variant[i].variant_type2_id === type2.type_id
        ) {
          setVariant(productPage.product_variant[i]);
          return;
        }
      }
    }
  }

  function setInitialAvailable() {
    const availableSet1 = new Set<number>();
    const availableSet2 = new Set<number>();
    for (let i = 0; i < productPage.product_variant.length; i++) {
      availableSet1.add(productPage.product_variant[i].variant_type1_id);
      availableSet2.add(productPage.product_variant[i].variant_type2_id);
    }
    setAvailableGroup1(availableSet1);
    setInitialAvailableGroup1(availableSet1);
    setAvailableGroup2(availableSet2);
    setInitialAvailableGroup2(availableSet2);
  }

  useEffect(() => {
    setInitialAvailable();
  }, []);

  async function handleAddToCart() {
    try {
      const response = await axiosInstance.post(
        `${CONSTANTS.BASEURL}/cart/add-product`,
        {
          product_variant_id: 4,
          seller_id: 1,
          quantity: 5,
        },
        { withCredentials: true },
      );
    } catch (error: any) {
      if (error.data.message === CONSTANTS.ALREADY_LOGGED_OUT) {
        Utils.notify(CONSTANTS.TOKEN_HAS_EXPIRED, 'default', 'colored');
        router.push('/signin');
      }
    }
  }

  return (
    <>
      <section className="flex flex-col justify-center items-center w-full bg-white roboto-text">
        <div className="w-full md:w-[75vw] pt-5 pb-[5.5rem]">
          <div className="w-full flex flex-col gap-6 lg:flex-row">
            <div className="w-full lg:w-1/3">
              {/* <ImageCarousel mediaArray={productPage.product_media} /> */}
            </div>
            <div className="flex-1 px-2 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h1 className="text-lg font-semibold sm:text-xl lg:text-3xl">
                  {`${
                    productPage.product.name +
                    (group1.type_name === 'default'
                      ? ''
                      : ` | ${group1.type_name}`) +
                    (group2.type_name === 'default'
                      ? ''
                      : ` | ${group2.type_name}`)
                  }`}
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
                  {variant === undefined &&
                  productPage.low_price < productPage.high_price ? (
                    <p className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
                      {`${Utils.convertPrice(
                        productPage.low_price,
                      )} - ${Utils.convertPrice(productPage.high_price)}`}
                    </p>
                  ) : variant === undefined &&
                    productPage.low_price === productPage.high_price ? (
                    <p className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
                      {Utils.convertPrice(productPage.low_price)}
                    </p>
                  ) : (
                    <p className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
                      {variant!.discount === 0
                        ? Utils.convertPrice(variant!.price)
                        : Utils.convertPrice(variant!.discounted_price)}
                    </p>
                  )}
                  {variant === undefined && highestDiscount !== 0 ? (
                    <div className="flex items-center gap-2 mt-1 text-base sm:text-lg lg:text-xl">
                      <p className="px-1.5 py-0.5 bg-destructive text-white font-semibold rounded-md">{`%${highestDiscount}`}</p>
                    </div>
                  ) : variant === undefined &&
                    highestDiscount === 0 ? null : variant !== undefined &&
                    variant.discount !== 0 ? (
                    <div className="flex items-center gap-2 mt-1 text-base sm:text-lg lg:text-xl">
                      <p className="px-1.5 py-0.5 bg-destructive text-white font-semibold rounded-md">{`%${variant.discount}`}</p>
                      <p className="text-gray-400 font-semibold line-through">
                        {Utils.convertPrice(variant.price)}
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
              <Separator className="h-0.5 rounded-md" />
              <div>
                {productPage.variant_group1.variant_types.length > 1 &&
                  availableGroup1 !== undefined && (
                    <div className="mt-2">
                      <TypeSelector
                        variant_group={productPage.variant_group1}
                        chosenType={group1}
                        handleChooseGroup={handleChooseGroup1}
                        availableSet={availableGroup1}
                      />
                    </div>
                  )}
                {productPage.variant_group2.variant_types.length > 1 &&
                  availableGroup2 !== undefined && (
                    <div className="mt-2">
                      <TypeSelector
                        variant_group={productPage.variant_group2}
                        chosenType={group2}
                        handleChooseGroup={handleChooseGroup2}
                        availableSet={availableGroup2}
                      />
                    </div>
                  )}
              </div>
            </div>
          </div>
          <div className="px-2 w-full my-4">
            <Separator className="h-0.5 rounded-md" />
          </div>
          <SellerProfileSnippet seller={productPage.shop} />
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
      <ProductPageLayout
        quantity={quantity}
        setQuantity={setQuantity}
        variant={variant}
        handleAddToCart={handleAddToCart}
      />
    </>
  );
};

export default ProductPage;

ProductPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // const productPage: IProductPage = {
  //   product: {
  //     name: 'Shirt',
  //     description: 'desc',
  //   },
  //   shop: {
  //     id: 1,
  //     name: 'Hyouka',
  //     profile_picture_url:
  //       'https://down-aka-id.img.susercontent.com/7d2818ddcf9fd656b596ca8ca0a61b80_tn',
  //     location: 'Aceh Barat',
  //   },
  //   product_variant: [
  //     {
  //       id: 1,
  //       price: 100000,
  //       discounted_price: 95000,
  //       stock: 100,
  //       discount: 5,
  //       variant_type1_id: 2,
  //       variant_type2_id: 5,
  //     },
  //     {
  //       id: 2,
  //       price: 200000,
  //       discounted_price: 200000,
  //       stock: 10,
  //       discount: 0,
  //       variant_type1_id: 3,
  //       variant_type2_id: 5,
  //     },
  //     {
  //       id: 3,
  //       price: 300000,
  //       discounted_price: 270000,
  //       stock: 10,
  //       discount: 10,
  //       variant_type1_id: 2,
  //       variant_type2_id: 6,
  //     },
  //   ],
  //   product_media: [
  //     {
  //       media_url:
  //         'https://down-id.img.susercontent.com/file/13913932b65d105da4af78ee23e72a1a',
  //       media_type: 'image',
  //     },
  //     {
  //       media_url:
  //         'https://down-id.img.susercontent.com/file/27670afe9db6af1f9d85d1a39c05eba5',
  //       media_type: 'image',
  //     },
  //     {
  //       media_url:
  //         'https://down-id.img.susercontent.com/file/1e27552a88b18bf53d4274badb8cabd4',
  //       media_type: 'image',
  //     },
  //     {
  //       media_url:
  //         'https://down-id.img.susercontent.com/file/9de3c76fc7e9bb5123e146c6e80e7335',
  //       media_type: 'image',
  //     },
  //     {
  //       media_url:
  //         'https://down-id.img.susercontent.com/file/93b788c59388944b3de6742928a88324',
  //       media_type: 'image',
  //     },
  //     {
  //       media_url:
  //         'https://down-id.img.susercontent.com/file/315b0a3b5aa3d7743f0e914ec60d5fed',
  //       media_type: 'image',
  //     },
  //     {
  //       media_url:
  //         'https://down-id.img.susercontent.com/file/ee24535522586415b4d4998bc8309658',
  //       media_type: 'image',
  //     },
  //   ],
  //   variant_group1: {
  //     group_name: 'color',
  //     variant_types: [
  //       {
  //         type_id: 1,
  //         type_name: 'default',
  //       },
  //       {
  //         type_id: 2,
  //         type_name: 'red',
  //       },
  //       {
  //         type_id: 3,
  //         type_name: 'blue',
  //       },
  //     ],
  //   },
  //   variant_group2: {
  //     group_name: 'size',
  //     variant_types: [
  //       {
  //         type_id: 4,
  //         type_name: 'default',
  //       },
  //       {
  //         type_id: 5,
  //         type_name: 'L',
  //       },
  //       {
  //         type_id: 6,
  //         type_name: 'XL',
  //       },
  //       {
  //         type_id: 7,
  //         type_name: 'XXL',
  //       },
  //     ],
  //   },
  //   high_price: 200000,
  //   low_price: 100000,
  //   is_variant: false,
  // };
  let productPage: IProductPage | null = null;
  let highestDiscount: number = 0;
  let isGroup1Variant: boolean | null = null;
  let isGroup2Variant: boolean | null = null;

  try {
    const response = await fetch(
      `${CONSTANTS.BASEURL}/products/${params!.productId}`,
    );
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    productPage = data.data;
  } catch (error) {
    console.error(error);
  }

  if (productPage !== null) {
    for (let i = 0; i < productPage.product_variant.length; i++) {
      if (productPage.product_variant[i].discount > highestDiscount) {
        highestDiscount = productPage.product_variant[i].discount;
      }
    }
    if (productPage.variant_group1.variant_types.length > 1) {
      isGroup1Variant = true;
    } else {
      isGroup1Variant = false;
    }
    if (productPage.variant_group2.variant_types.length > 1) {
      isGroup2Variant = true;
    } else {
      isGroup2Variant = false;
    }
  }

  if (!productPage) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      productPage: productPage,
      highestDiscount: highestDiscount,
      isGroup1Variant: isGroup1Variant,
      isGroup2Variant: isGroup2Variant,
    },
  };
};
