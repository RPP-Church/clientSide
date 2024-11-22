import { Navigate } from 'react-router-dom';
import { checkDecodeToken } from './context/checkToken';
import { getToken } from './services/getToken';

const PrivateRoute = ({ component: Component }) => {
  const user = getToken();

  const isAuth = checkDecodeToken({ user });

  return isAuth ? <Component /> : <Navigate to={'/login'} />;
};

export default PrivateRoute;
