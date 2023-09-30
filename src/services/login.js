import api from './api';
export const login = (form) => {
  return api.post(`/auth/login`, form);
};
