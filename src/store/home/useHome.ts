import { create } from 'zustand';
import { createZusSelector } from '../useSelector';
import { HomeClient } from '@/service/home/HomeClient';

export interface ICartHome {
  product_name: string;
  thumbnail_url: string;
  price: number;
  quantity: number;
}

type State = {
  cart_in_home: ICartHome[];
  loading_fetch_cart_in_home: boolean;
};

type Actions = {
  fetchCartInHome: () => void;
};

const useHomeBase = create<State & Actions>((set) => ({
  cart_in_home: [],
  loading_fetch_cart_in_home: false,
  fetchCartInHome: async () => {
    set(() => ({ loading_fetch_cart_in_home: true }));
    const response = await HomeClient.getCartInHome();
    const data = response?.data;
    set(() => ({ cart_in_home: data }));
    set(() => ({ loading_fetch_cart_in_home: false }));
  },
}));

export const useHome = createZusSelector(useHomeBase);
