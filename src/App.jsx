import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/home';
import Nav from './components/Nav/Nav';
import Layout from './components/Layout';
import AdminIndex from './pages/AuthLayout';
import AdminLogin from './pages/AuthLayout/Login';

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Layout />}>
          <Route element={<AdminIndex />} index />
          <Route element={<AdminLogin />} path='login' />
        </Route>
      </Routes>
    </>
  );
}

export default App;
