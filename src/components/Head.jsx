import styled from 'styled-components';
import propTypes from 'prop-types';
import { IoIosArrowBack } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineLogout } from 'react-icons/ai';
import { FaHome } from 'react-icons/fa';

const Header = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-direction: column;

  h2 {
    font-weight: 600;
    font-size: clamp(1.4rem, 2.5vw, 2rem);
    flex: 1;
    text-align: center;
  }

  p {
    margin: 0;
    color: #605f5f;
    text-align: center;
    font-size: clamp(0.8rem, 2.5vw, 1.2rem);
    margin-top: 0.7rem;
  }

  .logout {
    display: flex;
    justify-content: space-between;
    padding: 30px;
    span {
      cursor: pointer;
      font-size: 1%.2rem;
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }
`;
const Head = ({ text, back, sub, button, link }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };
  return (
    <Header>
      {back && (
        <Link
          to={'#'}
          onClick={() => {
            if (link) {
              navigate('/');
              return;
            }
            navigate(-1);
          }}
        >
          <IoIosArrowBack size={30} color='#4B484E' />
        </Link>
      )}
      <div>
        <h2>{text}</h2>
        {sub && <p>{sub}</p>}
      </div>
      {button ? (
        ' '
      ) : (
        <div className='logout'>
          <span onClick={() => navigate('/')}>
            Home
            <FaHome />
          </span>
          <span onClick={handleLogout}>
            Logout
            <AiOutlineLogout />
          </span>
        </div>
      )}
    </Header>
  );
};

export default Head;

Head.propTypes = {
  text: propTypes.string,
  back: propTypes.bool,
  to: propTypes.string,
  sub: propTypes.string,
  link: propTypes.string,
  button: propTypes.bool,
};
