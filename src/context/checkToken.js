import { jwtDecode } from 'jwt-decode';

export const checkDecodeToken = ({ user, pathname }) => {
  if (user?.token) {
    let currentDate = new Date();
    const decodedToken = jwtDecode(user.token);
    if (decodedToken?.exp * 1000 < currentDate.getTime()) {
      localStorage.removeItem('user');
      return false;
    } else {
      // const link = pathname === '/login' ? true : pathname === '/';

      // return link ? '/dashboard' : pathname;
      return true;
    }
  } else {
    return false;
    // return pathname?.includes('dashboard') ? '/login' : pathname;
  }
};
