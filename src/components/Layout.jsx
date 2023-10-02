import React from 'react';
import { Outlet } from 'react-router';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  display: block;
  /* height: 100vh; */
  width: 100%;
  overflow: hidden;
  transition: all 0.5s;

  @media screen and (min-width: 1025px) {
    display: grid;
  }
`;

const Layout = () => {
  return (
    <React.Fragment>
      <LayoutContainer>
        <Outlet />
      </LayoutContainer>
    </React.Fragment>
  );
};

export default Layout;
