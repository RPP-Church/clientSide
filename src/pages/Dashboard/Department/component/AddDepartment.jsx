import styled from 'styled-components';
import Input from '../../../../components/Input';
import Modals from '../../../../components/Modal';
import propTypes from 'prop-types';
import Select from '../../../../components/Select';
import { GetMemberMutat } from '../../../../services/getMembers';

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

const AddDepartmentModal = ({
  state,
  setState,
  handleInput,
  handleSubmit,
  isLoading,
  handleReset,
}) => {
  const { isError, isFetching, data } = GetMemberMutat(state.query);

  const searchMember = (data) => {
    setState((p) => ({
      ...p,
      query: {
        ...p.query,
        firstName: data,
      },
    }));
  };
  return (
    <Modals
      open={state.open}
      width={'40%'}
      onCancel={() => handleReset()}
      handleOK={handleSubmit}
      loading={isLoading}
      okText={'Create'}
    >
      <Content>
        <ContainerInput>
          <div className='child'>
            <label>Department Name</label>
            <Input
              name='name'
              placeholder={'Name of department'}
              size={'large'}
              value={state.controls.name}
              handleChange={(e, d) => {
                handleInput(e.target.value, d, 'name');
              }}
            />
          </div>
          <div className='child'>
            <label>Head of Department</label>
            <Select
              name='headOfDepartment'
              placeholder={'Head of department'}
              size={'large'}
              value={
                state.controls.headOfDepartment.name || 'Search by First Name'
              }
              handleChange={(e, d) => {
                const value = {
                  name: e,
                  userId: d.key,
                };
                handleInput(e, value, 'headOfDepartment');
                setState((p) => ({
                  ...p,
                  controls: {
                    ...p.controls,
                    headOfDepartmentPhone: d.phone,
                  },
                }));
              }}
              onSearch={(e) => searchMember(e)}
              options={data?.length > 0 ? data : []}
              loading={isFetching}
              status={isError ? 'error' : ''}
            />
          </div>
          <div className='child'>
            <label>Head of Department Phone</label>
            <Input
              name='headOfDepartmentPhone'
              placeholder={'Head of department phone'}
              size={'large'}
              value={state.controls.headOfDepartmentPhone}
              handleChange={(e, d) => {
                handleInput(e.target.value, d, 'headOfDepartmentPhone');
              }}
            />
          </div>
          <div className='child'>
            <label>Minister In Charge</label>
            <Select
              name='ministerInCharge'
              placeholder={'Minister in charge'}
              size={'large'}
              value={
                state.controls.ministerInCharge.name || 'Search by first name'
              }
              handleChange={(e, d) => {
                const value = {
                  name: e,
                  userId: d.key,
                };
                handleInput(e, value, 'ministerInCharge');
              }}
              onSearch={(e) => searchMember(e)}
              options={data?.length > 0 ? data : []}
            />
          </div>
        </ContainerInput>
      </Content>
    </Modals>
  );
};

export default AddDepartmentModal;

AddDepartmentModal.propTypes = {
  state: propTypes.object,
  setState: propTypes.func,
  handleInput: propTypes.func,
  handleSubmit: propTypes.func,
  isLoading: propTypes.bool,
  handleReset: propTypes.func,
};
