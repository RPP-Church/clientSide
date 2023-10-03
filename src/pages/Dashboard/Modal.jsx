import { DatePicker } from 'antd';
import Input from '../../components/Input';
import Select from '../../components/Select';
import styled from 'styled-components';
import propTypes from 'prop-types';
import Modals from '../../components/Modal';

const Form = styled.form`
  margin-top: 2rem;
  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 11px;
  }
`;

const Modal = ({
  isModalOpen,
  handleCreateMember,
  setIsModalOpen,
  handleAddMember,
  departmentRes,
  loading,
}) => {
  return (
    <Modals
      title='Add New Member'
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      handleOK={handleCreateMember}
      okText='Add New'
      loading={loading}
    >
      <Form>
        <div className='container'>
          <div>
            <Input
              placeholder={'First Name'}
              handleChange={handleAddMember}
              name='firstName'
            />
          </div>
          <div>
            <Input
              placeholder={'Last Name'}
              name='lastName'
              handleChange={handleAddMember}
            />
          </div>
          <div>
            <Input
              placeholder={'Email'}
              name='email'
              handleChange={handleAddMember}
            />
          </div>
          <div>
            <Input
              placeholder={'Phone'}
              name='phone'
              handleChange={handleAddMember}
            />
          </div>
          <div>
            <Input
              placeholder={'Address'}
              name='address'
              handleChange={handleAddMember}
            />
          </div>
          <div>
            <Input
              placeholder={'Position'}
              name='position'
              handleChange={handleAddMember}
            />
          </div>
          <div>
            <p>Date of Birth (Month & Day allowed)</p>
            <DatePicker
              onChange={(e, d) => handleAddMember(e, d, 'DOB')}
              format={'MM-DD'}
            />
          </div>
          <div>
            <Select
              width='100%'
              placeholder={'Select Status'}
              options={[
                { key: 1, label: 'Single', value: 'Single' },
                {
                  key: 2,
                  label: 'Married',
                  value: 'Married',
                },
                {
                  key: 3,
                  label: 'Divorce',
                  value: 'Divorce',
                },
              ]}
              name='maritalStatus'
              handleChange={handleAddMember}
            />
          </div>
          <div>
            <Select
              width='100%'
              placeholder={'Select Status'}
              options={[
                { key: 1, label: 'New Member', value: 'New Member' },
                {
                  key: 2,
                  label: 'Existing Member',
                  value: 'Existing Member',
                },
              ]}
              name='membershipType'
              handleChange={handleAddMember}
            />
          </div>
          <div>
            <Select
              width='100%'
              placeholder={'Select gender'}
              options={[
                { key: 1, label: 'Male', value: 'Male' },
                { key: 2, label: 'Female', value: 'Female' },
              ]}
              name='gender'
              handleChange={handleAddMember}
            />
          </div>
          <div>
            <Select
              width='100%'
              placeholder={'Select department'}
              options={departmentRes}
              name='department'
              handleChange={handleAddMember}
            />
          </div>
          <div>
            <p>Date Joined</p>
            <DatePicker
              onChange={(e, d) => handleAddMember(e, d, 'joinedDate')}
            />
          </div>
        </div>
      </Form>
    </Modals>
  );
};

export default Modal;

Modal.propTypes = {
  isModalOpen: propTypes.bool,
  handleCreateMember: propTypes.func,
  setIsModalOpen: propTypes.any,
  handleAddMember: propTypes.func,
  departmentRes: propTypes.array,
  loading: propTypes.any,
};
