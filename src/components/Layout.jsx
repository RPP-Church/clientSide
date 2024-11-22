import { Outlet, useLocation } from 'react-router';
import styled from 'styled-components';
import Logo from '../assets/DLogo.png';
import { NavLink } from 'react-router-dom';
import { useWindowDimensions } from '../hook/getDimension.js';

//******************* LOGOS ************************
import {
  LineMdHome,
  MemberIcons,
  VisitorIcon,
  HugeiconsArchive,
  MingcuteDepartmentLine,
  TablerCapture,
  OuiAppReporting,
  LsiconListFilled,
  MaterialSymbolsContentPasteGo,
  UilSetting,
} from './SideBar/Icons';

const LayoutContainer = styled.div`
  @media screen and (min-width: 801px) {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    overflow: hidden;
    height: 100vh;
  }

  .child {
    grid-column: 3/14;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
  }
`;

const SideContainer = styled.aside`

  @media screen and (min-width: 801px) {
    grid-column: 1 / 3;
    background-color: var(--primary-color);
    height: 100%;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
      rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
      rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
    padding: 2em 0;
    .header {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      gap: 15px;

      h1 {
        margin: 0;
        font-family: var(--mobile-family);
        color: white;
        font-size: 0.7em;
        text-align: center;
      }
    }

    nav {
      height: ${({ height }) => (height === 'true' ? '70vh' : '80vh')};
      display: flex;
      flex-direction: column;
      gap: ${({ gap }) => (gap === 'true' ? '1.2em' : ' 1.7em')};
      padding: 1em 0;
      justify-content: ${({ height }) => height === 'true' && 'center'};
      a {
        text-align: center;
        color: white;
        text-decoration: none;
        font-family: var(--Inter-family);
        height: 2.2em;
        display: grid;
        grid-template-columns: repeat(12, 1fr);
      }

      .isActive {
        background: #ffffff;
        color: black;
        border-radius: 20px 0 0 20px;
      }

      .linkContent {
        display: flex;
        align-items: center;
        gap: 7px;
        height: 100%;
        padding: 0 10px;
        grid-column: ${({ show }) => (show === 'true' ? '3/14' : '6/14')};
        transition: all 0.7s;
        span {
          font-size: clamp(0.7rem, 0.5vw, 0.8em);
          text-align: justify;
        }
      }
    }
  }
`;

const SideBar = ({ pathname }) => {
  const { height, width } = useWindowDimensions();

  console.log(height, width, height <= 700);
  return (
    <SideContainer
      show={width >= 600 && width <= 960 && height >= 600 ? 'true' : 'false'}
      height={height > 1000 && width > 700 ? 'true' : 'false'}
      gap={height <= 700 ? 'true' : 'false'}
    >
      <div className='header'>
        <img
          src={Logo}
          alt='logo'
          style={{ backgroundColor: 'white', borderRadius: '100%' }}
        />
        <h1>RESURRECTION POWER PARISH</h1>
      </div>
      <nav>
        <NavLink to={'/dashboard'}>
          <div
            className={`${
              pathname === '/dashboard' ? 'isActive' : ''
            } linkContent`}
          >
            <LineMdHome
              styles={{
                color: pathname === '/dashboard' ? 'black' : 'white',
                fontSize:
                  width >= 600 && width <= 960 && height >= 600
                    ? '1em'
                    : '1.2em',
              }}
            />
            <span>Home</span>
          </div>
        </NavLink>
        <NavLink to={'/dashboard/member'}>
          <div
            className={`${
              pathname === '/dashboard/member' ? 'isActive' : ''
            } linkContent`}
          >
            <MemberIcons
              styles={{
                color: pathname === '/dashboard/member' ? 'black' : 'white',
                fontSize:
                  width >= 600 && width <= 960 && height >= 600
                    ? '1em'
                    : '1.2em',
              }}
            />
            <span>Members</span>
          </div>
        </NavLink>
        <NavLink to={'/dashboard/visitors'}>
          <div
            className={`${
              pathname === '/dashboard/visitors' ? 'isActive' : ''
            } linkContent`}
          >
            <VisitorIcon
              styles={{
                color: pathname === '/dashboard/visitors' ? 'black' : 'white',
                fontSize:
                  width >= 600 && width <= 960 && height >= 600
                    ? '1em'
                    : '1.2em',
              }}
            />
            <span>Visitors</span>
          </div>
        </NavLink>
        <NavLink to={'/dashboard/archive'}>
          <div
            className={`${
              pathname === '/dashboard/archive' ? 'isActive' : ''
            } linkContent`}
          >
            <HugeiconsArchive
              styles={{
                color: pathname === '/dashboard/archive' ? 'black' : 'white',
                fontSize:
                  width >= 600 && width <= 960 && height >= 600
                    ? '1em'
                    : '1.2em',
              }}
            />
            <span>Archives</span>
          </div>
        </NavLink>
        <NavLink to='/dashboard/department'>
          <div
            className={`${
              pathname === '/dashboard/department' ? 'isActive' : ''
            } linkContent`}
          >
            <MingcuteDepartmentLine
              styles={{
                color: pathname === '/dashboard/department' ? 'black' : 'white',
                fontSize:
                  width >= 600 && width <= 960 && height >= 600
                    ? '1em'
                    : '1.2em',
              }}
            />
            <span>Depatments</span>
          </div>
        </NavLink>
        <NavLink to='/dashboard/activity'>
          <div
            className={`${
              pathname === '/dashboard/activity' ? 'isActive' : ''
            } linkContent`}
          >
            <MaterialSymbolsContentPasteGo
              styles={{
                color: pathname === '/dashboard/activity' ? 'black' : 'white',
                fontSize:
                  width >= 600 && width <= 960 && height >= 600
                    ? '1em'
                    : '1.2em',
              }}
            />
            <span>Our Programmes</span>
          </div>
        </NavLink>
        <NavLink to='/dashboard/attendance'>
          <div
            className={`${
              pathname === '/dashboard/attendance' ? 'isActive' : ''
            } linkContent`}
          >
            <TablerCapture
              styles={{
                color: pathname === '/dashboard/attendance' ? 'black' : 'white',
                fontSize:
                  width >= 600 && width <= 960 && height >= 600
                    ? '1em'
                    : '1.2em',
              }}
            />
            <span>Capture Attendance</span>
          </div>
        </NavLink>
        <NavLink to='/dashboard/report'>
          {' '}
          <div
            className={`${
              pathname === '/dashboard/report' ? 'isActive' : ''
            } linkContent`}
          >
            <OuiAppReporting
              styles={{
                color: pathname === '/dashboard/report' ? 'black' : 'white',
                fontSize:
                  width >= 600 && width <= 960 && height >= 600
                    ? '1em'
                    : '1.2em',
              }}
            />
            <span>Generate Report</span>
          </div>
        </NavLink>
        <NavLink to='/dashboard/testimonies'>
          <div
            className={`${
              pathname === '/dashboard/testimonies' ? 'isActive' : ''
            } linkContent`}
          >
            <LsiconListFilled
              styles={{
                color:
                  pathname === '/dashboard/testimonies' ? 'black' : 'white',
                fontSize:
                  width >= 600 && width <= 960 && height >= 600
                    ? '1em'
                    : '1.2em',
              }}
            />
            <span>View Testimonies</span>
          </div>
        </NavLink>
        <NavLink to='/dashboard/setting'>
          <div
            className={`${
              pathname === '/dashboard/setting' ? 'isActive' : ''
            } linkContent`}
          >
            <UilSetting
              styles={{
                color: pathname === '/dashboard/setting' ? 'black' : 'white',
                fontSize:
                  width >= 600 && width <= 960 && height >= 600
                    ? '1em'
                    : '1.2em',
              }}
            />
            <span>Setting</span>
          </div>
        </NavLink>
      </nav>
    </SideContainer>
  );
};

const Layout = () => {
  // const NewComponent = HigerOrderComponent(Outlet);
  const { pathname } = useLocation();
  return (
    <LayoutContainer>
      <SideBar pathname={pathname} />
      <div className='child'>
        <Outlet />
      </div>
    </LayoutContainer>
  );
};

export default Layout;
