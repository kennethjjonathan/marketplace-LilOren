import { ITopCategory } from '@/store/home/useHome';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import HomeCategoryItem from '../HomeCategoryItem/HomeCategoryItem';
import styles from './HomeCategoryList.module.scss';

type Props = {
  categories: ITopCategory[];
};

const HomeCategoryList: React.FC<Props> = ({ categories }) => {
  return (
    <div className={styles.brand__grid}>
      <div className={styles.brand_grid_header}>
        <span className="brand-grid-header__title typo-r12 uppercase flex-1">
          <span className="text-primary">
            <div className="text-[14px] px-[10px] md:text-[16px]">
              {'CATEGORY'}
            </div>
          </span>
        </span>
        <Link
          href={'/'}
          className="justify-end items-center flex flex-row w-full text-muted-foreground text-[12px] md:hidden"
        >
          {'See More'} <ChevronRight size={20} />
        </Link>
      </div>
      <div className="border-2 grid-list-wrapper grid h-fit border-b-[1px] border-t-[1px]">
        <div className="grid-list hide-scrollbar h-[290px] p-0 w-[100%] flex flex-col flex-wrap overflow-x-scroll overflow-y-hidden scrolling-touch ">
          {categories.map((category) => (
            <div
              key={`key:${category.category_name}`}
              className="border-b-[1px] border-r-[1px] border-input h-[137px] flex flex-col justify-center items-center"
            >
              <HomeCategoryItem
                image={category.image_url}
                title={category.category_name}
                href={category.category_name}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeCategoryList;
