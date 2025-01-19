import axios from 'axios';
const BASE_URL = 'https://rppserver.onrender.com/api/v1';
//https://server.resurrectionpowerparish.ng
export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
