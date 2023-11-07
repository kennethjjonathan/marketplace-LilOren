import axios from 'axios';
import { create } from 'zustand';
import { createZusSelector } from '../useSelector';
import { IROProvince } from '@/pages/user/address/create';

type State = {
  provinces: [];
  cities: [];
};

type Actions = {
  fetchProvinces: () => void;
  fetchCities: (provinceId: string) => void;
};

const useRajaOngkirBase = create<State & Actions>((set) => ({
  provinces: [],
  cities: [],
  fetchProvinces: async () => {
    const response = await axios({
      method: 'GET',
      url: `/api/rajaongkirprovince`,
    });
    const provincesRes: IROProvince[] = response.data.data.rajaongkir.results;
    set((state) => ({
      provinces: {
        ...state.provinces,
        provincesRes,
      },
    }));
  },
  fetchCities: async (provinceId: string) => {
    const response = await axios({
      method: 'GET',
      url: `/api/rajaongkir/${provinceId}`,
    });
    set((state) => ({
      cities: {
        ...state.cities,
        response,
      },
    }));
  },
}));

export const useRajaOngkir = createZusSelector(useRajaOngkirBase);
