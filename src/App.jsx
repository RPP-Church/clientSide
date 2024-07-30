import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home/home';
import Nav from './components/Nav/Nav';
import Layout from './components/Layout';
import AdminIndex from './pages/AuthLayout';
import AdminLogin from './pages/AuthLayout/Login';
import DashboardIndex from './pages/Dashboard/Index';
import { getToken } from './services/getToken';
import { useEffect, useState } from 'react';
import Department from './pages/Dashboard/Department';
import MemberDetails from './pages/Dashboard/MemberDetails';

function App() {
  const { pathname } = useLocation();
  const token = getToken();
  const [show, setShow] = useState(false);

  function checkSize() {
    if (window.matchMedia('(max-width: 60rem)').matches) {
      setShow(true);
    } else {
      setShow(false);
    }
  }

  useEffect(() => {
    setShow(window.matchMedia('(max-width: 60rem)').matches);
    window.addEventListener('resize', checkSize);

    return () => window.removeEventListener('resize', checkSize);
  }, []);

  return (
    <>
      <Nav pathname={pathname} user={token?.name} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route element={<AdminLogin />} path='login' />

        {/* <Route path='/admin' element={<Layout />}>
          <Route element={<AdminIndex />} index />
        </Route> */}
        <Route
          path='/dashboard'
          element={
            token && token?.token ? (
              <Layout />
            ) : (
              <Navigate to='/admin' replace={true} />
            )
          }
        >
          <Route element={<DashboardIndex />} index />
          <Route element={<MemberDetails />} path=':id' />
          <Route element={<Department />} path='department' />
        </Route>
      </Routes>
    </>
  );
}

export default App;
