import ProductForm from '@/components/ProductForm/ProductForm';
import { IProductDetailForEdit } from '@/interface/addProduct';
import axiosInstance from '@/lib/axiosInstance';
import { Utils } from '@/utils';
import { useRouter } from 'next/router';
import React, { useEffect, useState, ReactElement } from 'react';
import SellerLayout from '@/components/SellerLayout/SellerLayout';
import DotsLoading from '@/components/DotsLoading/DotsLoading';
import Head from 'next/head';
import { Button } from '@/components/ui/button';

const EditProductPage = () => {
  const router = useRouter();
  const [product, setProduct] = useState<IProductDetailForEdit>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getProduct() {
      if (router.query.productCode === undefined) return;
      setIsLoading(true);
      try {
        const response = await axiosInstance(
          `/merchant/product-detail/${router.query.productCode}`,
        );
        setProduct(response.data.data);
      } catch (error) {
        Utils.handleGeneralError(error);
      } finally {
        setIsLoading(false);
      }
    }
    getProduct();
  }, [router]);

  if (product === undefined) {
    return (
      <>
        <Head>
          <title>Edit Product - LilOren</title>
        </Head>
        <section className="w-[70vw] flex flex-col gap-8 bg-white rounded-xl p-8 shadow-lg">
          <p className="font-bold text-[12px] lg:text-[16px] pb-4 w-full text-center">
            Not able to get product
          </p>
          <div className="w-full flex justify-center items-center">
            <Button onClick={() => router.back()} className="w-fit">
              Go Back
            </Button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Edit Product - LilOren</title>
      </Head>
      {isLoading ? (
        <DotsLoading />
      ) : (
        <ProductForm isEdit={true} productToEdit={product} />
      )}
    </>
  );
};

EditProductPage.getLayout = function getLayout(page: ReactElement) {
  return <SellerLayout header="Edit Product">{page}</SellerLayout>;
};

export default EditProductPage;
