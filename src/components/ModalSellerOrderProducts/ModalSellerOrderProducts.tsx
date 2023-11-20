import React from 'react';
import Modal from '@/components/Modal/Modal';

interface ModalSellerOrderProductsProps {
  isVisible: boolean;
  onClose: () => void;
}

const ModalSellerOrderProducts = ({
  isVisible,
  onClose,
}: ModalSellerOrderProductsProps) => {
  return (
    <Modal isVisible={isVisible} onClose={onClose} title="Order Detail">
      <div className="bg-white">Modal Seller Order Products</div>
    </Modal>
  );
};

export default ModalSellerOrderProducts;
