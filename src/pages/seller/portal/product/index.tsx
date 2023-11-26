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
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Utils } from '@/utils';
import axiosInstance from '@/lib/axiosInstance';
import { IAdminProduct } from '@/interface/productAtAdminSeller';
import Image from 'next/image';
import PaginationNav from '@/components/PaginationNav/PaginationNav';

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
        const response = await axiosInstance(
          `/merchant/product?page=${currentPage}`,
        );
        setProducts(response.data.data.products);
        setTotalPage(response.data.data.pagination.total_page);
      } catch (error) {
        Utils.handleGeneralError(error);
      }
    }
    getProducts();
  }, [currentPage]);
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
          <div className="w-full mt-8">
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
                  products.map((product) => (
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
                        <Button
                          onClick={() =>
                            router.push(
                              `/seller/portal/product/discount/${product.ProductCode}`,
                            )
                          }
                        >
                          Manage Discount
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
          <div className="w-full flex justify-center items-center mt-5">
            <PaginationNav
              currentPage={currentPage}
              totalPage={totalPage}
              setCurrentPage={setCurrentPage}
            />
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
