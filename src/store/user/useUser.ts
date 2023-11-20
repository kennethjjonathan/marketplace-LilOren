import { create } from 'zustand';
import { createZusSelector } from '../useSelector';
import { IUserAddress } from '@/service/userAddress/userAddressService';
import { UserAddressClient } from '@/service/userAddress/userAddressClient';

type State = {
  user_addresses: IUserAddress[];
  loading_ferch_user_addresses: boolean;
  user_default_address: IUserAddress;
};

type Actions = {
  fetchUserAddresses: () => void;
  editUserDefaultAddress: (address_id: number) => void;
};

const useUserBase = create<State & Actions>((set) => ({
  user_addresses: [],
  loading_ferch_user_addresses: false,
  user_default_address: {
    id: 0,
    receiver_name: '',
    address: '',
    postal_code: '',
    receiver_phone_number: '',
  },
  user_selected_address: {
    id: 0,
    receiver_name: '',
    address: '',
    postal_code: '',
    receiver_phone_number: '',
  },
  fetchUserAddresses: async () => {
    set(() => ({ loading_ferch_user_addresses: true }));
    const response = await UserAddressClient.getUserAddresses();
    set(() => ({ user_addresses: response?.data }));
    set(() => ({ user_default_address: response?.data![0] }));
    set(() => ({ loading_ferch_user_addresses: false }));
  },
  editUserDefaultAddress: async (address_id: number) => {
    await UserAddressClient.editDefaultAddress(address_id);
  },
}));

export const useUser = createZusSelector(useUserBase);
