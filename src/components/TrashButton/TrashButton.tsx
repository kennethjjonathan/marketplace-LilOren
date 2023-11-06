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
import { Button } from '../ui/button';
import { IProduct } from '@/interface/product';

interface TrashButtonProps {
  product: IProduct;
}

const TrashButton = ({ product }: TrashButtonProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash2 className="aspect-square w-6 duration-300 lg:hover:text-blue-500 focus:outline-none sm:w-8 xl:w-9" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {`Are you sure you want to delete ${product.name}?`}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          <Button variant={'destructive'}>Delete</Button>
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TrashButton;
