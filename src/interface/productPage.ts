export interface IProduct {
  name: string;
  description: string;
}

export interface ISeller {
  id: number;
  name: string;
  profile_pircture_url: string;
  location: string;
}

export interface IProductVariant {
  id: number;
  price: number;
  discounted_price: number;
  stock: number;
  discount: number;
  variant_type1_id: number;
  variant_type2_id: number;
}
export interface IProductMedia {
  media_url: string;
  media_type: 'image' | 'video';
}

export interface IVariantType {
  type_id: number;
  type_name: string;
}

export interface IVariantGroup {
  group_name: string;
  variant_types: IVariantType[];
}

export interface IProductPage {
  product: IProduct;
  Shop: ISeller;
  product_variant: IProductVariant[];
  product_media: IProductMedia[];
  variant_group: IVariantGroup[];
}
