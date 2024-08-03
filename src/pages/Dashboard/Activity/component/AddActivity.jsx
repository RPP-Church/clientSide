import styled from 'styled-components';
import Input from '../../../../components/Input';
import Modals from '../../../../components/Modal';
import propTypes from 'prop-types';
import Button from '../../../../components/Button';
import { Popconfirm } from 'antd';
import { useState } from 'react';
const ContainerInput = styled.div`
  display: block;
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

  .ant-select {
    width: 100% !important;
  }
`;

const Footer = ({ handleSubmit, date, onCancel }) => {
  const [open, setOpen] = useState(false);
  const showPopconfirm = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button
        text='Cancel'
        color={'black'}
        background={'transparent'}
        onClick={onCancel}
      />
      <Popconfirm
        title='Creating a service'
        description={() => (
          <span style={{ fontWeight: 600, color: 'red' }}>
            Please note system will use {date} as date to create this service{' '}
          </span>
        )}
        open={open}
        onConfirm={handleSubmit}
        onCancel={handleCancel}
      >
        <Button
          text='Create Service'
          color={'white'}
          radius={'4px'}
          onClick={showPopconfirm}
        />
      </Popconfirm>
    </div>
  );
};

Footer.propTypes = {
  handleSubmit: propTypes.func,
  date: propTypes.string,
  onCancel: propTypes.func,
};
const AddServiceModal = ({
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
      okText={'Create service'}
      footer={
        <Footer
          date={state.controls.date}
          handleSubmit={handleSubmit}
          onCancel={() => setState((p) => ({ ...p, open: false }))}
        />
      }
    >
      <Content>
        <ContainerInput>
          <div className='child'>
            <label>Service Name</label>
            <Input
              name='serviceName'
              placeholder={'Name of service'}
              size={'large'}
              value={state.controls.serviceName}
              handleChange={(e, d) => {
                handleInput(e.target.value, d, 'serviceName');
              }}
            />
          </div>
        </ContainerInput>
      </Content>
    </Modals>
  );
};

export default AddServiceModal;

AddServiceModal.propTypes = {
  state: propTypes.object,
  setState: propTypes.func,
  handleInput: propTypes.func,
  handleSubmit: propTypes.func,
  isLoading: propTypes.bool,
};
