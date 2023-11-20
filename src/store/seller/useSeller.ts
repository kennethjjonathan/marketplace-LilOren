import { create } from 'zustand';
import { SellerOrderClient } from '@/service/sellerOrder/SellerOrderClient';
import { ISellerOrdersParams } from '@/service/sellerOrder/SellerOrderService';
import { ISellerOrder } from '@/interface/sellerOrder';
import { createZusSelector } from '../useSelector';

type State = {
  seller_orders: ISellerOrder;
  loading_fetch_seller_orders: boolean;
};

type Actions = {
  fetchSellerOrders: (params: ISellerOrdersParams) => void;
};

const useSellerBase = create<State & Actions>((set) => ({
  seller_orders: {
    order_data: [],
    total_data: 0,
    total_page: 0,
  },
  loading_fetch_seller_orders: false,
  fetchSellerOrders: async (params: ISellerOrdersParams) => {
    set(() => ({ loading_fetch_seller_orders: true }));
    const response = await SellerOrderClient.getSellerOrders(params);
    const data: ISellerOrder = response?.data!;
    set(() => ({
      seller_orders: data,
    }));
    set(() => ({ loading_fetch_seller_orders: false }));
  },
}));

export const useSeller = createZusSelector(useSellerBase);
