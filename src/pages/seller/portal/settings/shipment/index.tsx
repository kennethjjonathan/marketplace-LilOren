import React, { ReactElement, useState } from 'react';
import SellerLayout from '@/components/SellerLayout/SellerLayout';
import styles from './SellerSettingsShipment.module.scss';
import { Store } from 'lucide-react';
import CheckboxCourier from '@/components/CheckboxCourier/CheckboxCourier';

const SellerSettingsShipment = () => {
  return (
    <div className={`${styles.sellerSettingsShipment}`}>
      <div className={`page-shipping-editor ${styles.page_shipping_editor}`}>
        <section className={`${styles.section_courier_editor}`}>
          <CheckboxCourier />
        </section>
      </div>
    </div>
  );
};

SellerSettingsShipment.getLayout = function getLayout(page: ReactElement) {
  return <SellerLayout header="xeana">{page}</SellerLayout>;
};

export default SellerSettingsShipment;
