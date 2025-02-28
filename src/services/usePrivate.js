import { axiosPrivate } from './api';
import { useEffect, useRef } from 'react';
import useRefreshToken from './UseRefresh';
import { getToken } from './getToken';

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const token = getToken()?.token; // Store token reference
  const refreshPromise = useRef(null); // Store refresh promise for multiple calls

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;

          try {
            const newAccessToken = await refresh();

            prevRequest.headers[
              'Authorization'
            ] = `Bearer ${newAccessToken.token}`;
            localStorage.setItem('user', JSON.stringify(newAccessToken));
            return axiosPrivate(prevRequest);
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [token, refresh]);
  return axiosPrivate;
};

export default useAxiosPrivate;
