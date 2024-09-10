import styled from 'styled-components';
import Input from '../../../../components/Input';
import Modals from '../../../../components/Modal';
import propTypes from 'prop-types';
import Button from '../../../../components/Button';
import Tags from '../../../../components/Tags';
import { IoMdClose } from 'react-icons/io';
import { Notification } from '../../../../components/Notification';
const ContainerInput = styled.div`
  display: block;
  .child {
    margin: 5px 0;
  }
  @media screen and (min-width: 800px) {
    display: flex;
    flex-direction: column;
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

  .ant-select {
    width: 100% !important;
  }
`;

const AddNewRole = ({
  state,
  setState,
  refetch,
  mutate,
  isLoading,
  handleUpdate,
}) => {
  const handleSubmit = () => {
    if (state.edit) {
      handleUpdate();
      return;
    }
    if (state.controls.name && state.controls.permissions.length > 0) {
      const data = {
        name: state.controls.name.toUpperCase(),
        permissions: state.controls.permissions,
      };
      mutate({ formData: data, refetch, setState });
    } else {
      Notification({ type: 'warning', message: 'Enter name and role' });
    }
  };

  return (
    <Modals
      open={state.open}
      width={'40%'}
      onCancel={() =>
        setState((p) => ({
          ...p,
          open: false,
          controls: {
            name: '',
            role: '',
            permissions: '',
            edit: false,
          },
        }))
      }
      handleOK={() => handleSubmit()}
      loading={isLoading}
      okText={state.edit ? 'Update' : 'Create'}
    >
      <Content>
        <ContainerInput>
          <div className='child'>
            <label>Permission Name</label>
            <Input
              name='name'
              placeholder={'Name of Permission'}
              size={'large'}
              value={state.controls.name}
              handleChange={(e) =>
                setState((p) => ({
                  ...p,
                  controls: {
                    ...p.controls,
                    name: e.target.value,
                  },
                }))
              }
            />
          </div>
          <div className='child'>
            <label>Add Role</label>
            <div style={{ display: 'flex' }}>
              <Input
                name='role'
                placeholder={'Name of Role'}
                size={'large'}
                value={state.controls.role}
                handleChange={(e) =>
                  setState((p) => ({
                    ...p,
                    controls: {
                      ...p.controls,
                      role: e.target.value,
                    },
                  }))
                }
              />
              {!state.edit && (
                <Button
                  text='Add'
                  disable={state.edit}
                  color={'white'}
                  radius={'0 5px 5px 0'}
                  weight={'20%'}
                  onClick={() => {
                    if (state.controls.role && state.controls.name) {
                      const check = state.controls.permissions?.find(
                        (c) =>
                          c.name?.toLowerCase() ===
                          state.controls.role?.toLowerCase()
                      );

                      if (check?.name) {
                        return Notification({
                          type: 'warning',
                          message: 'role already added',
                        });
                      }
                      setState((p) => ({
                        ...p,
                        controls: {
                          ...p.controls,
                          permissions: [
                            ...p.controls.permissions,
                            { name: p.controls.role },
                          ],
                          role: '',
                        },
                      }));
                    } else {
                      Notification({
                        type: 'warning',
                        message: 'Enter permission name and role to add',
                      });
                    }
                  }}
                />
              )}
            </div>
          </div>
        </ContainerInput>
        <div>
          {state?.controls?.permissions?.length > 0 && (
            <div>
              {state.controls.permissions?.map((item) => (
                <Tags
                  key={item.name}
                  closeIcon={<IoMdClose size={12} />}
                  onClose={() => {
                    const newpermission = [
                      ...state.controls.permissions,
                    ]?.filter((c) => c.name !== item.name);
                    setState((p) => ({
                      ...p,
                      controls: {
                        ...p.controls,
                        permissions: newpermission,
                      },
                    }));
                  }}
                >
                  {item.name}
                </Tags>
              ))}
            </div>
          )}
        </div>
      </Content>
    </Modals>
  );
};

export default AddNewRole;
AddNewRole.propTypes = {
  state: propTypes.object,
  setState: propTypes.func,
  refetch: propTypes.func,
  mutate: propTypes.func,
  isLoading: propTypes.bool,
  handleUpdate: propTypes.func,
};
