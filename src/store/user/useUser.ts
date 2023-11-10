import { create } from 'zustand';
import { createZusSelector } from '../useSelector';

type State = {};

type Actions = {};

const useUserBase = create<State & Actions>((set) => ({}));

export const useCart = createZusSelector(useUserBase);
