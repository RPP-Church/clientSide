import { Route } from 'react-router-dom';
import { getToken } from '../services/getToken';
import propTypes from 'prop-types';

const PrivateRoute = (props) => {
  const authenticated = getToken();
  const isAuthenticated = authenticated ? true : false;
  return (
    <Route
      path={props.path}
      element={isAuthenticated ? props.element : <h1>Please login</h1>}
    />
  );
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  path: propTypes.any,
  element: propTypes.any,
};
