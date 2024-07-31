import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getToken } from '../services/getToken';
import { useNavigate } from 'react-router-dom';

const AuthContext = ({ children }) => {
  const navigate = useNavigate();

  async function checkToken() {
    const user = getToken();

    if (user?.token) {
      let currentDate = new Date();
      const decodedToken = jwtDecode(user.token);
      if (decodedToken?.exp * 1000 < currentDate.getTime()) {
        localStorage.removeItem('user');
        navigate('/login');
      } else {
        // setIsSignIn(true);
        // dispatch(setToken(user));
        // dispatch(setAppPin(decodedToken?.pin || ''));
        // dispatch(
        //   setUser({
        //     name: decodedToken.name,
        //     role: decodedToken.role,
        //     Id: decodedToken.userId,
        //   })
        // );
        navigate('/dashboard');
      }
    } else {
      navigate('/login');
    }
  }

  useEffect(() => {
    checkToken();
  }, []);

  return children;
};

export default AuthContext;
