import React from 'react';
import { useRouter } from 'next/router';
import { Plus } from 'lucide-react';
import Modal from '@/components/Modal/Modal';

interface AddAddressModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const AddAddressModal = ({ isVisible, onClose }: AddAddressModalProps) => {
  return (
    <Modal
      isVisible={isVisible}
      onClose={onClose}
      title="Add Address"
      position="center"
    >
      <div className="bg-white w-full pt-3 rounded-t-xl">
        <div className="modal_header addresss__header px-4 mt-[10px] text-[18px] font-normal">
          <p className="modal_heading">
            <div className="header_title">
              <span>Add Address</span>
            </div>
          </p>
        </div>
        <div className="modal_body px-4">
          <div className="addresses__body">
            <div className="body__desc text-[14px] mb-[15px] text-muted-foreground">
              <span>Kamu bisa pilih alamat yang sudah kamu simpan.</span>
            </div>
          </div>
        </div>
        <div className="body__slider flex overflow-x-auto px-4 scrolling-touch">
          {/* <SliderItem /> */}
          <AddNewAddress />
        </div>
      </div>
    </Modal>
  );
};

const SliderItem = () => {
  return (
    <div className="slider__item min-w-[170px] w-[40%] h-[160px] p-[5px] cursor-pointer">
      <div className="address w-[100%] h-[100%] ">
        <div className="address__item">
          <div className="address__card border-[1.5px] border-primary h-[150px] rounded-2xl">
            <div className="card__content py-[10px] px-[15px]">
              <div>
                {/* Nama Alamat */}
                <div className="card__id whitespace-nowrap overflow-hidden text-ellipsis text-[14px] mb-[5px]">
                  {'Endriyani Rahayu'}
                </div>
                {/* Nama Penerima */}
                <div className="card__label whitespace-nowrap text-ellipsis overflow-hidden text-[12px]">
                  {'Endriyani Rahayu'}
                </div>
                {/* Address */}
                <div className="card__desc text-[11px] text-muted-foreground h-[65px] break-all">
                  {
                    'Jl. Rawamangun Muka II No.51, RT.6/RW.12, Rawamangun, Kec. Pulogadung, Kel. Rawamangun'
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PATH_USER__SETTINGS_ADDRESS = '/user/settings/address';

const AddNewAddress = () => {
  const router = useRouter();
  return (
    <div
      className="slider__item min-w-[170px] w-[40%] h-[160px] p-[5px] cursor-pointer"
      onClick={() => router.push(PATH_USER__SETTINGS_ADDRESS)}
      onKeyDown={() => router.push(PATH_USER__SETTINGS_ADDRESS)}
    >
      <div className="address w-[100%] h-[100%] ">
        <div className="address__item">
          <div className="address__card border-[1px] shadow-lg h-[150px] rounded-2xl">
            <div className="card__content py-[10px] px-[15px] h-full flex flex-col justify-center items-center">
              <div className="bg-white shadow-lg rounded-full flex flex-col justify-center items-center p-3">
                <Plus size={35} className={'text-primary'} />
              </div>
              <span className="text-primary text-[12px] mt-2">
                {'Add New Address'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAddressModal;
