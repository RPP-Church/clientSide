import styled from 'styled-components';
import Input from '../../../../components/Input';
import Modals from '../../../../components/Modal';
import propTypes from 'prop-types';

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
}) => {
  return (
    <Modals
      open={state.open}
      width={'40%'}
      onCancel={() => setState((p) => ({ ...p, open: false }))}
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
            <Input
              name='headOfDepartment'
              placeholder={'Head of department'}
              size={'large'}
              value={state.controls.headOfDepartment}
              handleChange={(e, d) => {
                handleInput(e.target.value, d, 'headOfDepartment');
              }}
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
            <Input
              name='ministerInCharge'
              placeholder={'Minister in charge'}
              size={'large'}
              value={state.controls.ministerInCharge}
              handleChange={(e, d) => {
                handleInput(e.target.value, d, 'ministerInCharge');
              }}
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
};
