import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface PromotionCarouselProps {
  imageArray?: string[];
  autoSlide?: boolean;
  slideInterval?: number;
}

function PromotionCarousel({
  imageArray = ['/banner-1.jpg', '/banner-1.jpg', '/banner-1.jpg'],
  autoSlide = false,
  slideInterval = 4000,
}: PromotionCarouselProps) {
  const [current, setCurrent] = useState<number>(0);

  const goToPrev = () => {
    setCurrent((current) =>
      current === 0 ? imageArray.length - 1 : current - 1,
    );
  };

  const goToNext = () => {
    setCurrent((current) =>
      current === imageArray.length - 1 ? 0 : current + 1,
    );
  };

  // useEffect(() => {
  //   if (!autoSlide) return;
  //   const slide = setTimeout(goToNext, slideInterval);
  //   return () => clearTimeout(slide);
  // }, [current]);

  return (
    <div className="w-full flex overflow-x-auto relative">
      {imageArray.map((image, index) => (
        <div
          key={index}
          className="min-w-full h-96 transition-transform linear duration-300 relative"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          <Image
            src={image}
            alt={`promotion ${index + 1}`}
            height={500}
            width={500}
            style={{ objectFit: 'cover' }}
          />
        </div>
      ))}
    </div>
  );
}

export default PromotionCarousel;
