import React, { useState } from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import ImageCarousel from '@/components/ImageCarousel/ImageCarousel';
import { Separator } from '@/components/ui/separator';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

const dummyArray: string[] = [
  '/banner-1.jpg',
  'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//92/MTA-5070654/dc_dc_trase_tx_m_shoe_adys300126-bgm_black-gum_full02_g0b376j9.jpg',
  'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//92/MTA-5070654/dc_dc_trase_tx_m_shoe_adys300126-bgm_black-gum_full02_g0b376j9.jpg',
  'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//92/MTA-5070654/dc_dc_trase_tx_m_shoe_adys300126-bgm_black-gum_full02_g0b376j9.jpg',
  'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//92/MTA-5070654/dc_dc_trase_tx_m_shoe_adys300126-bgm_black-gum_full02_g0b376j9.jpg',
  'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//92/MTA-5070654/dc_dc_trase_tx_m_shoe_adys300126-bgm_black-gum_full02_g0b376j9.jpg',
  'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//92/MTA-5070654/dc_dc_trase_tx_m_shoe_adys300126-bgm_black-gum_full02_g0b376j9.jpg',
  'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//92/MTA-5070654/dc_dc_trase_tx_m_shoe_adys300126-bgm_black-gum_full02_g0b376j9.jpg',
  'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//92/MTA-5070654/dc_dc_trase_tx_m_shoe_adys300126-bgm_black-gum_full02_g0b376j9.jpg',
  'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//92/MTA-5070654/dc_dc_trase_tx_m_shoe_adys300126-bgm_black-gum_full02_g0b376j9.jpg',
];

const colors: string[] = [
  'Black',
  'Black',
  'Black',
  'Black',
  'Black',
  'Black',
  'Black',
  'Black',
];

const sizes: string[] = ['S', 'M', 'XL'];

function ProductPage() {
  const [colorsIndex, setColorsIndex] = useState<number>(0);
  const [sizesIndex, setSizesIndex] = useState<number>(0);

  return (
    <div className="flex flex-col justify-center items-center w-full bg-white">
      <section className="w-full md:w-[75vw] pt-5 pb-16">
        <div className="w-full flex flex-col gap-6 lg:flex-row">
          <div className="w-full lg:w-1/3">
            <ImageCarousel imageArray={dummyArray} />
          </div>
          <div className="flex-1 px-2 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-semibold sm:text-xl lg:text-3xl">
                Tricot Warm-Up Jacket
              </h1>
              <div className="w-full flex justify-start items-center gap-2">
                <p className="text-base sm:text-lg lg:text-xl">
                  Sold: <span className="font-light">{`(${50})`}</span>
                </p>
                <div className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
                <div className="flex items-center">
                  <Star className="fill-yellow-300 text-yellow-300 aspect-square h-5 mb-[0.125rem] sm:h-6" />{' '}
                  <p className="text-base sm:text-lg lg:text-xl">
                    4.3 <span className="font-light">{`(${4} rating)`}</span>
                  </p>
                </div>
              </div>
              <div className="lg:mt-12">
                <p className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
                  Rp 1.199.000
                </p>
                <div className="flex items-center gap-2 mt-1 text-base sm:text-lg lg:text-xl">
                  <p className="px-1.5 py-0.5 bg-destructive text-white font-semibold rounded-md">{`%14`}</p>
                  <p className="text-gray-400 font-semibold line-through">
                    Rp 1.199.000
                  </p>
                </div>
              </div>
            </div>
            <Separator className="h-0.5 rounded-md" />
            <div>
              <div className="flex flex-col items-baseline">
                <p className="text-base font-semibold sm:text-lg lg:text-xl">
                  Color:{' '}
                  <span className="font-light">{colors[colorsIndex]}</span>
                </p>
                <ScrollArea className="max-w-full mt-2">
                  <div
                    className={`flex space-x-5 py-1 xl:grid xl:space-x-0 xl:grid-cols-5 xl:gap-3`}
                  >
                    {colors.map((color, index) => (
                      <button
                        key={index}
                        className={`min-w-fit flex items-center gap-1 p-0.5 rounded-md border-2 cursor-pointer group duration-300 hover:border-primary hover:opacity-100 hover:bg-[#FEF6F0] ${
                          colorsIndex === index
                            ? 'border-primary bg-[#FEF6F0]'
                            : 'border-gray-300 bg-transparent'
                        }`}
                        onClick={() => setColorsIndex(index)}
                      >
                        <Image
                          key={index}
                          src={
                            'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//92/MTA-5070654/dc_dc_trase_tx_m_shoe_adys300126-bgm_black-gum_full02_g0b376j9.jpg'
                          }
                          alt={`Product variant ${color}`}
                          width={40}
                          height={40}
                          style={{ objectFit: 'fill' }}
                          className="aspect-square"
                        />
                        <p
                          className={`duration-300 group-hover:text-primary ${
                            colorsIndex === index
                              ? 'text-primary'
                              : 'text-gray-500'
                          }`}
                        >
                          {color}
                        </p>
                      </button>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
              <div className="flex flex-col items-baseline mt-2">
                <p className="text-base font-semibold sm:text-lg lg:text-xl">
                  Size: <span className="font-light">{sizes[sizesIndex]}</span>
                </p>
                <ScrollArea className="max-w-full mt-2">
                  <div className="flex space-x-5 py-1">
                    {sizes.map((size, index) => (
                      <div
                        key={index}
                        className={`min-w-fit px-3 py-1 rounded-md border-2 cursor-pointer group duration-300 hover:border-primary hover:opacity-100 hover:bg-[#FEF6F0] hover:text-primary ${
                          sizesIndex === index
                            ? 'border-primary bg-[#FEF6F0] text-primary'
                            : 'border-gray-300 bg-transparent text-gray-500'
                        }`}
                        onClick={() => setSizesIndex(index)}
                      >
                        {size}
                      </div>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>
        <div className="px-2 w-full my-4">
          <Separator className="h-0.5 rounded-md" />
        </div>
        <div className="px-2 flex items-center gap-2 w-full sm:gap-5">
          <div className="rounded-full aspect-square relative w-1/5 overflow-hidden lg:w-2/12 xl:w-1/12 ">
            <Image
              src={'/banner-1.jpg'}
              alt="Shop's profile pict"
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <p className="font-normal text-lg sm:text-xl">
              Nanami Official Shop
            </p>
            <div className="flex items-center justify-start gap-2">
              <Button
                size="customBlank"
                className="text-base px-2 py-1 sm:text-lg"
              >
                Chat now
              </Button>
              <Button
                size="customBlank"
                className="text-base px-2 py-1 sm:text-lg"
              >
                View Shop
              </Button>
            </div>
          </div>
        </div>
        <div className="px-2 w-full my-4">
          <Separator className="h-0.5 rounded-md" />
        </div>
        
      </section>
    </div>
  );
}

export default ProductPage;
