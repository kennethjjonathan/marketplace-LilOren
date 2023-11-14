import React from 'react';
import { Skeleton } from '../ui/skeleton';

const OrderSumsSkeleton = () => {
  return (
    <div className="w-full bg-primary-foreground py-2 max-w-sm px-1 space-y-1">
      <Skeleton className="h-2 w-32 rounded bg-gray-500" />
      <Skeleton className="h-2 w-32 rounded bg-gray-500" />
      <Skeleton className="h-4 w-40 rounded bg-gray-500" />
    </div>
  );
};

export default OrderSumsSkeleton;
