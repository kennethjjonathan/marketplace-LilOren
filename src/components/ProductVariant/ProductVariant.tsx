import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const ProductVariant = () => {
  const [isVariant, setIsVariant] = useState<boolean>(false);
  const [noVarPrice, setNoVarPrice] = useState<number>(0);
  const [noVarStock, setNoVarStock] = useState<number>(0);
  function handleNumKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (['e', 'E', '+', '-', 'Space'].includes(e.key)) e.preventDefault();
  }

  if (!isVariant) {
    return (
      <div className="flex flex-col items-baseline gap-3">
        <div className="flex items-center gap-3">
          <p>Variant:</p>
          <Button onClick={() => setIsVariant(true)}>Activate Variant</Button>
        </div>
        <div className="flex items-center gap-3">
          <p>Price:</p>
          <Input
            type="number"
            value={noVarPrice}
            onChange={(e) => setNoVarPrice(parseInt(e.target.value))}
            onKeyDown={(e) => handleNumKeyDown(e)}
          />
        </div>
        <div className="flex items-center gap-3">
          <p>Stock:</p>
          <Input
            type="number"
            value={noVarStock}
            onChange={(e) => setNoVarStock(parseInt(e.target.value))}
            onKeyDown={(e) => handleNumKeyDown(e)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-baseline gap-3">
      <div className="flex items-center gap-3">
        <p>Variant 1:</p>
      </div>
    </div>
  );
};

export default ProductVariant;
