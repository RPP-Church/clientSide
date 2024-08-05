import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home/home';
import Nav from './components/Nav/Nav';
import Layout from './components/Layout';
import AdminLogin from './pages/AuthLayout/Login';
import DashboardIndex from './pages/Dashboard/Index';
import { getToken } from './services/getToken';
import Department from './pages/Dashboard/Department';
import Member from './pages/Dashboard/Member';
import AuthContext from './context/AuthContext';
import MemberDetails from './pages/Dashboard/Member/singleMember';
import Activities from './pages/Dashboard/Activity';
import Attendance from './pages/Dashboard/Attendance/index';
import { ErrorAnimation } from './components/animation';
function App() {
  const { pathname } = useLocation();
  const token = getToken();

  return (
    <>
      {pathname?.includes('dashboard') || pathname == '/login' ? (
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
            <Route element={<DashboardIndex />} index />
            <Route element={<MemberDetails />} path='/dashboard/member/:id' />
            <Route element={<Department />} path='/dashboard/department' />
            <Route element={<Activities />} path='/dashboard/activity' />
            <Route element={<Attendance />} path='/dashboard/attendance' />
            <Route element={<ErrorAnimation />} path='*' />
          </Route>
          <Route element={<ErrorAnimation />} path='*' />
        </Routes>
      </AuthContext>
    </>
  );
}

export default App;
