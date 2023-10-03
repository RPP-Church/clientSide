import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import propTypes from 'prop-types';
import { Avatar } from 'antd';
import Drawer from '../Drawer';
import { useState } from 'react';

const NaVbar = styled.nav`
  background-color: #090808;
  color: #f1efef;
  border-bottom: 1px solid #f1efef;
  position: sticky;
  z-index: 99999999;
  top: 0;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    padding: 0 1.3rem;
  }

  .links ul {
    display: flex;
    gap: 2rem;
    list-style: none;

    a {
      text-decoration: none;
      color: #f1efef;
    }
  }

  @media screen and (max-width: 568px) {
    .links {
      display: none;
    }
  }
`;
const Nav = ({ pathname, user }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        width='250px'
        child={<MobileLink user={user} setOpen={setOpen} />}
      />
      {pathname === '/admin/login' ? null : (
        <NaVbar>
          <div className='container'>
            <NavLink>RPP</NavLink>
            <div className='links'>
              <ul>
                <NavLink>Blog</NavLink>
                <NavLink>Programs</NavLink>
                <NavLink>Services</NavLink>
                <NavLink>About</NavLink>
              </ul>
            </div>
            {pathname.includes('/dashboard') && (
              <div>
                <Avatar
                  style={{
                    backgroundColor: '#f1efef',
                    color: '#090808',
                    cursor: 'pointer',
                  }}
                  onClick={() => setOpen(!open)}
                >
                  {user && user?.slice(0, 1)}
                </Avatar>
              </div>
            )}
          </div>
        </NaVbar>
      )}
    </>
  );
};

export default Nav;

Nav.propTypes = {
  pathname: propTypes.any,
  user: propTypes.string,
};

const MobileLink = ({ user, setOpen }) => {
  const hour = new Date().getHours();

  return (
    <Wrapper>
      <p>
        {' '}
        {'Good ' +
          (hour < 12 ? 'Morning' : hour < 18 ? 'Afternoon' : 'Evening')}{' '}
        {user}
      </p>

      <div className='container'>
        <NavLink color='#090808' to='/dashboard' onClick={() => setOpen(false)}>
          All Members
        </NavLink>
        <NavLink
          color='#090808'
          to='/dashboard/department'
          onClick={() => setOpen(false)}
        >
          Departments
        </NavLink>
      </div>
    </Wrapper>
  );
};

MobileLink.propTypes = {
  setOpen: propTypes.any,
  user: propTypes.string,
};

const Wrapper = styled.div`
  margin-top: 25%;
  display: flex;
  flex-direction: column;

  .container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  p {
    font-size: 1rem;
    font-weight: 400;
    font-style: italic;
    margin: 0;
  }

  .container {
    margin-top: 2rem;
  }
`;
