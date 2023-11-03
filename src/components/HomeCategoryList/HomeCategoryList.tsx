import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import styles from './HomeCategoryList.module.scss';
import CONSTANTS from '@/constants/constants';
import HomeCategoryItem from '../HomeCategoryItem/HomeCategoryItem';

const HomeCategoryList = () => {
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
      <div className="grid-list-wrapper overflow-auto h-fit border-b-[1px] border-t-[1px]">
        <div className="grid-list hide-scrollbar h-[274px] p-0 w-[100%] flex flex-col flex-wrap overflow-x-scroll overflow-y-hidden scrolling-touch ">
          {CONSTANTS.CATEGORY_LIST.map((category) => (
            <div
              key={`key:${category.title}`}
              className="border-b-[1px] border-r-[1px] border-input h-[137px] flex flex-col justify-center items-center"
            >
              <HomeCategoryItem
                image={category.image}
                title={category.title}
                href={category.href}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeCategoryList;
