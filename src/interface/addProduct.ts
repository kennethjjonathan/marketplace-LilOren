export interface IProductVariant {
  variant_name: string;
  options: (string | undefined)[];
}

export interface IIsProductVariantValid {
  variant_name: boolean;
  options: boolean[];
}

export interface INonVariant {
  price: number;
  stock: number;
}

export interface IVariantDefinition {
  variant_group_1: {
    name: string;
    variant_types: string[];
  };
  variant_group_2?: {
    name: string;
    variant_types: string[];
  };
}

export interface IVariantGroup {
  variant_type_1: string;
  variant_type_2?: string;
  price: number;
  stock: number;
}
