export interface IOrderItem {
  id: number;
  status: string;
  products: IOrderProductItem[];
  receiver_name: string;
  receiver_phone_number: string;
  address_detail: string;
  courier_name: string;
  total_price: number;
  shop_name: string;
}

export interface IOrderProductItem {
  product_name: string;
  thumbnail_url: string;
  variant1_name: string;
  variant2_name: string;
  sub_total_price: number;
  quantity: number;
  base_price: number;
  discounted_price: number;
  discount: number;
}
