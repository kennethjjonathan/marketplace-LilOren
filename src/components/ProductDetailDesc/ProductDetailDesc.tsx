import React from 'react';

interface ProductDetailDescProps {
  desc: string;
}

const ProductDetailDesc = ({ desc }: ProductDetailDescProps) => {
  return (
    <div className="w-full p-2 rounded-md shadow-lg border-[1px]">
      <h3 className="font-semibold text-xl md:text-2xl">Description</h3>
      <p className="w-full mt-3 text-justify md:text-lg">{desc}</p>
    </div>
  );
};

export default ProductDetailDesc;
