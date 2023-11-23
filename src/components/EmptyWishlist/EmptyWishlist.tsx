import React from 'react';
import { useRouter } from 'next/router';
import { Button } from '../ui/button';

const EmptyWishlist = () => {
  const router = useRouter();
  return (
    <div className="max-h-max flex flex-col gap-4 justify-center items-center pt-3 lg:pt-3">
      <img
        src="/empty-wishlist.png"
        alt="empty-wishlist"
        className="w-[200px]"
      />
      <div className="w-[250px] md:w-[400px] lg:w-[300px] flex flex-col gap-3 items-center justify-center">
        <p className="font-bold">{'Your wishlist is still empty'}</p>
        <p className="text-[14px] text-muted-foreground text-center">
          {
            'Fill it with your desired products and make your Wishlist come true!'
          }
        </p>
      </div>
      <Button onClick={() => router.push('/')}>{'Search for products'}</Button>
    </div>
  );
};

export default EmptyWishlist;
