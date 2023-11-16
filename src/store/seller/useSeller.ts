import { create } from 'zustand';
import { createZusSelector } from '../useSelector';
import { SellerOrderClient } from '@/service/sellerOrder/SellerOrderClient';
import { ISellerOrdersParams } from '@/service/sellerOrder/SellerOrderService';

type State = {
  seller_orders: [];
  loading_fetch_seller_orders: boolean;
};

type Actions = {
  fetchSellerOrders: (params: ISellerOrdersParams) => void;
};

const useSellerBase = create<State & Actions>((set) => ({
  seller_orders: [],
  loading_fetch_seller_orders: false,
  fetchSellerOrders: async (params: ISellerOrdersParams) => {
    set(() => ({ loading_fetch_seller_orders: true }));
    const response = await SellerOrderClient.getSellerOrders(params);
    const data = response?.data;
    set(() => ({ seller_orders: data }));
    set(() => ({ loading_fetch_seller_orders: false }));
  },
}));

export const useSeller = createZusSelector(useSellerBase);
