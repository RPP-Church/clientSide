import axios from 'axios';
const BASE_URL = 'http://localhost:5000/api/v1';
//https://server.resurrectionpowerparish.ng
export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
