import { Outlet, useLocation } from 'react-router';
import styled from 'styled-components';
import SideBar from './SideBar/index.jsx';

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
