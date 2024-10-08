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
import Settings from './pages/Dashboard/Settings/Index';
import Permission from './pages/Dashboard/Permission/index';
import Users from './pages/Dashboard/Users';
import ActivitiesDetails from './pages/Dashboard/Activity/Singles';
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
            <Route element={<MemberDetails />} path='/dashboard/member/:id' />
            <Route element={<Department />} path='/dashboard/department' />
            <Route element={<Activities />} path='/dashboard/activity' />
            <Route
              element={<ActivitiesDetails />}
              path='/dashboard/activity/:id'
            />
            <Route element={<Attendance />} path='/dashboard/attendance' />
            <Route element={<Settings />} path='/dashboard/settings' />
            <Route element={<Permission />} path='/dashboard/permission' />
            <Route element={<Users />} path='/dashboard/users' />
          </Route>
          <Route element={<ErrorAnimation />} path='*' />
        </Routes>
      </AuthContext>
    </>
  );
}

export default App;
