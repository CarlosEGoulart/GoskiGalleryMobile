import { create } from 'zustand';
import PocketBase, { type Record } from 'pocketbase';

// Initialize PocketBase
const pocketBase = new PocketBase('http://127.0.0.1:8090');

type PocketBaseState = {
    user: Record | null;
    pocketBase: PocketBase;
    setUser: (user: Record | null) => void;
};

export const usePocketBaseStore = create<PocketBaseState>((set) => ({
    user: pocketBase.authStore.model,
    pocketBase: pocketBase, // Provide the instance to the store
    setUser: (user) => set({ user }),
}));

// Listen to auth changes to update the store automatically
pocketBase.authStore.onChange((token, model) => {
    usePocketBaseStore.getState().setUser(model);
}, true);
