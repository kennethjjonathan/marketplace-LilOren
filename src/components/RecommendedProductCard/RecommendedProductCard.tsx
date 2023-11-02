import { Utils } from '@/utils';
import Image from 'next/image';
import React from 'react';
import styles from './RecommendedProductCard.module.scss';

interface RecommendedProductCardProps {
  name: string;
  image: string;
  price: number;
  discount?: number;
  totalSold?: number;
}

const RecommendedProductCard = ({
  name,
  image,
  price,
  discount,
  totalSold,
}: RecommendedProductCardProps) => {
  const handleDirectToDetailPage = () => {
    console.log('direct to product page');
  };
  return (
    <div className="p-1">
      <div
        className={styles.recommended__product__wrapper}
        onClick={() => handleDirectToDetailPage()}
      >
        <div className={styles.lilOren__recommended__img}>
          <Image
            src={image}
            alt={name}
            width={500}
            height={500}
            className="bg-cover"
          />
          {discount && (
            <div className={styles.lilOren_itemcard__discount_tag_container}>
              <span aria-label="promotion"></span>
              <span className={styles.lilOren_itemcard__discount_tag_off}>
                {`-${discount}%`}
              </span>
            </div>
          )}
        </div>
        <div className={styles.lilOren_itemcard__info}>
          <div className="mb-2 last:mb-0 min-h-[27px]">
            <div className={styles.lilOren_itemcard__name_container}>
              {name}
            </div>
          </div>
          <div className="mb-2 last:mb-0 min-h-[15px]">
            <div className={styles.lilOren_itemcard__promotion_label_container}></div>
          </div>
          <div className="mb-2 last:mb-0 min-h-[20px]">
            <div className="flex items-center justify-between w-full">
              <div className="flex-shrink max-w-[272px] box-border flex-grow">
                <div className={styles.lilOren_itemcard__currentPrice}>
                  <span aria-label="currentprice"></span>
                  <span className="text-xs leading-[0.875rem] align-middle ">
                    {'Rp'}
                  </span>
                  <span className="text-base align-middle leading-5 break-words overflow-hidden whitespace-nowrap text-ellipsis">
                    {Utils.convertPrice(price).slice(3)}
                  </span>
                </div>
              </div>
              {totalSold && (
                <div className="flex-shrink min-w-[0px] box-border flex-grow overflow-hidden">
                  <span className={styles.lilOren_itemcard__sold_count}>
                    {`${totalSold} sold`}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedProductCard;
