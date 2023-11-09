import React from 'react';
import { Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { IProduct } from '@/interface/product';

interface TrashButtonProps {
  product: IProduct;
}

const TrashButton = ({ product }: TrashButtonProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash2 className="aspect-square w-5 duration-300 focus:outline-none text-muted-foreground" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="lg:text-lg">
            {`Are you sure you want to delete ${product.name} from cart?`}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          <div className="w-full flex items-center gap-5 justify-end">
            <AlertDialogCancel className="mt-0 lg:text-lg">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction className="lg:text-lg">Delete</AlertDialogAction>
          </div>
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TrashButton;
