import { create } from 'zustand';
import { ICartItem } from '@/pages/user/cart';
import { CartClient } from '@/service/cart/CartClient';
import { createZusSelector } from '../useSelector';

type State = {
  totalCartPrice: number;
  cartItems: ICartItem[];
  loadingFetchCart: boolean;
};

type Actions = {
  fetchCart: () => void;
  incrementTotalCartPrice: (price: number, quantity: number) => void;
  decrementTotalCartPrice: (price: number, quantity: number) => void;
};

const useCartBase = create<State & Actions>((set) => ({
  totalCartPrice: 0,
  cartItems: [
    {
      seller_name: 'Erigo Store',
      seller_id: 1,

      products: [
        {
          cart_id: 1,
          product_name:
            'Jacquelle Magic Wash - Makeup Remover Pembersih Wajah - PINK',
          product_id: 23,
          base_price: 30000,
          discount_price: 10000,
          discount: 40,
          quantity: 2,
          remaining_quantity: 3,
          variant1_name: 'black',
          variant2_name: '16 GB',
          image_url:
            'https://images.tokopedia.net/img/cache/100-square/VqbcmM/2021/7/27/5b3236fd-45aa-42c0-85d7-477dc0abfa8f.png?ect=4g',
        },
        {
          cart_id: 1,
          product_name: 'Mandiri e-Money edisi Barbie - Barbie & Friends',
          product_id: 23,
          base_price: 40000,
          discount_price: 35000,
          discount: 13,
          quantity: 2,
          remaining_quantity: 3,
          variant1_name: '',
          variant2_name: '',
          image_url:
            'https://images.tokopedia.net/img/cache/900/VqbcmM/2023/7/10/d0ac6370-86f1-4cd8-ad80-5754758e3a2b.jpg',
        },
      ],
    },
  ],
  loadingFetchCart: false,
  fetchCart: async () => {
    set(() => ({ loadingFetchCart: true }));
    const response = await CartClient.getListofCartItem();
    console.log('cart_response ', response.data);
    // set((state) => ({
    //   cartItems: [...state.cartItems, response.data],
    // }));
    set(() => ({ loadingFetchCart: true }));
  },
  incrementTotalCartPrice: (price: number, quantity: number) => {},
  decrementTotalCartPrice: (price, quantity) => {},
}));

export const useCart = createZusSelector(useCartBase);
