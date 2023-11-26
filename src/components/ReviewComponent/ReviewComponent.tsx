import React, { useEffect } from 'react';
import { Star } from 'lucide-react';
import ReviewCard from '../ReviewCard/ReviewCard';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import axiosInstance from '@/lib/axiosInstance';

interface ReviewComponentProps {
  product_code: string;
}

const ReviewComponent = ({ product_code }: ReviewComponentProps) => {
  async function getReviews() {
    const params = new URLSearchParams();
    params.set('page', '1');
    try {
      const response = await axiosInstance(
        `/reviews/${product_code}?${params.toString()}`,
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getReviews();
  }, []);
  return (
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
                  <SelectItem value="all" className="text-sm xl:text-base">
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
                  <SelectItem value="all" className="text-sm xl:text-base">
                    All
                  </SelectItem>
                  <SelectItem value="comment" className="text-sm xl:text-base">
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
                  <SelectItem value="all" className="text-sm xl:text-base">
                    All
                  </SelectItem>
                  <SelectItem value="comment" className="text-sm xl:text-base">
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
                  <SelectItem value="latest" className="text-sm xl:text-base">
                    Latest
                  </SelectItem>
                  <SelectItem value="oldest" className="text-sm xl:text-base">
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
  );
};

export default ReviewComponent;
