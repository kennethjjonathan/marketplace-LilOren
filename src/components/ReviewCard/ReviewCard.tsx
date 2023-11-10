import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';

interface ReviewCardProps {
  profilePic: string;
  username: string;
  rating: number;
  date: string;
  comment?: string;
  productPics?: string[];
}

function ReviewCard({
  profilePic,
  username,
  rating,
  date,
  comment,
  productPics,
}: ReviewCardProps) {
  return (
    <div className="flex flex-col gap-2 w-full py-2 px-1">
      <div className="flex items-center gap-2">
        <div className="relative w-1/6 aspect-square rounded-full overflow-hidden sm:w-1/12">
          <Image
            src={profilePic}
            alt="User's profile picture"
            fill
            style={{ objectFit: 'fill' }}
            sizes="(max-width: 768px) 30vw, 10vw"
          />
        </div>
        <div className="flex flex-col flex-1 gap-0.5">
          <p className="text-sm font-semibold 2xl:text-base">{username}</p>
          <div className="flex items-center">
            {[...Array(rating)].map((e, index) => (
              <Star
                key={index}
                className="fill-yellow-300 text-yellow-300 aspect-square h-3 -ml-1.5 -mr-0.5 2xl:h-4"
              />
            ))}
          </div>
          <p className="text-gray-400 text-xs 2xl:text-sm">{date}</p>
        </div>
      </div>
      {comment && (
        <p className="w-full text-justify text-sm 2xl:text-base">{comment}</p>
      )}
      {productPics && (
        <div className="w-full flex items-center flex-wrap justify-start gap-2">
          {productPics.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-md overflow-hidden w-1/12"
            >
              <Image
                src={image}
                alt={`Product's image ${index}`}
                fill
                sizes="(max-width: 768px) 15vw, 10vw"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReviewCard;
