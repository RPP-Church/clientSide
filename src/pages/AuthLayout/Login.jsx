import { useState } from 'react';
import styled from 'styled-components';
import BackgroundPicture from '../../assets/gift-habeshaw-ZPNj0vbn0FE-unsplash.jpg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useMutation } from '@tanstack/react-query';
import { ErrorHandler } from '../../components/ErrorHandler';
import { login } from '../../services/login';
import { userState } from '../../state/userState';
import { useNavigate } from 'react-router-dom';
import { Splash } from '../../components/animation';
import { Notification } from '../../components/Notification';
import { Checkbox } from 'antd';
import PasswordInput from '../../components/PasswordInput';

const Wrapper = styled.div`
  background: ${({ loaded, src }) =>
    loaded === 'true' ? `url(${src})` : '#333333d3'};
  height: 100%;
  background-size: cover;
  background-position: center;
  background-attachment: scroll;
  padding-top: 2rem;
  height: 100vh;

  .ant-input {
    background-color: #33333359 !important;
    color: white !important;
    border: 1px solid #fff !important;
    border-radius: 30px;
    height: 60px;
    padding: 0 0 0 2rem;
    margin-top: 1rem;
    font-size: 1.2rem;
  }

  .ant-input::placeholder {
    color: white !important;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  align-items: center;
  padding: 0 2rem;
  div {
    margin-bottom: 2rem;
  }

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

  const img = new Image();
  img.src = BackgroundPicture;
  img.onload = () => {
    setLoaded(true);
  };

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

  if (isLoading) {
    return <Splash />;
  }
  return (
    <Wrapper loaded={loaded.toString()} src={img.src}>
      <Container>
        <form
          onSubmit={handleRegister}
          autoSave={'true'}
          autoComplete={'true'}
          autoFocus={true}
        >
          <div>
            <label>Phone</label>
            <Input
              placeholder={'Phone'}
              size={'large'}
              height={'500px'}
              bordered={'1px solid #f1efef'}
              handleChange={(e) =>
                setFormdata((p) => ({ ...p, phone: e.target.value }))
              }
              value={formdata.phone}
            />
          </div>
          <PasswordInput
            show={formdata.show}
            handleChange={(e) =>
              setFormdata((p) => ({ ...p, password: e.target.value }))
            }
            value={formdata.password}
            title={'Password'}
            handleCheck={(e) =>
              setFormdata((p) => ({ ...p, show: e.target.checked }))
            }
            showCheckBox
          />

          <div>
            <Button
              text={isLoading ? 'Loading' : 'Login'}
              disable={isLoading}
              background='rgb(241, 239, 239)'
              border={'1px solid #090808'}
              color='#090808'
              radius={'30px'}
              width={'100%'}
              height={'3.5rem'}
              hoverBackground='#f1efef'
              hoverColor='#090808'
              size={'1.3rem'}
              weight={'600'}
              onClick={handleRegister}
            />
          </div>
        </form>
      </Container>
    </Wrapper>
  );
};

export default Login;
