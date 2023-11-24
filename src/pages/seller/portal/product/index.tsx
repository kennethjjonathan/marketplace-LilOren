import React, { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SellerLayout from '@/components/SellerLayout/SellerLayout';
import { Button } from '@/components/ui/button';
import styles from './SellerPortalProduct.module.scss';
import Head from 'next/head';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Utils } from '@/utils';
import axiosInstance from '@/lib/axiosInstance';
import { IAdminProduct } from '@/interface/productAtAdminSeller';
import Image from 'next/image';

const data = [
  {
    id: 1,
    label: 'All Products',
    status: 'All Products',
    href: '/seller/portal/product',
  },
];

const SellerPortalProduct = () => {
  const router = useRouter();
  const [products, setProducts] = useState<IAdminProduct[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axiosInstance('/merchant/product');
        setProducts(response.data.data.products);
      } catch (error) {
        Utils.handleGeneralError(error);
        console.error(error);
      }
    }
    getProducts();
  }, []);
  return (
    <>
      <Head>
        <title>Seller Product - LilOren</title>
      </Head>
      <div className={`${styles.sellerPortalProduct}`}>
        <section className={`flex flex-col w-[65vw] px-5 pb-5 bg-white`}>
          <div className="w-full flex">
            <Button
              onClick={() => router.push('/seller/portal/product/create')}
              className="w-[200px]"
            >
              Add new product
            </Button>
          </div>
          <div className="w-full">
            <Table>
              <TableCaption>
                A list of your products from most recent.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Thumbnail</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Product Code</TableHead>
                  <TableHead colSpan={2}>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.length !== 0 &&
                  products.map((product, _) => (
                    <TableRow key={product.ProductCode}>
                      <TableCell>
                        <Image
                          src={product.ThumbnailURL}
                          alt={product.ProductName}
                          width={100}
                          height={100}
                          style={{ objectFit: 'cover' }}
                        />
                      </TableCell>
                      <TableCell className="truncate">
                        {product.ProductName}
                      </TableCell>
                      <TableCell className="truncate">
                        {product.ProductCode}
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() =>
                            router.push(
                              `/seller/portal/product/${product.ProductCode}`,
                            )
                          }
                        >
                          Edit
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button>Manage Discount</Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </section>
      </div>
    </>
  );
};

SellerPortalProduct.getLayout = function getLayout(page: ReactElement) {
  return (
    <SellerLayout tabData={data} header="Product List">
      {page}
    </SellerLayout>
  );
};

export default SellerPortalProduct;
