import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
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
import { IProductReview } from '@/interface/productPage';
import PaginationNav from '../PaginationNav/PaginationNav';

interface ReviewComponentProps {
  product_code: string;
  rating: number;
  totalRating: number;
  setTotalRating: Dispatch<SetStateAction<number>>;
}

const ReviewComponent = ({
  product_code,
  rating,
  totalRating,
  setTotalRating,
}: ReviewComponentProps) => {
  const [reviews, setReviews] = useState<IProductReview[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  async function getReviews() {
    const params = new URLSearchParams();
    params.set('page', currentPage.toString());
    try {
      const response = await axiosInstance(
        `/reviews/${product_code}?${params.toString()}`,
      );
      setTotalRating(response.data.data.total_review);
      setTotalPage(response.data.data.total_page);
      console.log(response);
      setReviews(response.data.data.user_reviews);
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
              {rating}
              <span className="ml-1 font-extralight text-base text-gray-500 lg:text-xl">{`/5`}</span>
            </p>
          </div>
          <p className="text-gray-500 text-base w-full text-center lg:text-lg">{`${totalRating} review${
            totalRating > 1 ? 's' : ''
          }`}</p>
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
        <div className="w-full space-y-2">
          <div className="flex flex-col w-full mt-2 divide-y-2 lg:mt-0">
            {reviews.map((review, index) => (
              <ReviewCard review={review} key={index} />
            ))}
          </div>
          <div className="w-full flex justify-center items-center">
            <PaginationNav
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPage={totalPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewComponent;
