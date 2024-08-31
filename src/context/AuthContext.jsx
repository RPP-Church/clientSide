import { useEffect } from 'react';
import { getToken } from '../services/getToken';
import { useLocation, useNavigate } from 'react-router-dom';
import { checkDecodeToken } from './checkToken';

const AuthContext = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  async function checkToken() {
    const user = getToken();

    const link = checkDecodeToken({ user, pathname });
    navigate(link);
  }

  useEffect(() => {
    checkToken();
  }, []);

  return children;
};

export default AuthContext;
