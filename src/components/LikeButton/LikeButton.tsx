import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface LikeButtonProps {
  isLiked: boolean;
  setIsLiked: Dispatch<SetStateAction<boolean>>;
  likedAmount?: number;
}

const LikeButton = ({
  isLiked = false,
  setIsLiked,
  likedAmount,
}: LikeButtonProps) => {
  return (
    <button className={`flex items-center gap-1`}>
      <Heart />
    </button>
  );
};

export default LikeButton;
