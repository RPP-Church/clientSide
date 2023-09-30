import { create } from 'zustand';

export const userState = create((set) => ({
  loading: false,
  user: {},
  token: '',
  error: '',
  setLoading: () => set((state) => ({ loading: !state.loading })),
  setUser: (user) => set(() => ({ user: user })),
  setError: (error) => set(() => ({ error: error })),
  setToken: () => set(() => ({ token: localStorage.getItem('token') })),
}));
