import React, { useState, useEffect } from 'react';

interface PromotionCarouselProps {
  imageArray: string[];
  autoSlide?: boolean;
  slideInterval?: number;
}

function PromotionCarousel({
  imageArray = [],
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

  useEffect(() => {
    if (!autoSlide) return;
    const slide = setTimeout(goToNext, slideInterval);
    return () => clearTimeout(slide);
  }, [current]);

  return (
    <div className="w-full flex overflow-hidden relative">
      {imageArray.map((image, index) => (
        <div
          key={index}
          className="min-w-full min-h-full transition-transform linear duration-300"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >

        </div>
      ))}
    </div>
  );
}

export default PromotionCarousel;
