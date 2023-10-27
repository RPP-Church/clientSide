import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home/home';
import Nav from './components/Nav/Nav';
import Layout from './components/Layout';
import AdminIndex from './pages/AuthLayout';
import AdminLogin from './pages/AuthLayout/Login';
import DashboardIndex from './pages/Dashboard/Index';
import { getToken } from './services/getToken';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Department from './pages/Dashboard/Department';
import MemberDetails from './pages/Dashboard/MemberDetails';
import AddMember from './pages/Addmembers/AddMember';

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
      {show ? (
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add-member' element={<AddMember />} />

          <Route path='/admin' element={<Layout />}>
            <Route element={<AdminIndex />} index />
            <Route element={<AdminLogin />} path='login' />
          </Route>
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
      ) : (
        <Container>
          <h1>Please app is currently available on mobile device only</h1>
        </Container>
      )}
    </>
  );
}

export default App;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
