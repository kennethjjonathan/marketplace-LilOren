import React from 'react';
import Image from 'next/image';
import ButtonWithIcon from '../ButtonWithIcon/ButtonWithIcon';
import EmptyCartImage from '../../../public/empty-cart.svg';
import { EMPTY_CART_TEXT } from './constants';
import styles from './EmptyCart.module.scss';

const EmptyCart = () => {
  return (
    <div className={styles.emptyCart}>
      <Image
        alt="empty-cart"
        src={EmptyCartImage}
        width={500}
        height={500}
        className="w-[100px] h-[100px]"
      />
      <p className={styles.EmptyCartText}>{EMPTY_CART_TEXT}</p>
      <ButtonWithIcon href={'/'}>{'Shop Now'}</ButtonWithIcon>
    </div>
  );
};

export default EmptyCart;
