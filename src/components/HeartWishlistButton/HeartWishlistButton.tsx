import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/store/wishlist/useWishlist';
import { WishlistClient } from '@/service/wishlist/wishlistClient';
import { Utils } from '@/utils';
import { ToastContent } from 'react-toastify';

interface HeartWishlistButtonProps {
  product_code: string;
  is_in_wishlist: boolean;
  wishlist_id: number;
  current_page: number;
}

const HeartWishlistButton = ({
  product_code,
  is_in_wishlist,
  wishlist_id,
  current_page,
}: HeartWishlistButtonProps) => {
  const fetchUserWishlist = useWishlist.use.fetchUserWishlist();
  const handleRemoveFromWishlist = async () => {
    const response = await WishlistClient.removeFromWishlist(wishlist_id);
    if (response?.error) {
      Utils.notify(response?.message as ToastContent, 'error', 'light');
    } else {
      Utils.notify(response?.message as ToastContent, 'success', 'light');
    }
    fetchUserWishlist({ page: current_page });
  };

  const handleAddToWishlist = async () => {
    const response = await WishlistClient.addToWishlist({
      product_code: product_code,
    });
    if (response?.error) {
      Utils.notify(response?.message as ToastContent, 'error', 'light');
    } else {
      Utils.notify(response?.message as ToastContent, 'success', 'light');
    }
    fetchUserWishlist({ page: current_page });
  };

  return is_in_wishlist ? (
    <Button
      onClick={() => handleRemoveFromWishlist()}
      variant={'secondary'}
      className="absolute bg-white rounded-full top-1 right-1 border-[1px] border-accent p-2 hover:bg-accent"
    >
      <Heart color="#ff006f" fill="#ff006f" />
    </Button>
  ) : (
    <Button
      onClick={() => handleAddToWishlist()}
      variant={'secondary'}
      className="absolute bg-white rounded-full top-1 right-1 border-[1px] border-accent p-2 hover:bg-accent"
    >
      <Heart color="lightgray" />
    </Button>
  );
};

export default HeartWishlistButton;
