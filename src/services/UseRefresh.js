import axios from './api';

const useRefreshToken = () => {
  const token = localStorage.getItem('refreshToken');

  const data = {
    token,
  };

  const refresh = async () => {
    const response = await axios.post('/refresh', data);

    return response.data.token;
  };
  return refresh;
};

export default useRefreshToken;
