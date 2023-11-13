import { create } from 'zustand';
import { ICart, ICartPrice } from '@/pages/user/cart';
import { ICartCheckedRequest } from '@/service/cart/CartService';
import { createZusSelector } from '../useSelector';
import { CartClient } from '@/service/cart/CartClient';

export interface ICheckedCart {
  cart_id: number;
  is_checked: boolean;
}

type State = {
  totalCartPrice: number;
  cartItems: ICart;
  loadingFetchCart: boolean;
  is_checked_carts: ICheckedCart[];
  prices: ICartPrice;
};

type Actions = {
  fetchCart: () => void;
  setCartItems: (cartItems: ICart) => void;
  setCheckedCart: (data: ICheckedCart[]) => void;
  putIsCheckedCart: (data: ICartCheckedRequest) => void;
};

const useCartBase = create<State & Actions>((set) => ({
  totalCartPrice: 0,
  cartItems: {
    items: [
      {
        seller_name: 'Hyouka',
        seller_id: 1,
        products: [
          {
            cart_id: 1,
            product_name:
              'Apple iPhone 15 Garansi Resmi - 128GB 256GB 512GB - Black+Proteksi, 256GB',
            product_id: 1,
            image_url:
              'https://images.tokopedia.net/img/cache/100-square/VqbcmM/2023/10/16/9a895898-56d6-4430-b338-bbd43107f091.png.webp?ect=4g',
            base_price: 22499000,
            discount_price: 18576000,
            discount: 17,
            quantity: 5,
            remaining_quantity: 10,
            variant1_name: 'Black+Proteksi, 256GB',
            variant2_name: '',
            is_checked: true,
          },
          {
            cart_id: 2,
            product_name:
              'Apple iPhone 15 Garansi Resmi - 128GB 256GB 512GB - Black+Proteksi, 256GB',
            product_id: 1,
            image_url:
              'https://images.tokopedia.net/img/cache/100-square/VqbcmM/2023/10/16/9a895898-56d6-4430-b338-bbd43107f091.png.webp?ect=4g',
            base_price: 100000,
            discount_price: 95000,
            discount: 5,
            quantity: 5,
            remaining_quantity: 100,
            variant1_name: 'Black+Proteksi, 256GB',
            variant2_name: '',
            is_checked: false,
          },
        ],
      },
      {
        seller_name: 'Health Media',
        seller_id: 2,
        products: [
          {
            cart_id: 3,
            product_name: 'Blackmores Bio Zinc 168 tablets',
            product_id: 1,
            image_url:
              'https://images.tokopedia.net/img/cache/900/VqbcmM/2021/3/21/19e19780-4bf2-46b7-bbc7-8ebf4652e0ee.jpg',
            base_price: 283000,
            discount_price: 218000,
            discount: 23,
            quantity: 5,
            remaining_quantity: 100,
            variant1_name: '',
            variant2_name: '',
            is_checked: false,
          },
        ],
      },
    ],
    prices: {
      total_base_price: 2500000,
      total_discount_price: 25000,
      total_price: 2475000,
    },
  },
  loadingFetchCart: false,
  is_checked_carts: [],
  prices: {
    total_base_price: 0,
    total_discount_price: 0,
    total_price: 0,
  },
  fetchCart: async () => {
    set(() => ({ loadingFetchCart: true }));
    const response = await CartClient.getListofCartItem();
    const data = response.data;
    // set((state) => ({
    //   cartItems: data,
    // }));
    // set((state) => ({
    //   prices: data.prices,
    // }));
    set(() => ({ loadingFetchCart: false }));
  },
  setCartItems: (cartItems: ICart) => {
    set((state) => ({
      cartItems: cartItems,
    }));
  },
  setCheckedCart: (data: ICheckedCart[]) => {
    set((state) => ({
      is_checked_carts: data,
    }));
  },
  putIsCheckedCart: async (data: ICartCheckedRequest) => {
    const response = await CartClient.updateIsChecked(data);
    set((state) => ({
      prices: response.data.data,
    }));
  },
}));

export const useCart = createZusSelector(useCartBase);
