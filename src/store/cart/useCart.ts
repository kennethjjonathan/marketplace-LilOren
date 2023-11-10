import { create } from 'zustand';
import { ICartItem } from '@/pages/user/cart';
import { CartClient } from '@/service/cart/CartClient';
import { createZusSelector } from '../useSelector';

export interface ICheckedCart    {
  cart_id:number;
  is_checked: boolean;
}

type State = {
  totalCartPrice: number;
  cartItems: ICartItem[];
  loadingFetchCart: boolean;
  is_checked_carts : ICheckedCart[]
};

type Actions = {
  fetchCart: () => void;
  checkCart: (cart_id: number) => void;
  setCartItems: (cartItems: ICartItem[]) => void;
  unCheckCart: (cart_id: number) => void;
  incrementTotalCartPrice: (price: number, quantity: number) => void;
  decrementTotalCartPrice: (price: number, quantity: number) => void;
  setCheckedCart:(data:ICheckedCart[])=>void;
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
          is_checked: false,
        },
        {
          cart_id: 2,
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
          is_checked: false,
        },
      ],
    },
    {
      seller_name: 'Erigo Store2',
      seller_id: 2,

      products: [
        {
          cart_id: 3,
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
          is_checked: false,
        },
        {
          cart_id: 4,
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
          is_checked: false,
        },
      ],
    },
  ],
  loadingFetchCart: false,
  is_checked_carts:[],
  fetchCart: async () => {
    set(() => ({ loadingFetchCart: true }));
    // const response = await CartClient.getListofCartItem();
    // set((state) => ({
    //   cartItems: [...state.cartItems, response.data],
    // }));
    set(() => ({ loadingFetchCart: true }));
  },
  setCartItems: (cartItems: ICartItem[]) => {
    set((state) => ({
      cartItems: cartItems,
    }));
  },
  checkCart: (cart_id: number) => {},
  unCheckCart: (cart_id: number) => {},
  incrementTotalCartPrice: (price: number, quantity: number) => {},
  decrementTotalCartPrice: (price, quantity) => {},
  setCheckedCart:(data:ICheckedCart[])=>{
    set((state) => ({
      is_checked_carts:data
    }))
  }
}));

export const useCart = createZusSelector(useCartBase);
