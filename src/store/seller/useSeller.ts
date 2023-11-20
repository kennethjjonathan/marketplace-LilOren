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
  // seller_orders: {
  //   order_data: {
  //     id: 0,
  //     status: '',
  //     products: [],
  //     receiver_name: '',
  //     receiver_phone_number: '',
  //     address_detail: '',
  //     courier_name: '',
  //     eta: '',
  //     total_price: 0,
  //   },
  // },
  seller_orders: {
    order_data: [
      {
        id: 1,
        status: 'NEW',
        products: [
          {
            product_name: 'Shirt',
            thumbnail_url:
              'https://images.tokopedia.net/img/cache/100-square/VqbcmM/2023/10/16/9a895898-56d6-4430-b338-bbd43107f091.png.webp?ect=4g',
            variant1_name: 'red',
            variant2_name: 'L',
            sub_total_price: 200000,
            quantity: 2,
          },
          {
            product_name: 'Shirt',
            thumbnail_url:
              'https://images.tokopedia.net/img/cache/100-square/VqbcmM/2023/10/16/9a895898-56d6-4430-b338-bbd43107f091.png.webp?ect=4g',
            variant1_name: 'blue',
            variant2_name: 'L',
            sub_total_price: 600000,
            quantity: 3,
          },
        ],
        receiver_name: 'chitanda',
        receiver_phone_number: '085812312312',
        address_detail: 'detail default street',
        courier_name: 'JNE',
        eta: '0001-01-01',
        total_price: 800000,
      },
      {
        id: 2,
        status: 'PROCESS',
        products: [
          {
            product_name: 'Rice',
            thumbnail_url:
              'https://images.tokopedia.net/img/cache/100-square/VqbcmM/2023/10/16/9a895898-56d6-4430-b338-bbd43107f091.png.webp?ect=4g',
            variant1_name: 'High',
            variant2_name: 'default',
            sub_total_price: 500000,
            quantity: 2,
          },
          {
            product_name: 'Rice',
            thumbnail_url:
              'https://images.tokopedia.net/img/cache/100-square/VqbcmM/2023/10/16/9a895898-56d6-4430-b338-bbd43107f091.png.webp?ect=4g',
            variant1_name: 'Very High',
            variant2_name: 'default',
            sub_total_price: 500000,
            quantity: 1,
          },
        ],
        receiver_name: 'chitanda',
        receiver_phone_number: '085812312312',
        address_detail: 'detail default street',
        courier_name: 'Tiki',
        eta: '0001-01-01',
        total_price: 1000000,
      },
      {
        id: 3,
        status: 'DELIVER',
        products: [
          {
            product_name: 'Rice',
            thumbnail_url:
              'https://images.tokopedia.net/img/cache/100-square/VqbcmM/2023/10/16/9a895898-56d6-4430-b338-bbd43107f091.png.webp?ect=4g',
            variant1_name: 'Very High',
            variant2_name: 'default',
            sub_total_price: 500000,
            quantity: 1,
          },
        ],
        receiver_name: 'chitanda',
        receiver_phone_number: '085812312312',
        address_detail: 'detail default street',
        courier_name: 'Pos Indonesia',
        eta: '2023-11-17',
        total_price: 500000,
      },
      {
        id: 4,
        status: 'ARRIVE',
        products: [
          {
            product_name:
              'Apple iPhone 15 Garansi Resmi - 128GB 256GB 512GB - Black+Proteksi, 256GB',
            thumbnail_url:
              'https://images.tokopedia.net/img/cache/100-square/VqbcmM/2023/10/16/9a895898-56d6-4430-b338-bbd43107f091.png.webp?ect=4g',
            variant1_name: 'Very High',
            variant2_name: 'default',
            sub_total_price: 1000000,
            quantity: 2,
          },
          {
            product_name: 'Pen',
            thumbnail_url:
              'https://images.tokopedia.net/img/cache/900/VqbcmM/2021/3/21/19e19780-4bf2-46b7-bbc7-8ebf4652e0ee.jpg',
            variant1_name: 'default',
            variant2_name: 'default',
            sub_total_price: 20000,
            quantity: 1,
          },
        ],
        receiver_name: 'chitanda',
        receiver_phone_number: '085812312312',
        address_detail: 'detail default street',
        courier_name: 'JNE',
        eta: '2023-11-14',
        total_price: 1020000,
      },
      {
        id: 5,
        status: 'RECEIVE',
        products: [
          {
            product_name: 'Pen',
            thumbnail_url:
              'https://images.tokopedia.net/img/cache/900/VqbcmM/2021/3/21/19e19780-4bf2-46b7-bbc7-8ebf4652e0ee.jpg',
            variant1_name: 'default',
            variant2_name: 'default',
            sub_total_price: 100000,
            quantity: 5,
          },
        ],
        receiver_name: 'chitanda',
        receiver_phone_number: '085812312312',
        address_detail: 'detail default street',
        courier_name: 'Tiki',
        eta: '2023-11-13',
        total_price: 100000,
      },
      {
        id: 6,
        status: 'CANCEL',
        products: [
          {
            product_name: 'Pen',
            thumbnail_url:
              'https://images.tokopedia.net/img/cache/900/VqbcmM/2021/3/21/19e19780-4bf2-46b7-bbc7-8ebf4652e0ee.jpg',
            variant1_name: 'default',
            variant2_name: 'default',
            sub_total_price: 200000,
            quantity: 10,
          },
        ],
        receiver_name: 'chitanda',
        receiver_phone_number: '085812312312',
        address_detail: 'detail default street',
        courier_name: 'Pos Indonesia',
        eta: '0001-01-01',
        total_price: 200000,
      },
    ],
    total_data: 6,
    total_page: 1,
  },
  loading_fetch_seller_orders: false,
  fetchSellerOrders: async (params: ISellerOrdersParams) => {
    set(() => ({ loading_fetch_seller_orders: true }));
    const response = await SellerOrderClient.getSellerOrders(params);
    const data: ISellerOrder = response?.data!;
    // set(() => ({
    //   seller_orders: data,
    // }));
    set(() => ({ loading_fetch_seller_orders: false }));
  },
}));

export const useSeller = createZusSelector(useSellerBase);
