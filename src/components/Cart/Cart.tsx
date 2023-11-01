import React from 'react';
import Link from 'next/link';
import { Utils } from '@/utils';
import { Button } from '../ui/button';
import { ListItem } from '../Navigation/Navigation';
import EmptyCart from '../EmptyCart/EmptyCart';
import styles from './Cart.module.scss';

interface Product {
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  products: Product[];
}

const Cart = ({ products }: CartProps) => {
  console.log(products.length);
  return (
    <div className={styles.cart}>
      <div className="flex flex-row justify-between items-center px-5 pt-5">
        <p className="totalCartItems text-[10px] sm:text-[12px] md:text-[14px]">{`Cart (${products.length})`}</p>
        <Button
          variant={'link'}
          className="p-0 text-[10px] sm:text-[12px] md:text-[14px]"
        >
          <Link href="/cart">See My Cart</Link>
        </Button>
      </div>
      <ul className="grid gap-3 p-2 sm:w-[200px] md:w-[200px] lg:w-[290px] lg:grid-rows-[.75fr_1fr]">
        {products.length !== 0 ? (
          products.map((product) => (
            <ListItem
              key={`key:${product.name}`}
              href="/cart"
              title={product.name}
            >
              <div className="flex justify-between items-center pt-1">
                <p className="quantityinCart text-[10px] sm:text-[12px] md:text-[14px]">
                  {`${product.quantity} ${
                    product.quantity > 1 ? 'items' : 'item'
                  }`}
                </p>
                <p className="priceInCart text-primary text-[10px] sm:text-[12px] md:text-[14px]">
                  {Utils.convertPrice(product.price)}
                </p>
              </div>
            </ListItem>
          ))
        ) : (
          <EmptyCart />
        )}
      </ul>
    </div>
  );
};

export default Cart;
