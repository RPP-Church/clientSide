import axios from 'axios';
const BASE_URL = 'https://rppserver.resurrectionpowerparish.ng/api/v1';
//https://rppserver.resurrectionpowerparish.ng
export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
