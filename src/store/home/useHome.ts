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
};

type Actions = {
  fetchCartInHome: () => void;
};

const useHomeBase = create<State & Actions>((set) => ({
  cart_in_home: [],
  fetchCartInHome: async () => {
    const response = await HomeClient.getCartInHome();
    console.log(response);
    const data = response?.data;
    set(() => ({ cart_in_home: data }));
  },
}));

export const useCart = createZusSelector(useHomeBase);
