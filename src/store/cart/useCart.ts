import { create } from 'zustand';
import { ICart, ICartPrice } from '@/pages/user/cart';
import { ICartCheckedRequest } from '@/service/cart/CartService';
import { createZusSelector } from '../useSelector';
import { CartClient } from '@/service/cart/CartClient';
import { Utils } from '@/utils';

export interface ICheckedCart {
  cart_id: number;
  is_checked: boolean;
}

type State = {
  totalCartPrice: number;
  cartItems: ICart;
  is_checked_carts: ICheckedCart[];
  prices: ICartPrice;
  all_checked: boolean;
  loading_fetch_cart: boolean;
  loading_put_quantity: boolean;
  loading_check_cart: boolean;
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
    items: [],
    prices: {
      total_base_price: 0,
      total_discount_price: 0,
      total_price: 0,
    },
  },
  is_checked_carts: [],
  prices: {
    total_base_price: 0,
    total_discount_price: 0,
    total_price: 0,
  },
  all_checked: false,
  loading_fetch_cart: false,
  loading_put_quantity: false,
  loading_check_cart: false,
  fetchCart: async () => {
    set(() => ({ loading_fetch_cart: true }));
    const response = await CartClient.getListofCartItem();
    const data = response.data;
    const is_all_checked = Utils.isAllCartCheck(data);
    set((state) => ({ all_checked: is_all_checked }));
    set((state) => ({
      cartItems: data,
    }));
    set((state) => ({
      prices: data.prices,
    }));
    set(() => ({ loading_fetch_cart: false }));
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
    set(() => ({ loading_check_cart: true }));
    const response = await CartClient.updateIsChecked(data);
    console.log(response);
    set((state) => ({
      prices: response.data.data,
    }));
    set(() => ({ loading_check_cart: true }));
  },
}));

export const useCart = createZusSelector(useCartBase);
