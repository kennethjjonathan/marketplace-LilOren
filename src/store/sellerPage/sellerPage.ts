import { create } from 'zustand';
import { IPagination } from '@/interface/pagination';
import { createZusSelector } from '../useSelector';
import { ISellerProduct } from '@/interface/sellerPage';
import { SellerPageClient } from '@/service/sellerPage/sellerPageClient';

export interface ISellerDetails {
  shop_name: string;
  product_counts: string;
  years: string;
  categories: string[];
  best_seller: ISellerProduct[];
  products: ISellerProduct[];
  pagination: IPagination;
}

type State = {
  loading_fetch_seller_details: boolean;
  seller_details: ISellerDetails;
};

type Actions = {
  fetchSellerDetails: (shop_name: string, params: string) => void;
  setSellerDetails: (seller_details: ISellerDetails) => void;
};

const useSellerPageBase = create<State & Actions>((set) => ({
  loading_fetch_seller_details: false,
  seller_details: {
    shop_name: '',
    product_counts: '',
    years: '',
    categories: [],
    best_seller: [],
    products: [],
    pagination: {
      page: 0,
      total_page: 0,
      total_product: 0,
      search: '',
    },
  },
  fetchSellerDetails: async (shop_name: string, params: string) => {
    set(() => ({
      loading_fetch_seller_details: true,
    }));
    const response = await SellerPageClient.getSellerDetails(shop_name, params);
    set(() => ({
      seller_details: response.data,
    }));
  },
  setSellerDetails: (seller_details: ISellerDetails) => {
    set(() => ({
      seller_details: seller_details,
    }));
  },
}));

export const useSellerPage = createZusSelector(useSellerPageBase);
