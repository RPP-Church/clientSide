import { useState } from 'react';
import { useWindowDimensions } from '../../hook/getDimension';
import styled from 'styled-components';
import Drawer from '../Drawer';
import { NavLink } from 'react-router-dom';

//******************* LOGOS ************************
import Logo from '../../assets/DLogo.png';
import MobileLogo from '../../assets/mobileDLogo.png';
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
  GameIconsHamburgerMenu,
} from './Icons';
import SideLink from './Link';

const SideContainer = styled.aside`
  background-color: #dddddd45;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .header {
    display: flex;
    align-items: center;
    gap: 8px;

    h1 {
      margin: 0;
      font-family: var(--mobile-family);
      color: black;
      font-size: 0.7em;
      text-align: center;
    }
  }

  .mobile {
    cursor: pointer;
  }
  nav {
    display: none;
  }

  .mobile .linkContent svg {
    background-color: black;
  }
  @media screen and (min-width: 801px) {
    .mobile {
      display: none;
    }
    display: block !important;
    grid-column: 1 / 3;
    background-color: var(--primary-color);
    height: 100%;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
      rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
      rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
    padding: 2em 0 !important;
    .header {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      gap: 15px;

      h1 {
        color: white;
        font-size: 0.7em;
      }

      img {
        background: white;
        border-radius: 200px;
      }
    }

    nav {
      height: ${({ height }) => (height === 'true' ? '70vh' : '80vh')};
      display: flex !important;
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
  const [open, setOpen] = useState(false);

  //   console.log(
  //     height,
  //     width,
  //     width >= 600 && width <= 960 && height >= 600 ? 'true' : 'false'
  //   );

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <SideContainer
      show={width >= 600 && width <= 960 && height >= 600 ? 'true' : 'false'}
      height={height > 1000 && width > 700 ? 'true' : 'false'}
      gap={height <= 700 ? 'true' : 'false'}
    >
      {width <= 800 && (
        <Drawer
          open={open}
          placement={'left'}
          onClose={() => handleClose()}
          width={
            width <= 300 ? '65%' : width > 300 && width <= 470 ? '45%' : '35%'
          }
          child={
            <div className='mobileNav'>
              <h2>Services</h2>
              <nav>
                <SideLink
                  href={'/dashboard'}
                  onClick={handleClose}
                  className={`${
                    pathname === '/dashboard' ? 'isActive' : ''
                  } linkContent`}
                  child={
                    <div>
                      <LineMdHome
                        styles={{
                          color: pathname === '/dashboard' ? 'black' : 'white',
                          fontSize:
                            width >= 600 && width <= 960 && height >= 600
                              ? '1em'
                              : '1.2em',
                          display: 'none',
                        }}
                      />
                      <span>Home</span>
                    </div>
                  }
                />

                <NavLink to={'/dashboard/member'}>
                  <div
                    className={`${
                      pathname === '/dashboard/member' ? 'isActive' : ''
                    } linkContent`}
                  >
                    <MemberIcons
                      styles={{
                        color:
                          pathname === '/dashboard/member' ? 'black' : 'white',
                        fontSize:
                          width >= 600 && width <= 960 && height >= 600
                            ? '1em'
                            : '1.2em',
                        display: 'none',
                      }}
                    />
                    <span>Members</span>
                  </div>
                </NavLink>
                <NavLink to={'/dashboard/visitors'} onClick={handleClose}>
                  <div
                    className={`${
                      pathname === '/dashboard/visitors' ? 'isActive' : ''
                    } linkContent`}
                  >
                    <VisitorIcon
                      styles={{
                        color:
                          pathname === '/dashboard/visitors'
                            ? 'black'
                            : 'white',
                        fontSize:
                          width >= 600 && width <= 960 && height >= 600
                            ? '1em'
                            : '1.2em',
                        display: 'none',
                      }}
                    />
                    <span>Visitors</span>
                  </div>
                </NavLink>
                <NavLink to={'/dashboard/archive'} onClick={handleClose}>
                  <div
                    className={`${
                      pathname === '/dashboard/archive' ? 'isActive' : ''
                    } linkContent`}
                  >
                    <HugeiconsArchive
                      styles={{
                        color:
                          pathname === '/dashboard/archive' ? 'black' : 'white',
                        fontSize:
                          width >= 600 && width <= 960 && height >= 600
                            ? '1em'
                            : '1.2em',
                        display: 'none',
                      }}
                    />
                    <span>Archives</span>
                  </div>
                </NavLink>
                <NavLink to='/dashboard/department' onClick={handleClose}>
                  <div
                    className={`${
                      pathname === '/dashboard/department' ? 'isActive' : ''
                    } linkContent`}
                  >
                    <MingcuteDepartmentLine
                      styles={{
                        color:
                          pathname === '/dashboard/department'
                            ? 'black'
                            : 'white',
                        fontSize:
                          width >= 600 && width <= 960 && height >= 600
                            ? '1em'
                            : '1.2em',
                        display: 'none',
                      }}
                    />
                    <span>Depatments</span>
                  </div>
                </NavLink>
                <NavLink to='/dashboard/activity' onClick={handleClose}>
                  <div
                    className={`${
                      pathname === '/dashboard/activity' ? 'isActive' : ''
                    } linkContent`}
                  >
                    <MaterialSymbolsContentPasteGo
                      styles={{
                        color:
                          pathname === '/dashboard/activity'
                            ? 'black'
                            : 'white',
                        fontSize:
                          width >= 600 && width <= 960 && height >= 600
                            ? '1em'
                            : '1.2em',
                        display: 'none',
                      }}
                    />
                    <span>Our Programmes</span>
                  </div>
                </NavLink>
                <NavLink to='/dashboard/attendance' onClick={handleClose}>
                  <div
                    className={`${
                      pathname === '/dashboard/attendance' ? 'isActive' : ''
                    } linkContent`}
                  >
                    <TablerCapture
                      styles={{
                        color:
                          pathname === '/dashboard/attendance'
                            ? 'black'
                            : 'white',
                        fontSize:
                          width >= 600 && width <= 960 && height >= 600
                            ? '1em'
                            : '1.2em',
                        display: 'none',
                      }}
                    />
                    <span>Capture Attendance</span>
                  </div>
                </NavLink>
                <NavLink to='/dashboard/report' onClick={handleClose}>
                  {' '}
                  <div
                    className={`${
                      pathname === '/dashboard/report' ? 'isActive' : ''
                    } linkContent`}
                  >
                    <OuiAppReporting
                      styles={{
                        color:
                          pathname === '/dashboard/report' ? 'black' : 'white',
                        fontSize:
                          width >= 600 && width <= 960 && height >= 600
                            ? '1em'
                            : '1.2em',
                        display: 'none',
                      }}
                    />
                    <span>Generate Report</span>
                  </div>
                </NavLink>
                <NavLink to='/dashboard/testimonies' onClick={handleClose}>
                  <div
                    className={`${
                      pathname === '/dashboard/testimonies' ? 'isActive' : ''
                    } linkContent`}
                  >
                    <LsiconListFilled
                      styles={{
                        color:
                          pathname === '/dashboard/testimonies'
                            ? 'black'
                            : 'white',
                        fontSize:
                          width >= 600 && width <= 960 && height >= 600
                            ? '1em'
                            : '1.2em',
                        display: 'none',
                      }}
                    />
                    <span>View Testimonies</span>
                  </div>
                </NavLink>
                <NavLink to='/dashboard/setting' onClick={handleClose}>
                  <div
                    className={`${
                      pathname === '/dashboard/setting' ? 'isActive' : ''
                    } linkContent`}
                  >
                    <UilSetting
                      styles={{
                        color:
                          pathname === '/dashboard/setting' ? 'black' : 'white',
                        fontSize:
                          width >= 600 && width <= 960 && height >= 600
                            ? '1em'
                            : '1.2em',
                        display: 'none',
                      }}
                    />
                    <span>Setting</span>
                  </div>
                </NavLink>
              </nav>
            </div>
          }
        />
      )}

      <div className='header'>
        <picture>
          <source media='(max-width: 800px)' srcSet={MobileLogo} />
          <source media='(min-width: 799px)' srcSet={Logo} />
          <img src={Logo} alt='Pastor Femi anointing a member' />
        </picture>

        <h1>RESURRECTION POWER PARISH</h1>
      </div>
      <div className='mobile' onClick={() => setOpen(true)}>
        <span>
          <GameIconsHamburgerMenu styles={{ fontSize: '1.4em' }} />
        </span>
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

export default SideBar;
