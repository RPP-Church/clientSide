import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getToken } from '../services/getToken';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthContext = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  async function checkToken() {
    const user = getToken();

    if (user?.token) {
      let currentDate = new Date();
      const decodedToken = jwtDecode(user.token);
      if (decodedToken?.exp * 1000 < currentDate.getTime()) {
        localStorage.removeItem('user');
        navigate('/');
      } else {
        navigate(pathname ? pathname : '/dashboard');
      }
    } else {
      navigate(pathname ? pathname : '/');
    }
  }

  useEffect(() => {
    checkToken();
  }, []);

  return children;
};

export default AuthContext;
