import { create } from 'zustand';
import { createZusSelector } from '../useSelector';
import { IUserAddress } from '@/service/userAddress/userAddressService';
import { UserAddressClient } from '@/service/userAddress/userAddressClient';

type State = {
  user_addresses: IUserAddress[];
  loading_ferch_user_addresses: boolean;
  fetchUserAddresses: () => void;
};

type Actions = {};

const useUserBase = create<State & Actions>((set) => ({
  user_addresses: [],
  loading_ferch_user_addresses: false,
  fetchUserAddresses: async () => {
    set(() => ({ loading_ferch_user_addresses: true }));
    const response = await UserAddressClient.getUserAddresses();
    set(() => ({ user_addresses: response?.data }));
    set(() => ({ loading_ferch_user_addresses: false }));
  },
}));

export const useUser = createZusSelector(useUserBase);
