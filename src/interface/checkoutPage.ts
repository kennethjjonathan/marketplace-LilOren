export interface IAddress {
  id: number;
  receiver_name: string;
  address: string;
  postal_code: number;
}

export interface ICheckoutItem {
  name: string;
  image_url: string;
  quantity: number;
  total_weight: number;
  price: number;
}

export interface ICheckout {
  shop_id: number;
  shop_name: string;
  shop_city: string;
  items: ICheckoutItem[];
}

export interface IOrderSummary {
  shop_id: number;
  shop_name: string;
  subtotal_product: number;
  delivery_cost: number;
  subtotal: number;
}

export interface ICheckoutSummary {
  orders: IOrderSummary[];
  total_shop_price: number;
  total_product: number;
  total_delivery_cost: number;
  service_price: number;
  summary_price: number;
}
