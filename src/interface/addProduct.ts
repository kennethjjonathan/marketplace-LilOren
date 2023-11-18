export interface IProdcutVariant {
  variant_name: string;
  options: (string | undefined)[];
}

export interface IIsProductVariantValid {
  variant_name: boolean;
  options: boolean[];
}
