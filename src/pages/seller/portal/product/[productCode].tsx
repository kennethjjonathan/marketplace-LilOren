import axiosInstance from '@/lib/axiosInstance';
import { Utils } from '@/utils';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const EditPage = () => {
  const router = useRouter();

  useEffect(() => {
    async function getProduct() {
      if (router.query.productCode === undefined) return;
      try {
        const response = await axiosInstance(
          `/merchant/product-detail/${router.query.productCode}`,
        );
        console.log(response);
      } catch (error) {
        Utils.handleGeneralError(error);
        console.error(error);
      }
    }
    getProduct();
  }, [router]);

  return <div>Test</div>;
};

export default EditPage;
