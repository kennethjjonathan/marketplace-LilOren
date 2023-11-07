import React, { ReactElement, useState } from 'react';
import SellerLayout from '@/components/SellerLayout/SellerLayout';
import styles from './SellerSettingsShipment.module.scss';
import { Store } from 'lucide-react';

const SHIPMENT_SERVICES = 'Shipment Services';
const CHOOSE_SERVICE_DESCRIPTION =
  'Select the courier service you want to provide in your shop';

const SellerSettingsShipment = () => {
  const [selectedCourier, setselectedCourier] = useState([]);

  const handleAddCourier = () => {

  };

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
          <div className={`${styles.section_header}`}>
            <p className={`${styles.heading}`}>{SHIPMENT_SERVICES}</p>
            <p className={`${styles.description}`}>
              {CHOOSE_SERVICE_DESCRIPTION}
            </p>
          </div>
          <section
            className={`section-courier-editor ${styles.select_courier_wrapper}`}
          >
            <div
              className={`section-courier-reguler ${styles.section_courier_reguler}`}
            >
              <div className={`section-courier-editor_group_list`}>
                <section className={`${styles.card}`}>
                    
                </section>
              </div>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
};

SellerSettingsShipment.getLayout = function getLayout(page: ReactElement) {
  return <SellerLayout>{page}</SellerLayout>;
};

export default SellerSettingsShipment;
