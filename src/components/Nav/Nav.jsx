import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import propTypes from 'prop-types';

const NaVbar = styled.nav`
  background-color: #090808;
  color: #f1efef;
  border-bottom: 1px solid #f1efef;
  position: sticky;
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
const Nav = ({ pathname }) => {

  return (
    <>
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
            <div>somethign else</div>
          </div>
        </NaVbar>
      )}
    </>
  );
};

export default Nav;

Nav.propTypes = {
  pathname: propTypes.any,
};
