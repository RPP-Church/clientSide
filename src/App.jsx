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
      <Nav pathname={pathname} />
      {show ? (
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/admin' element={<Layout />}>
            <Route element={<AdminIndex />} index />
            <Route element={<AdminLogin />} path='login' />
          </Route>
          <Route
            path='/dashboard'
            element={
              token ? <Layout /> : <Navigate to='/admin' replace={true} />
            }
          >
            <Route element={<DashboardIndex />} index />
          </Route>
        </Routes>
      ) : (
        <Container>
          <h1>Please app is currently available in mobile only</h1>
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
