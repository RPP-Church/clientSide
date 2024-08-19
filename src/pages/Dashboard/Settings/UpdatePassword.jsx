import { FaAsterisk } from 'react-icons/fa';
import styled from 'styled-components';
import Modals from '../../../components/Modal';
import Input from '../../../components/Input';
import propTypes from 'prop-types';
import { ErrorStatus } from './ErrorState';
import { UpdateAdminPassword } from '../../../services/getAdmin';
import { Notification } from '../../../components/Notification';

const ContainerInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .child {
    margin: 5px 0;
  }
  @media screen and (min-width: 800px) {
    display: flex;
    gap: 10px;
    .child {
      flex: 1;
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const UpdatePassword = ({ state, setState, userId }) => {
  const handleClose = () => {
    setState((p) => ({
      ...p,
      open: false,
      controls: {
        ...p.controls,
        password: '',
        oldPassword: '',
        cPassword: '',
      },
    }));
  };
  const { mutate, isLoading } = UpdateAdminPassword(userId, handleClose);
  const handleInput = (e, d, n) => {
    setState((p) => ({
      ...p,
      controls: {
        ...p.controls,
        [n]: e,
      },
    }));
  };

  const handleUpdateSubmit = () => {
    const message = ErrorStatus(state, setState);

    if (message.password || message.cPassword || message.cPassword) {
      Notification({ type: 'warning', message: 'Enter required field' });

      return;
    }

    if (state.controls.password !== state.controls.cPassword) {
      Notification({ type: 'warning', message: 'Passwords not match' });
      setState((p) => ({
        ...p,
        focusPassword: {
          ...p.focusPassword,
          error: true,
          focus: true,
        },
        focusCPassword: {
          ...p.focusCPassword,
          error: true,
          focus: true,
        },
      }));
      return;
    }
    const data = {
      oldPassword: state.controls.oldPassword,
      password: state.controls.password,
    };

    mutate(data);
  };
  return (
    <Modals
      open={state.open}
      //   width={'50%'}
      onCancel={() => setState((p) => ({ ...p, open: false }))}
      handleOK={handleUpdateSubmit}
      loading={isLoading}
      okText={'Update'}
    >
      <Content>
        <div>
          <h4>
            <FaAsterisk size={8} color='red' /> : This means a required field
          </h4>
        </div>
        <ContainerInput>
          <div className='child'>
            <label>
              OLD PASSWORD
              <span>
                <FaAsterisk size={8} color='red' />
              </span>
            </label>
            <Input
              type={'password'}
              status={state.focusOldPassword.error ? 'error' : ''}
              name='oldPassword'
              placeholder={''}
              size={'large'}
              value={state.controls.oldPassword}
              handleChange={(e, d) => {
                setState((p) => ({
                  ...p,
                  focusOldPassword: {
                    ...p.focusOldPassword,
                    error: e.target.value.length > 5 ? false : true,
                  },
                }));

                handleInput(e.target.value, d, 'oldPassword');
              }}
            />
          </div>
          <div className='child'>
            <label>
              NEW PASSWORD
              <span>
                <FaAsterisk size={8} color='red' />
              </span>
            </label>
            <Input
              name='password'
              status={
                state.focusPassword.error && state.focusPassword.focus
                  ? 'error'
                  : ''
              }
              type={'password'}
              placeholder={''}
              size={'large'}
              value={state.controls.password}
              handleChange={(e, d) => {
                setState((p) => ({
                  ...p,
                  focusPassword: {
                    ...p.focusPassword,
                    error: e.target.value.length > 5 ? false : true,
                  },
                }));

                handleInput(e.target.value, d, 'password');
              }}
              handleFocus={() =>
                setState((p) => ({
                  ...p,
                  focusPassword: {
                    ...p.focusPassword,
                    focus: true,
                  },
                }))
              }
              handleBlur={() =>
                setState((p) => ({
                  ...p,
                  focusPassword: {
                    ...p.focusPassword,
                    focus: false,
                  },
                }))
              }
            />
          </div>
          <div className='child'>
            <label>
              CONFIRM NEW PASSWORD
              <span>
                <FaAsterisk size={8} color='red' />
              </span>
            </label>
            <Input
              type={'password'}
              name='cPassword'
              status={
                state.focusCPassword.error && state.focusCPassword.focus
                  ? 'error'
                  : ''
              }
              placeholder={''}
              size={'large'}
              value={state.controls.cPassword}
              handleChange={(e, d) => {
                setState((p) => ({
                  ...p,
                  focusCPassword: {
                    ...p.focusCPassword,
                    error:
                      p.controls.password === e.target.value ? false : true,
                  },
                }));

                handleInput(e.target.value, d, 'cPassword');
              }}
              handleFocus={() =>
                setState((p) => ({
                  ...p,
                  focusCPassword: {
                    ...p.focusCPassword,
                    focus: true,
                  },
                }))
              }
              handleBlur={() =>
                setState((p) => ({
                  ...p,
                  focusCPassword: {
                    ...p.focusCPassword,
                    focus: false,
                  },
                }))
              }
            />
          </div>
        </ContainerInput>
      </Content>
    </Modals>
  );
};

export default UpdatePassword;

UpdatePassword.propTypes = {
  state: propTypes.object,
  setState: propTypes.func,
  handleInput: propTypes.func,
  handleSubmit: propTypes.func,
  isLoading: propTypes.bool,
  userId: propTypes.string,
};
