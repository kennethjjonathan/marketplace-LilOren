import React, { useEffect, useState } from 'react';
import { IProduct } from '@/interface/product';
import { Checkbox } from '@/components/ui/checkbox';
import Divider from '@/components/Divider/Divider';
import CartCardProduct from '@/components/CartCardProduct/CartCardProduct';
import { useCart } from '@/store/cart/useCart';

interface CartCardProps {
  shop: string;
  shop_items: IProduct[];
  indexData: number;
}

const CartCard = ({ shop, shop_items, indexData }: CartCardProps) => {
  const [isShopCheck, setIsShopCheck] = useState(false);
  const fetchCart = useCart.use.fetchCart();
  const cartItems = useCart.use.cartItems();
  const setCart = useCart.use.setCartItems();
  const checkIsShopCheckOrNot = () => {
    const isCheck = shop_items.every((item) => item.is_checked === true);
    setIsShopCheck(isCheck);
  };

  const handleCheckBySeller = () => {
    const updatedCartItems = [...cartItems];
    const idx = updatedCartItems.findIndex(
      (shop_in_cart) => shop_in_cart.seller_name === shop,
    );
    const products = updatedCartItems[idx].products;
    products.forEach((product, index) => {
      const updatedProduct = product;
      updatedProduct.is_checked = true;
      updatedCartItems[idx].products[index] = updatedProduct;
    });
    setIsShopCheck(true);
    setCart(updatedCartItems);
    console.log(isShopCheck);
    return true;
  };

  const handleUnCheckBySeller = () => {
    const updatedCartItems = [...cartItems];
    const idx = updatedCartItems.findIndex(
      (shop_in_cart) => shop_in_cart.seller_name === shop,
    );
    const products = updatedCartItems[idx].products;
    products.forEach((product, index) => {
      const updatedProduct = product;
      updatedProduct.is_checked = false;
      updatedCartItems[idx].products[index] = updatedProduct;
    });
    setIsShopCheck(false);
    console.log(isShopCheck);
    setCart(updatedCartItems);
    return false;
  };

  useEffect(() => {
    fetchCart();
    checkIsShopCheckOrNot();
  }, []);

  return (
    <div className="flex flex-col w-full border-[1px] border-gray-100">
      <div className="flex items-center gap-2 p-2  border-gray-200 w-full">
        <Checkbox
          checked={isShopCheck}
          onCheckedChange={(checked) => {
            console.log(checked);
            return checked ? handleUnCheckBySeller() : handleCheckBySeller();
          }}
          id={`check-${shop}`}
          className="w-5 h-5"
        />
        <p className="font-semibold text-sm md:text-base line-clamp-1 overflow-hidden whitespace-nowrap text-elipsis">
          {shop}
        </p>
      </div>
      <div className="w-full flex flex-col gap-2 p-2">
        {shop_items.map((items, index) => (
          <CartCardProduct
            key={`key-${items.product_name} ${index.toString()}`}
            product={items}
            index={indexData}
          />
        ))}
      </div>
      <Divider />
    </div>
  );
};

export default CartCard;
