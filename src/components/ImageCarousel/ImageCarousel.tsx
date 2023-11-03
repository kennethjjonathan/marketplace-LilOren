import React, { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface ImageCarouselProps {
  imageArray: string[];
}

function ImageCarousel({ imageArray }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  return (
    <div className="w-full">
      <div className="lg:hidden">
        <Swiper
          slidesPerView={1}
          loop={true}
          pagination={{
            type: 'fraction',
          }}
          modules={[Pagination]}
        >
          {imageArray.map((image, index) => (
            <SwiperSlide key={index}>
              <Image
                src={image}
                alt={`Product's view ${index + 1}`}
                height={500}
                width={500}
                style={{ objectFit: 'cover' }}
                className="w-full h-96"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="hidden lg:flex flex-col gap-9">
        <Image
          src={imageArray[currentIndex]}
          alt={`Product view ${currentIndex + 1}`}
          height={500}
          width={500}
          style={{ objectFit: 'cover' }}
          className="w-full aspect-[3/4]"
        />
        <div>
          <ScrollArea className="max-w-full rounded-md">
            <div className="flex space-x-5 py-1">
              {imageArray.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`Product view ${index + 1}`}
                  width={80}
                  height={80}
                  className={`aspect-square border-2 cursor-pointer duration-300 hover:opacity-100 hover:border-primary rounded-xl ${
                    currentIndex === index
                      ? 'opacity-100 border-primary'
                      : 'opacity-50 border-transparent'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

export default ImageCarousel;
