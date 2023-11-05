import React, { useState } from 'react';
import Image from 'next/image';
import {
  Star,
  MessageCircle,
  Calendar,
  FileImage,
  ShoppingCart,
} from 'lucide-react';
import ImageCarousel from '@/components/ImageCarousel/ImageCarousel';
import { Separator } from '@/components/ui/separator';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ReviewCard from '@/components/ReviewCard/ReviewCard';
import QuantityController from '@/components/QuantityController/QuantityController';

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
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full bg-white roboto-text">
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
                          className={`min-w-fit flex items-center gap-1 p-0.5 rounded-md border-2 cursor-pointer group duration-300 lg:hover:border-primary lg:hover:opacity-100 lg:hover:bg-[#FEF6F0] ${
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
                            className={`duration-300 lg:group-hover:text-primary ${
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
                    Size:{' '}
                    <span className="font-light">{sizes[sizesIndex]}</span>
                  </p>
                  <ScrollArea className="max-w-full mt-2">
                    <div className="flex space-x-5 py-1">
                      {sizes.map((size, index) => (
                        <div
                          key={index}
                          className={`min-w-fit px-3 py-1 rounded-md border-2 cursor-pointer group duration-300 lg:hover:border-primary lg:hover:opacity-100 lg:hover:bg-[#FEF6F0] lg:hover:text-primary ${
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
          <div className="w-full px-2">
            <h3 className="font-semibold text-xl md:text-2xl">Description</h3>
            <p className="w-full mt-3 text-justify md:text-lg">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. A
              facilis ea quidem. Error dolore laudantium, quibusdam sapiente
              totam tenetur tempore ex quaerat id sunt pariatur qui dolorem?
              Cupiditate, aliquam illum. Lorem ipsum dolor sit, amet consectetur
              adipisicing elit. A facilis ea quidem. Error dolore laudantium,
              quibusdam sapiente totam tenetur tempore ex quaerat id sunt
              pariatur qui dolorem? Cupiditate, aliquam illum.
            </p>
          </div>
          <div className="px-2 w-full my-4">
            <Separator className="h-0.5 rounded-md" />
          </div>
          <div className="w-full px-2">
            <h3 className="font-semibold text-xl md:text-2xl">Review</h3>
            <div className="flex flex-col w-full mt-3 lg:flex-row lg:gap-5">
              <div className="w-full flex flex-col lg:w-1/3">
                <div className="flex items-center gap-1 w-full justify-center">
                  <Star className="fill-yellow-300 text-yellow-300 aspect-square h-10 mb-[0.125rem]" />{' '}
                  <p className="text-4xl font-bold lg:text-5xl">
                    4
                    <span className="ml-1 font-extralight text-base text-gray-500 lg:text-xl">{`/5`}</span>
                  </p>
                </div>
                <p className="text-gray-500 text-base w-full text-center lg:text-lg">{`${31} reviews`}</p>
                <p className="font-semibold text-base lg:mt-3">Filter:</p>
                <div className="mt-2 lg:mt-1 max-w-full py-1 grid gap-3 grid-cols-2 lg:grid-cols-1 lg:px-1">
                  <Select>
                    <SelectTrigger className="min-w-fit">
                      <SelectValue
                        placeholder="By star"
                        className="text-sm xl:text-base"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>By Star</SelectLabel>
                        <SelectItem
                          value="all"
                          className="text-sm xl:text-base"
                        >
                          <div className="flex items-center text-sm xl:text-base">
                            <Star className="fill-yellow-300 text-yellow-300 aspect-square h-5 mb-[0.125rem]" />
                            All
                          </div>
                        </SelectItem>
                        <SelectItem value="5">
                          <div className="flex items-center text-sm xl:text-base">
                            <Star className="fill-yellow-300 text-yellow-300 aspect-square h-5 mb-[0.125rem]" />
                            5
                          </div>
                        </SelectItem>
                        <SelectItem value="4">
                          <div className="flex items-center text-sm xl:text-base">
                            <Star className="fill-yellow-300 text-yellow-300 aspect-square h-5 mb-[0.125rem]" />
                            4
                          </div>
                        </SelectItem>
                        <SelectItem value="3">
                          <div className="flex items-center text-sm xl:text-base">
                            <Star className="fill-yellow-300 text-yellow-300 aspect-square h-5 mb-[0.125rem]" />
                            3
                          </div>
                        </SelectItem>
                        <SelectItem value="2">
                          <div className="flex items-center text-sm xl:text-base">
                            <Star className="fill-yellow-300 text-yellow-300 aspect-square h-5 mb-[0.125rem]" />
                            2
                          </div>
                        </SelectItem>
                        <SelectItem value="1">
                          <div className="flex items-center text-sm xl:text-base">
                            <Star className="fill-yellow-300 text-yellow-300 aspect-square h-5 mb-[0.125rem]" />
                            1
                          </div>
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="min-w-fit">
                      <SelectValue placeholder="By comment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel className="text-sm xl:text-base">
                          By comment
                        </SelectLabel>
                        <SelectItem
                          value="all"
                          className="text-sm xl:text-base"
                        >
                          All
                        </SelectItem>
                        <SelectItem
                          value="comment"
                          className="text-sm xl:text-base"
                        >
                          With comment
                        </SelectItem>
                        <SelectItem
                          value="no-comment"
                          className="text-sm xl:text-base"
                        >
                          Without comment
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="min-w-fit">
                      <SelectValue placeholder="By picture" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel className="text-sm xl:text-base">
                          By picture
                        </SelectLabel>
                        <SelectItem
                          value="all"
                          className="text-sm xl:text-base"
                        >
                          All
                        </SelectItem>
                        <SelectItem
                          value="comment"
                          className="text-sm xl:text-base"
                        >
                          With image
                        </SelectItem>
                        <SelectItem
                          value="no-comment"
                          className="text-sm xl:text-base"
                        >
                          Without comment
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="min-w-fit">
                      <SelectValue placeholder="By date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel className="text-sm xl:text-base">
                          By date
                        </SelectLabel>
                        <SelectItem
                          value="latest"
                          className="text-sm xl:text-base"
                        >
                          Latest
                        </SelectItem>
                        <SelectItem
                          value="oldest"
                          className="text-sm xl:text-base"
                        >
                          Oldest
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-col w-full mt-2 divide-y-2 lg:mt-0">
                <ReviewCard
                  profilePic="/banner-1.jpg"
                  username="Kenneth12"
                  rating={4}
                  date={'2023-09-23 20:41'}
                  comment="Kwalitas produk tidak diragukan lagi, packing luar biasa Aman, dilindungi dengan bubble wrap berlapis, Great services !!"
                  productPics={[
                    '/banner-1.jpg',
                    'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//92/MTA-5070654/dc_dc_trase_tx_m_shoe_adys300126-bgm_black-gum_full02_g0b376j9.jpg',
                    'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//92/MTA-5070654/dc_dc_trase_tx_m_shoe_adys300126-bgm_black-gum_full02_g0b376j9.jpg',
                  ]}
                />
                <ReviewCard
                  profilePic="/banner-1.jpg"
                  username="Kenneth12"
                  rating={4}
                  date={'2023-09-23 20:41'}
                  comment="Kwalitas produk tidak diragukan lagi, packing luar biasa Aman, dilindungi dengan bubble wrap berlapis, Great services !!"
                  productPics={[
                    'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//92/MTA-5070654/dc_dc_trase_tx_m_shoe_adys300126-bgm_black-gum_full02_g0b376j9.jpg',
                    'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//92/MTA-5070654/dc_dc_trase_tx_m_shoe_adys300126-bgm_black-gum_full02_g0b376j9.jpg',
                    'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//92/MTA-5070654/dc_dc_trase_tx_m_shoe_adys300126-bgm_black-gum_full02_g0b376j9.jpg',
                  ]}
                />
                <ReviewCard
                  profilePic="/banner-1.jpg"
                  username="Kenneth12"
                  rating={4}
                  date={'2023-09-23 20:41'}
                  comment="Kwalitas produk tidak diragukan lagi, packing luar biasa Aman, dilindungi dengan bubble wrap berlapis, Great services !!"
                  productPics={[
                    'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//92/MTA-5070654/dc_dc_trase_tx_m_shoe_adys300126-bgm_black-gum_full02_g0b376j9.jpg',
                    'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//92/MTA-5070654/dc_dc_trase_tx_m_shoe_adys300126-bgm_black-gum_full02_g0b376j9.jpg',
                    'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//92/MTA-5070654/dc_dc_trase_tx_m_shoe_adys300126-bgm_black-gum_full02_g0b376j9.jpg',
                  ]}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="bg-primary-foreground w-full fixed z-30 bottom-0 left-0 flex justify-center">
        <div className="w-full md:w-[75vw] p-2 pb-3 flex items-center gap-2 lg:justify-between">
          <div className="hidden lg:flex flex-col items-start min-w-fit justify-center min-h-fit w-1/5">
            <p className="text-gray-500 text-sm">Total Price</p>
            <p className="font-semibold text-2xl">Rp 1.199.000</p>
          </div>
          <div className="w-full lg:w-3/5 flex items-center gap-2">
            <QuantityController
              inputValue={quantity}
              setInputValue={setQuantity}
              maximum={5}
            />
            <Button
              variant={'tertiary'}
              size={'customBlank'}
              className="px-1 py-2 w-full"
            >
              <ShoppingCart className="aspect-square w-5 lg:w-6" />
              <p className="ml-1 text-base lg:text-lg">Add to Cart</p>
            </Button>
            <Button
              variant={'default'}
              size={'customBlank'}
              className="px-1 py-2 w-full h-full text-base lg:text-lg"
            >
              Buy now
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
