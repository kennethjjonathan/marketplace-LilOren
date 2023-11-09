export interface IProduct {
  image: string;
  name: string;
  variant?: string;
  base_price: number;
  discount_price: number;
  discount: number;
  quantity: number;
  stock?: number;
  isLiked?: boolean;
}
