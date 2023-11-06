export interface IProduct {
  image: string;
  name: string;
  variant?: string;
  price: number;
  discountedPrice: number;
  discountPercentage: number;
  quantity: number;
  maxQuantity: number;
  isLiked: boolean;
}
