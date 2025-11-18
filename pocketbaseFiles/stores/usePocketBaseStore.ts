import { create } from 'zustand';
import PocketBase from 'pocketbase';
import type { Record } from 'pocketbase';

// Initialize PocketBase
const pocketBase = new PocketBase('https://8090-firebase-goskigallerymobile-1758814611804.cluster-mdgxqvvkkbfpqrfigfiuugu5pk.cloudworkstations.dev');

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
