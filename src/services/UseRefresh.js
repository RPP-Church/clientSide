import axios from './api';
import { getToken } from './getToken';

const useRefreshToken = () => {
  const token = getToken();

  const refresh = async () => {
    const response = await axios.get(`/refresh`, {
      params: {
        userId: token.userId,
      },
    });

    return response.data;
  };
  return refresh;
};

export default useRefreshToken;
