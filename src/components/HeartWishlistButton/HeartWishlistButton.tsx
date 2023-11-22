import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/store/wishlist/useWishlist';

interface HeartWishlistButtonProps {
  product_code: string;
  is_in_wishlist: boolean;
}

const HeartWishlistButton = ({
  product_code,
  is_in_wishlist,
}: HeartWishlistButtonProps) => {
  const fetchUserWishlist = useWishlist.use.fetchUserWishlist();
  const handleRemoveFromWishlist = () => {};

  const handleAddToWishlist = () => {};

  return is_in_wishlist ? (
    <Button
      variant={'secondary'}
      className="absolute bg-white rounded-full top-1 right-1 border-[1px] border-accent p-2 hover:bg-accent"
    >
      <Heart color="#ff006f" fill="#ff006f" />
    </Button>
  ) : (
    <Button
      variant={'secondary'}
      className="absolute bg-white rounded-full top-1 right-1 border-[1px] border-accent p-2 hover:bg-accent"
    >
      <Heart color="lightgray" />
    </Button>
  );
};

export default HeartWishlistButton;
