import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/home';
import Layout from './components/Layout';
import AdminLogin from './pages/AuthLayout/Login';
import DashboardIndex from './pages/Dashboard/Index';
import Department from './pages/Dashboard/Department';
import Member from './pages/Dashboard/Member';
import MemberDetails from './pages/Dashboard/Member/singleMember';
import Activities from './pages/Dashboard/Activity';
import Attendance from './pages/Dashboard/Attendance/index';
import Settings from './pages/Dashboard/Settings/Index';
import Permission from './pages/Dashboard/Permission/index';
import Users from './pages/Dashboard/Users';
import ActivitiesDetails from './pages/Dashboard/Activity/Singles';
import Stream from './pages/Dashboard/Stream';
import Testimony from './pages/Testimony';
import Archive from './pages/Dashboard/Archive';
import TestimonyHome from './pages/Dashboard/Testimonies';
import CallManagement from './pages/Dashboard/Call'

import { ErrorAnimation } from './components/animation';
import PrivateRoute from './PrivateRoute';
function App() {
  return (
    <>
      {/* {pathname?.includes('dashboard') || pathname == '/login' ? (
        ''
      ) : (
        <Nav pathname={pathname} user={token?.name} />
      )} */}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/testimony' element={<Testimony />} />
        <Route element={<AdminLogin />} path='login' />
        <Route path='/dashboard' element={<Layout />}>
          <Route element={<PrivateRoute component={DashboardIndex} />} index />
          <Route
            element={<PrivateRoute component={Member} />}
            path='/dashboard/member'
          />
          <Route
            element={<PrivateRoute component={MemberDetails} />}
            path='/dashboard/member/:id'
          />
          <Route
            element={<PrivateRoute component={Department} />}
            path='/dashboard/department'
          />
          <Route
            element={<PrivateRoute component={Activities} />}
            path='/dashboard/activity'
          />
          <Route
            element={<PrivateRoute component={ActivitiesDetails} />}
            path='/dashboard/activity/:id'
          />
          <Route
            element={<PrivateRoute component={Attendance} />}
            path='/dashboard/attendance'
          />
          <Route
            element={<PrivateRoute component={Settings} />}
            path='/dashboard/setting'
          />
          <Route
            element={<PrivateRoute component={Permission} />}
            path='/dashboard/permission'
          />
          <Route
            element={<PrivateRoute component={Users} />}
            path='/dashboard/users'
          />
          <Route
            element={<PrivateRoute component={Stream} />}
            path='/dashboard/stream'
          />
          <Route
            element={<PrivateRoute component={Archive} />}
            path='/dashboard/archive'
          />
          <Route
            element={<PrivateRoute component={TestimonyHome} />}
            path='/dashboard/testimonies'
          />
           <Route
            element={<PrivateRoute component={CallManagement} />}
            path='/dashboard/call'
          />
          <Route element={<ErrorAnimation />} path='*' />
        </Route>
        <Route element={<ErrorAnimation />} path='*' />
      </Routes>
    </>
  );
}

export default App;
