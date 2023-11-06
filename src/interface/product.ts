export interface IProduct {
  image: string;
  name: string;
  variant?: string;
  price: number;
  discountedPrice: number;
  discountPercentage: number;
  quantity: number;
  stock: number;
  isLiked: boolean;
}
