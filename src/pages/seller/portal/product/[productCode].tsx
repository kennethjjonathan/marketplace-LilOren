import ProductForm from '@/components/ProductForm/ProductForm';
import { IProductDetailForEdit } from '@/interface/addProduct';
import axiosInstance from '@/lib/axiosInstance';
import { Utils } from '@/utils';
import { useRouter } from 'next/router';
import React, { useEffect, useState, ReactElement } from 'react';
import SellerLayout from '@/components/SellerLayout/SellerLayout';
import DotsLoading from '@/components/DotsLoading/DotsLoading';
import Head from 'next/head';

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
        console.log(response.data.data);
        setProduct(response.data.data);
      } catch (error) {
        Utils.handleGeneralError(error);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    getProduct();
  }, [router]);

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
