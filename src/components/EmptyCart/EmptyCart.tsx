import React from 'react';
import Image from 'next/image';
import ButtonWithIcon from '../ButtonWithIcon/ButtonWithIcon';
import EmptyCartImage from '../../../public/empty-cart.svg';
import { EMPTY_CART_TEXT } from './constants';
import styles from './EmptyCart.module.scss';
import { className } from '../../../node_modules/@sinonjs/commons/types/index.d';

const EmptyCart = () => {
  return (
    <div className={styles.emptyCart}>
      <Image
        alt="empty-cart"
        src={EmptyCartImage}
        width={500}
        height={500}
        className="w-[50px] h-[50px] sm:w-[70px] sm:h-[70px]"
      />
      <p className={styles.EmptyCartText}>{EMPTY_CART_TEXT}</p>
      <ButtonWithIcon href={'/'}>{'Shop Now'}</ButtonWithIcon>
    </div>
  );
};

export default EmptyCart;
