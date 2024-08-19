import styled from 'styled-components';
import Head from '../../../components/Head';
import { FetchAdmin, UpdateAdmin } from '../../../services/getAdmin';
import { getToken } from '../../../services/getToken';
import Container from '../../../style/container';
import { Profile } from '../../../style/profile';
import Input from '../../../components/Input';
import { useState } from 'react';
import { FetchErrorAnimation, Splash } from '../../../components/animation';
import Button from '../../../components/Button';
import { CiEdit } from 'react-icons/ci';
import Tips from '../../../components/Tips';
import { TbPassword } from 'react-icons/tb';
import { Notification } from '../../../components/Notification';
import UpdatePassword from './UpdatePassword';

const ContainerContent = styled.div`
  display: flex;
  justify-content: center;

  ${Profile}

  .profileContent {
    width: 500px;

    @media screen and (max-width: 66rem) {
      width: 100% !important;
    }
  }
  .update {
    display: flex;
    justify-content: end;
    padding: 10px 15px 0 0;
    gap: 10px;
    span {
      background-color: red;
      color: white;
      width: 30px;
      height: 30px;
      display: flex;
      font-size: 20px;
      border-radius: 30px;
      justify-content: center;
      align-items: center;
    }

    span:hover {
      background-color: white;
      color: red !important;
    }
  }
`;

const Index = () => {
  const userId = getToken()?.userId;
  const [state, setState] = useState({
    update: true,
    open: false,
    controls: {
      firstName: '',
      lastName: '',
      gender: '',
      phone: '',
      email: '',
      password: '',
      oldPassword: '',
      cPassword: ''
    },
    focusPassword: {
      error: false,
      focus: false,
    },
    focusCPassword: {
      error: false,
      focus: false,
    },
    focusOldPassword: {
      error: false,
      focus: false,
    },
  });

  const { refetch, isError, isFetching } = FetchAdmin(userId, setState);
  const { mutate, isLoading } = UpdateAdmin(userId, refetch, setState);

  const handleSumbit = () => {
    if (state.update) {
      Notification({ type: 'warning', message: 'Update record before saving' });

      return;
    }
    const data = {
      phone: state.controls.phone,
      email: state.controls.email,
    };

    mutate(data);
  };

  if (isFetching || isLoading) {
    return <Splash />;
  }

  if (isError) {
    return <FetchErrorAnimation refetch={refetch} />;
  }
  return (
    <Container>
      <Head text={'RPP Church Portal'} />
      <UpdatePassword state={state} setState={setState} userId={userId} />
      <ContainerContent>
        <div className='profileContent'>
          <div className='update'>
            <Tips title={'Update password'}>
              <span
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  setState((p) => ({
                    ...p,
                    open: true,
                  }))
                }
              >
                <TbPassword size={20} />
              </span>
            </Tips>
            <Tips title={'Edit profile'}>
              <span
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  setState((p) => ({
                    ...p,
                    update: false,
                  }))
                }
              >
                <CiEdit size={20} />
              </span>
            </Tips>
          </div>
          <div className='inputWrapper'>
            <div className='inputContainer'>
              <div className='child'>
                <label>FIRST NAME</label>
                <Input
                  value={state.controls.firstName}
                  size={'large'}
                  disabled
                  style={{ color: 'black' }}
                />
              </div>
            </div>
            <div className='inputContainer'>
              <div className='child'>
                <label>LAST NAME</label>
                <Input
                  value={state.controls.lastName}
                  size={'large'}
                  disabled
                  style={{ color: 'black' }}
                />
              </div>
            </div>
            <div className='inputContainer'>
              <div className='child'>
                <label>GENDER</label>
                <Input
                  value={state.controls.gender}
                  size={'large'}
                  disabled
                  style={{ color: 'black' }}
                />
              </div>
            </div>
            <div className='inputContainer'>
              <div className='child'>
                <label>EMAIL</label>
                <Input
                  value={state.controls.email}
                  size={'large'}
                  style={{ color: 'black' }}
                  disabled={state.update}
                />
              </div>
            </div>
            <div className='inputContainer'>
              <div className='child'>
                <label>PHONE NUMBER</label>
                <Input
                  value={state.controls.phone}
                  size={'large'}
                  style={{ color: 'black' }}
                  disabled={state.update}
                />
              </div>
            </div>
          </div>
          <div style={{ margin: '10px 15px' }}>
            <div>
              <Button
                text='Update'
                background={'#059212'}
                radius={'4px'}
                color={'white'}
                padding={'10px 20px'}
                width={'100%'}
                height={'50px'}
                onClick={handleSumbit}
              />
            </div>
          </div>
        </div>
      </ContainerContent>
    </Container>
  );
};

export default Index;
