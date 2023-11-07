import React, { ReactElement, useState } from 'react';
import SellerLayout from '@/components/SellerLayout/SellerLayout';
import styles from './SellerSettingsShipment.module.scss';
import { Store } from 'lucide-react';
import CheckboxCourier from '@/components/CheckboxCourier/CheckboxCourier';

const SHIPMENT_SERVICES = 'Shipment Services';
const CHOOSE_SERVICE_DESCRIPTION =
  'Select the courier service you want to provide in your shop';

const SellerSettingsShipment = () => {
  const [selectedCourier, setselectedCourier] = useState([]);

  const handleAddCourier = () => {};

  return (
    <div className={`${styles.sellerSettingsShipment}`}>
      <div className={`${styles.shopname} text-muted-foreground`}>
        <Store className="mr-4 text-muted-foreground" />
        {'xeana'}
      </div>
      <div
        className={`page-shipping-editor bg-white ${styles.page_shipping_editor}`}
      >
        <section className={`${styles.section_courier_editor}`}>
          <CheckboxCourier />
        </section>
      </div>
    </div>
  );
};

SellerSettingsShipment.getLayout = function getLayout(page: ReactElement) {
  return <SellerLayout>{page}</SellerLayout>;
};

export default SellerSettingsShipment;
