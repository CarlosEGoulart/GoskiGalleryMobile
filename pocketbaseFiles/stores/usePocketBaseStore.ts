import { create } from 'zustand';
import PocketBase from 'pocketbase';
import type { Record } from 'pocketbase';

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

pocketBase.authStore.onChange((token, model) => {
    usePocketBaseStore.getState().setUser(model);
}, true);
