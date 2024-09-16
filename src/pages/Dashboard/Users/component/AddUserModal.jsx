import styled from 'styled-components';
import AutoComplete from '../../../../components/AutoComplete';
import Input from '../../../../components/Input';
import Modals from '../../../../components/Modal';
import { GetMembers } from '../../../../services/getMembers';
import propTypes from 'prop-types';
import { SearchBAR } from '../../../../style/container';

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
const AddUserModal = ({ state, handleReset, setState, mutate, isLoading }) => {
  const { data, isError } = GetMembers(state.query);

  const handleSearch = (data) => {
    setState((p) => ({
      ...p,
      query: {
        name: data,
      },
    }));
  };

  const handleSubmit = () => {
    const data = {
      phone: state.controls.phone,
      password: state.controls.password,
    };

    mutate(data);
  };

  return (
    <Modals
      open={state.open}
      width={'40%'}
      onCancel={() => handleReset()}
      handleOK={handleSubmit}
      loading={isLoading}
      okText={'Create'}
      title='Create Login User'
    >
      <SearchBar>
        <form autoComplete='false' autoFocus autoSave='false'>
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
                      phone: item.phone,
                    }))
                  : []
              }
              onSelect={(e, d) => {
                setState((p) => ({
                  ...p,
                  controls: {
                    ...p.controls,
                    phone: d.phone,
                    permissions: d.permissions,
                    user: e,
                  },
                }));
              }}
              status={isError && 'error'}
            //   value={state?.controls?.user}
            />
          </div>
          <div>
            <label>TEMPORARY PASSWORD</label>
            <Input
              placeholder={'Password'}
              size={'large'}
              height={'500px'}
              bordered={'1px solid #f1efef'}
              handleChange={(e) =>
                setState((p) => ({
                  ...p,
                  controls: {
                    ...p.controls,
                    password: e.target.value,
                  },
                }))
              }
              type={state.show ? 'tex' : 'password'}
              value={state?.controls?.password}
              
            />
          </div>
        </form>
      </SearchBar>
    </Modals>
  );
};

export default AddUserModal;
AddUserModal.propTypes = {
  state: propTypes.object,
  setState: propTypes.func,
  refetch: propTypes.func,
  mutate: propTypes.func,
  isLoading: propTypes.bool,
  handleUpdate: propTypes.func,
  handleReset: propTypes.func,
};
