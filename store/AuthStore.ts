import { AuthUser } from 'aws-amplify/auth';
import { create } from 'zustand';
// import { immer } from 'zustand/middleware/immer';
import { persist, createJSONStorage } from 'zustand/middleware';

export type AuthState = {
  loggedInUser: AuthUser | null;
};

export type AuthActions = {
  setLoggedInUser: (user: AuthUser) => void;
  removeLoggedInUser: () => void;
};

export type UploadStore = AuthState & AuthActions;

export const defaultInitState: AuthState = {
  loggedInUser: null,
};

// useCounterStore
export const useAuthStore = create(
  persist<UploadStore>(
    (set) => ({
      ...defaultInitState,
      setLoggedInUser: (newUser) =>
        set((state) => ({ loggedInUser: newUser })),
      removeLoggedInUser: () =>
        set((state) => ({
          loggedInUser: null,
        })),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
