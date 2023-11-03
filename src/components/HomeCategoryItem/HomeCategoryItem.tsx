import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './HomeCategoryItem.module.scss';

interface HomeCategoryItemProps {
  image: string;
  title: string;
  href: string;
}

const HomeCategoryItem = ({ image, title, href }: HomeCategoryItemProps) => {
  return (
    <Link href={href} className={styles.lilOren__home__category}>
      <div className={styles.lilOren__home__category__item}>
        <Image
          alt={'category-item'}
          width={75}
          height={75}
          src={image}
          className={styles.lilOren__home__category__item__img}
        />
        <div className={styles.lilOren__home__category__item__title}>
          {title}
        </div>
      </div>
    </Link>
  );
};

export default HomeCategoryItem;
