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
      <Image
        alt={title}
        width={200}
        height={200}
        style={{ objectFit: 'cover' }}
        src={image}
        className={styles.lilOren__home__category__item__img}
      />
      <p className={styles.lilOren__home__category__item__title}>{title}</p>
    </Link>
  );
};

export default HomeCategoryItem;
