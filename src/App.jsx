import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home/home';
import Nav from './components/Nav/Nav';
import Layout from './components/Layout';
import AdminLogin from './pages/AuthLayout/Login';
import DashboardIndex from './pages/Dashboard/Index';
import { getToken } from './services/getToken';
import Department from './pages/Dashboard/Department';
import Member from './pages/Dashboard/Member';
import AuthContext from './context/AuthContext';

function App() {
  const { pathname } = useLocation();
  const token = getToken();

  return (
    <>
      {pathname?.includes('dashboard') ? (
        ''
      ) : (
        <Nav pathname={pathname} user={token?.name} />
      )}
      <AuthContext>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route element={<AdminLogin />} path='login' />
          <Route path='/dashboard' element={<Layout />}>
            <Route element={<DashboardIndex />} index />
            <Route element={<Member />} path='/dashboard/member' />
            <Route element={<Department />} path='/dashboard/department' />
          </Route>
        </Routes>
      </AuthContext>
    </>
  );
}

export default App;
