import { ITopCategory } from '@/store/home/useHome';
import React from 'react';
import HomeCategoryItem from '../HomeCategoryItem/HomeCategoryItem';
import styles from './HomeCategoryList.module.scss';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';

type Props = {
  categories: ITopCategory[];
};

const HomeCategoryList: React.FC<Props> = ({ categories }) => {
  return (
    <div className={styles.brand__grid}>
      <div className={styles.brand_grid_header}>
        <p className="text-primary text-[14px] px-[10px] md:text-[16px]">
          CATEGORY
        </p>
      </div>
      <ScrollArea className="max-w-full">
        <div className="flex space-x-5 p-2">
          {categories.map((category) => (
            <HomeCategoryItem
              key={`key:${category.category_name}`}
              image={category.image_url}
              title={category.category_name}
              href={category.category_name}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default HomeCategoryList;
