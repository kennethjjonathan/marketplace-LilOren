import React, { useState } from 'react';
import Image from 'next/image';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
// import required modules
import { Pagination, Navigation, FreeMode, Thumbs } from 'swiper/modules';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface ImageCarouselProps {
  imageArray: string[];
}

function ImageCarousel({ imageArray }: ImageCarouselProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  return (
    <div className="w-full">
      {/* <div className={style.swipeContainer}>
        {imageArray.map((image, index) => (
          <div key={index} className={style.swipeAble}>
            <Image
              src={image}
              alt={`Product's view ${index + 1}`}
              height={500}
              width={500}
              style={{ objectFit: 'fill' }}
              className="w-full"
            />
          </div>
        ))}
      </div> */}
      <div>
        <Swiper
          slidesPerView={1}
          loop={true}
          pagination={{
            type: 'fraction',
          }}
          modules={[Pagination, Navigation]}
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
      <div>
        <Image
          src={imageArray[currentIndex]}
          alt={`Product view ${currentIndex + 1}`}
          height={500}
          width={500}
          style={{ objectFit: 'cover' }}
          className="w-full h-96"
        />
        <div>
          <ScrollArea className="max-w-full rounded-md">
            <div className="flex space-x-4 p-1">
              {imageArray.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`Product view ${index + 1}`}
                  width={200}
                  height={200}
                  className={`border-2 border-transparent cursor-pointer duration-300 hover:opacity-100 ${
                    currentIndex === index
                      ? 'opacity-100 border-black'
                      : 'opacity-50'
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
