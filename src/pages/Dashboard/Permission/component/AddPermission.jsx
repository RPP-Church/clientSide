import AutoComplete from '../../../../components/AutoComplete';
import Input from '../../../../components/Input';
import Modals from '../../../../components/Modal';
import propTypes from 'prop-types';
import { SearchBAR } from '../../../../style/container';
import styled from 'styled-components';
import { GetMembers } from '../../../../services/getMembers';
import { Checkbox } from 'antd/lib';
import { useMemo } from 'react';
import { Notification } from '../../../../components/Notification';

const SearchBar = styled.div`
  ${SearchBAR}
  display: block !important;
  background-color: white !important;
  border: none !important;
  box-shadow: none !important;
  label {
    font-size: 0.7em !important;
  }

  .ant-checkbox-wrapper {
    font-size: 0.9em !important;
  }

  .permission {
    margin-top: 5px;
    label:first-child {
      display: block;
    }
  }
`;
const AddPermission = ({ state, setState, mutate, isLoading }) => {
  const { data, isError, refetch } = GetMembers(state.query);

  const handleSearch = (data) => {
    setState((p) => ({
      ...p,
      query: {
        name: data,
      },
    }));
  };

  const onClose = () => {
    setState((p) => ({
      ...p,
      open: false,
      openPermission: false,
      controls: {
        name: '',
        role: '',
        permissions: '',
        edit: false,
      },
      memberPermission: {},
      memberId: '',
      memberName: '',
    }));
  };

  const userPermission = useMemo(() => {
    if (
      state?.memberPermission?.permissions?.length > 0 &&
      state.controls?.permissions?.length > 0 &&
      state?.controls.name
    ) {
      const systemPermission = state.controls.permissions.map((item) => {
        let check = state.memberPermission?.permissions?.find(
          (c) => c.name === item.name
        );

        if (check?.name) {
          return {
            ...check,
            parent: state?.controls.name,
            found: true,
          };
        }

        return item;
      });

      return systemPermission;
    } else {
      return state?.controls?.permissions;
    }
  }, [state]);

  const handleChange = (_, name) => {
    if (!state.memberId) {
      return Notification({
        type: 'info',
        message: 'Select a user before checking the role',
      });
    }
    if (state?.memberPermission?.permissions?.length > 0) {
      let newPermission = [...state.memberPermission.permissions]?.filter(
        (c) => c.name === name
      );

      if (newPermission?.length > 0) {
        const newPermissions = [...state.memberPermission.permissions]?.filter(
          (c) => c.name !== name
        );

        const data = {
          ...state.memberPermission,
          permissions: newPermissions,
        };

        setState((p) => ({
          ...p,
          memberPermission: data,
        }));
        return;
      } else {
        const newPermission = [...state.memberPermission.permissions]?.concat({
          name: name,
        });
        setState((p) => ({
          ...p,
          memberPermission: {
            ...p.memberPermission,
            permissions: newPermission,
          },
        }));
      }
      return;
    } else {
      let newPermission = [...state.controls.permissions]?.find(
        (c) => c.name === name
      );
      const data = {
        name: state.controls.name,
        permId: state.controls.id,
        permissions:
          state.memberPermission?.permissions?.length > 0
            ? state.memberPermission?.permissions.push(newPermission)
            : [newPermission],
      };
      setState((p) => ({
        ...p,
        memberPermission: data,
      }));
      return;
    }
  };

  const handleSave = () => {
    const data = {
      memberId: state.memberId,
      id: state.memberPermission.permId,
      permission: state.memberPermission.permissions,
    };

    if (data.memberId && data.permission?.length > 0 && data.id) {
      mutate({ formData: data, onClose, Id: data.id, refetch });
    } else {
      mutate({ formData: data, onClose, Id: data.id, refetch });

      console.log(data)
      // Notification({
      //   type: 'warning',
      //   message: 'Select a user and roles before saving',
      // });
    }
  };

  return (
    <Modals
      open={state.openPermission}
      width={'40%'}
      onCancel={() => onClose()}
      title={'Add permission to user'}
      handleOK={() => handleSave()}
      loading={isLoading}
      okText={'Save'}
    >
      <SearchBar>
        <div>
          <label>SEARCH NAME</label>
          <AutoComplete
            onSearch={(data) => handleSearch(data)}
            options={
              data?.data?.length > 0
                ? data?.data.map((item) => ({
                    value: item?.firstName + ' ' + item?.lastName,
                    Id: item._id,
                    permissions: item.permission,
                  }))
                : []
            }
            onSelect={(e, d) => {
              const findPermission =
                d?.permissions?.length > 0
                  ? d.permissions.find((c) => c.name === state.controls.name)
                  : [];

              setState((p) => ({
                ...p,
                memberId: d.Id,
                memberPermission: findPermission,
                memberName: d.value,
              }));
            }}
            status={isError && 'error'}
           
          />
        </div>
        <div className='child'>
          <label>PERMISSION NAME</label>
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
            disabled
          />
        </div>
        <div>
          {userPermission?.length > 0 && (
            <div className='permission'>
              <label>
                Permission will be checked if already exist in {`user's`}{' '}
                profile
              </label>
              {userPermission?.map((item) => (
                <>
                  <Checkbox
                    key={item.name}
                    checked={item?.found ? true : false}
                    onChange={(data) =>
                      handleChange(data, item.name, item.parent)
                    }
                  >
                    {item.name}
                  </Checkbox>
                </>
              ))}
            </div>
          )}
        </div>
      </SearchBar>
    </Modals>
  );
};

export default AddPermission;

AddPermission.propTypes = {
  state: propTypes.object,
  setState: propTypes.func,
  refetch: propTypes.func,
  mutate: propTypes.func,
  isLoading: propTypes.bool,
  handleUpdate: propTypes.func,
};
