import { useState } from 'react';
import styled from 'styled-components';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useMutation } from '@tanstack/react-query';
import { ErrorHandler } from '../../components/ErrorHandler';
import { login } from '../../services/login';
import { userState } from '../../state/userState';
import { Link, useNavigate } from 'react-router-dom';
import { Splash } from '../../components/animation';
import { Notification } from '../../components/Notification';
import PasswordInput from '../../components/PasswordInput';
import Logo from '../../assets/RCCG_logo_400px 1.png';

import CarouselLogin from './CarouselLogin';

const Wrapper = styled.div`
  background: ${({ loaded, src }) =>
    loaded === 'true' ? `url(${src})` : '#fff'};
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-attachment: scroll;
  /* padding-top: 2rem;
  height: 100vh; */

  .slick-track {
    /* width: 100% !important; */
  }

  .ant-input {
    background-color: #fff !important;
    color: var(--gray-color) !important;
    border: 1px solid var(--gray-color) !important;
    border-radius: 10px;
    height: 60px;
    padding: 0 0 0 2rem;
    margin-top: 1rem;
    font-size: 1.2rem;
    font-family: var(--Inter-family) !important;
    font-weight: 300 !important;
    font-size: clamp(0.9rem, 2.5vw, 1rem);
  }

  .ant-input::placeholder {
    color: var(--gray-color) !important;
    font-family: var(--Inter-family);
    font-weight: 300;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  justify-content: center;
  flex-direction: column;
  height: 100%;
  /* padding: 0 2rem; */
  /* div {
    margin-bottom: 2rem;
  } */

  label {
    font-weight: 700;
    color: #f1efef;
    font-size: 1.2rem;
  }

  form {
    max-width: 500px;
    width: 70%;
  }

  @media screen and (max-width: 60rem) {
    form {
      width: 100%;
    }
  }
`;
const Login = () => {
  const navigate = useNavigate();
  const { setUser } = userState();
  const [loaded, setLoaded] = useState(false);
  const [formdata, setFormdata] = useState({
    phone: '',
    password: '',
    show: false,
  });

  // const img = new Image();
  // img.src = BackgroundPicture;
  // img.onload = () => {
  //   setLoaded(true);
  // };

  const { mutate, isLoading } = useMutation({
    mutationFn: async (form) => {
      return await login(form);
    },
    onSuccess: (data) => {
      localStorage.setItem('user', JSON.stringify(data?.data));
      localStorage.setItem('refreshToken', data?.data?.refreshToken);
      setUser(data.data);
      navigate('/dashboard');
    },
    onError: (error) => {
      const message = ErrorHandler(error);
      Notification({
        type: 'error',
        message:
          message.error ||
          message?.msg ||
          message.data.mesage ||
          message.data.msg,
      });
    },
  });

  const handleRegister = (e) => {
    e.preventDefault();
    const { password, phone } = formdata;

    const data = {
      password,
      phone,
    };

    if (!data.phone && !data.password) {
      Notification({ type: 'info', message: 'Phone or password not correct' });
      return;
    }

    mutate(data);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <div
        style={{
          zIndex: 999999,
        }}
      >
        <ul style={{ margin: '0px' }}> {dots} </ul>
      </div>
    ),
  };

  if (isLoading) {
    return <Splash />;
  }

  //  loaded={loaded.toString()} src={img.src}
  return (
    <Wrapper>
      <Container>
        <CarouselContainer>
          <div className='slider-container'>
            <CarouselLogin />
            <div className='text'>
              <p>JESUS CHRIST THE SAME YESTERDAY, TODAY AND FOREVER</p>
            </div>
          </div>
        </CarouselContainer>
        <FormContainer>
          <div className='wrapper'>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <img src={Logo} />
            </div>
            <div className='content'>
              <h1>Resurrection Power Parish</h1>
              <h3>Welcome To House of Favour</h3>
              <div className='formInput'>
                <div>
                  <Input
                    placeholder={'Phone number or email'}
                    size={'large'}
                    height={'500px'}
                    bordered={'1px solid #f1efef'}
                    handleChange={(e) =>
                      setFormdata((p) => ({ ...p, phone: e.target.value }))
                    }
                    value={formdata.phone}
                  />
                  <PasswordInput
                    show={formdata.show}
                    handleChange={(e) =>
                      setFormdata((p) => ({ ...p, password: e.target.value }))
                    }
                    value={formdata.password}
                    placeholder={'Password'}
                    handleCheck={(e) =>
                      setFormdata((p) => ({ ...p, show: !p.show }))
                    }
                    showCheckBox
                  />
                  <div className='link'>
                    <Link>Forget Password?</Link>
                  </div>
                </div>
                <div>
                  <Button
                    text={isLoading ? 'Loading' : 'Login'}
                    disable={isLoading}
                    background='var( --primary-color)'
                    border={'none'}
                    color='#fff'
                    radius={'15.57px'}
                    width={'100%'}
                    height={'3.5rem'}
                    hoverBackground='var( --primary-color)'
                    size={'20px'}
                    weight={'600'}
                    onClick={handleRegister}
                    hoverColor='#fff'
                  />
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginBlock: '1em',
                    }}
                  >
                    <Link
                      style={{
                        textDecoration: 'none',
                        fontFamily: 'var(--Inter-family)',
                      }}
                      to='/'
                    >
                      Go Home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FormContainer>
      </Container>
    </Wrapper>
  );
};

export default Login;

const CarouselContainer = styled.div`
  grid-column: 1/7;
  color: white;

  .child {
    height: 85vh;
    width: 100%;

    img {
      height: 100%;
      width: 100%;
    }
  }

  .text {
    height: 6.5em;
    background: #28166fa6;
    position: absolute;
    width: 100%;
    /* bottom: -16%; */
    display: flex;
    align-items: flex-end;
    justify-content: center;
    transform: translate(0px, -4%);
    p {
      font-family: var(--Inter-family);
      font-weight: 600;
      text-align: center;
      padding: 1em;
      width: 60%;
      line-height: 1.5em;
    }
  }

  .slider-container {
    position: relative;

    .slick-dots li button:before {
      font-family: 'slick';
      font-size: 20px;
      line-height: 10px;
      position: absolute;
      top: 0;
      left: 0;
      width: 7px;
      height: 7px;
      content: '•';
      text-align: center;
      opacity: 1;
      color: #d9d9d9;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      z-index: 2222;
    }

    /* .slick-dots li {
      margin: 4px 10px;
    } */
  }

  .slick-active button:before {
    color: #636363 !important;
  }

  @media screen and (max-width: 60rem) {
    display: none;
  }
`;

const FormContainer = styled.div`
  grid-column: 7/13;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  .wrapper {
    padding: 1em 2em;
    width: 100%;
  }

  h1 {
    font-size: clamp(1.1rem, 2.5vw, 1.8rem);
    font-family: var(--mobile-family);
  }

  h3 {
    font-family: var(--Inter-family);
    font-size: clamp(1.2rem, 2.5vw, 1.6rem);

    color: #848484b2;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 3em;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .formInput {
    width: 85%;
    display: flex;
    flex-direction: column;
    gap: 4em;
  }

  .link {
    display: flex;
    justify-content: end;
    margin: 14px 0 0 0;
    font-weight: 400;

    a {
      color: var(--red-color);
      font-family: var(--Inter-family);
      font-weight: 500;
      font-size: 16px;
      text-decoration: none;
    }
  }

  @media screen and (max-width: 60rem) {
    grid-column: 1/13;
    .wrapper {
      padding: 0;
    }

    .content {
      gap: 4em;
    }

    .formInput {
      width: 90%;
      gap: 2em;
    }
  }
`;
