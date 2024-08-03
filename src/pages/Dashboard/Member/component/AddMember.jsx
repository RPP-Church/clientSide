import styled from 'styled-components';
import Input from '../../../../components/Input';
import Modals from '../../../../components/Modal';
import Select from '../../../../components/Select';
import propTypes from 'prop-types';
import { FetchDepartments } from '../../../../services/fetchDepartments';
import { FaAsterisk } from 'react-icons/fa';
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

const AddMemberModal = ({
  state,
  setState,
  handleInput,
  handleSubmit,
  isLoading,
}) => {
  const { data } = FetchDepartments();

  return (
    <Modals
      open={state.open}
      width={'50%'}
      onCancel={() => setState((p) => ({ ...p, open: false }))}
      handleOK={handleSubmit}
      loading={isLoading}
      okText={'Create'}
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
              Category{' '}
              <span>
                <FaAsterisk size={8} color='red' />
              </span>
            </label>
            <Select
              status={
                state.focusCategory.error && state.focusCategory.focus
                  ? 'error'
                  : ''
              }
              options={[
                { key: 1, label: 'Adult', value: 'Adult' },
                { key: 2, label: 'Teen', value: 'Teen' },
                { key: 3, value: 'Children', label: 'Child' },
              ]}
              placeholder={'Select Category'}
              value={state.controls.category}
              name='category'
              handleChange={(e, d, name) => {
                setState((p) => ({
                  ...p,
                  focusCategory: {
                    ...p.focusCategory,
                    error: e?.length > 3 ? false : true,
                  },
                }));
                handleInput(e, d, name);
              }}
              handleFocus={() =>
                setState((p) => ({
                  ...p,
                  focusCategory: {
                    ...p.focusCategory,
                    focus: true,
                  },
                }))
              }
              handleBlur={() =>
                setState((p) => ({
                  ...p,
                  focusCategory: {
                    ...p.focusCategory,
                    focus: false,
                  },
                }))
              }
            />
          </div>
          {state?.controls?.category !== 'Children' && (
            <div className='child'>
              <label>Title</label>
              <Select
                options={[
                  { key: 1, label: 'Mr', value: 'Mr' },
                  { key: 2, label: 'Mrs', value: 'Mrs' },
                  { key: 3, value: 'Miss', label: 'Miss' },
                  { key: 4, value: 'Dcn', label: 'Dcn' },
                  { key: 5, value: 'Pastor', label: 'Pastor' },
                  { key: 6, value: 'Asst. Pastor', label: 'Asst. Pastor' },
                  { key: 7, value: 'Elder', label: 'Elder' },
                ]}
                placeholder={'Select Title'}
                value={state.controls.tttle}
                name='title'
                handleChange={(e, d, name) => handleInput(e, d, name)}
              />
            </div>
          )}
        </ContainerInput>
        <ContainerInput>
          <div className='child'>
            <label>
              FirstName <FaAsterisk size={8} color='red' />
            </label>
            <Input
              status={
                state.focusFirstName.error && state.focusFirstName.focus
                  ? 'error'
                  : ''
              }
              name='firstName'
              placeholder={'John'}
              size={'large'}
              value={state.controls.firstName}
              handleChange={(e, d) => {
                setState((p) => ({
                  ...p,
                  focusFirstName: {
                    ...p.focusFirstName,
                    error: e.target.value.length > 2 ? false : true,
                  },
                }));
                handleInput(e.target.value, d, 'firstName');
              }}
              handleFocus={() =>
                setState((p) => ({
                  ...p,
                  focusFirstName: {
                    ...p.focusFirstName,
                    focus: true,
                  },
                }))
              }
              handleBlur={() =>
                setState((p) => ({
                  ...p,
                  focusFirstName: {
                    ...p.focusFirstName,
                    focus: false,
                  },
                }))
              }
            />
          </div>
          <div className='child'>
            <label>
              LastName <FaAsterisk size={8} color='red' />
            </label>
            <Input
              status={
                state.focusLastName.error && state.focusLastName.focus
                  ? 'error'
                  : ''
              }
              name='lastName'
              placeholder={'Doe'}
              size={'large'}
              value={state.controls.lastName}
              handleChange={(e, d) => {
                setState((p) => ({
                  ...p,
                  focusLastName: {
                    ...p.focusLastName,
                    error: e.target.value.length > 2 ? false : true,
                  },
                }));
                handleInput(e.target.value, d, 'lastName');
              }}
              handleFocus={() =>
                setState((p) => ({
                  ...p,
                  focusLastName: {
                    ...p.focusLastName,
                    focus: true,
                  },
                }))
              }
              handleBlur={() =>
                setState((p) => ({
                  ...p,
                  focusLastName: {
                    ...p.focusLastName,
                    focus: false,
                  },
                }))
              }
            />
          </div>
        </ContainerInput>
        <ContainerInput>
          <div className='child'>
            <label>
              Gender <FaAsterisk size={8} color='red' />
            </label>
            <Select
              status={
                state.focusGender.error && state.focusGender.focus
                  ? 'error'
                  : ''
              }
              options={[
                { key: 1, label: 'Male', value: 'Male' },
                { key: 2, label: 'Female', value: 'Female' },
              ]}
              placeholder={'Select Gender'}
              value={state.controls.gender}
              name='gender'
              handleChange={(e, d, name) => {
                setState((p) => ({
                  ...p,
                  focusGender: {
                    ...p.focusGender,
                    error: e?.length > 3 ? false : true,
                  },
                }));
                handleInput(e, d, name);
              }}
              handleFocus={() =>
                setState((p) => ({
                  ...p,
                  focusGender: {
                    ...p.focusGender,
                    focus: true,
                  },
                }))
              }
              handleBlur={() =>
                setState((p) => ({
                  ...p,
                  focusGender: {
                    ...p.focusGender,
                    focus: false,
                  },
                }))
              }
            />
          </div>
          <div className='child'>
            <label>Address</label>
            <Input
              name='address'
              placeholder={'Enter Address'}
              size={'large'}
              value={state.controls.address}
              handleChange={(e, d) => handleInput(e.target.value, d, 'address')}
            />
          </div>
        </ContainerInput>
        {state?.controls?.category !== 'Children' && (
          <ContainerInput>
            <div className='child'>
              <label>Phone Number</label>
              <Input
                name='phone'
                placeholder={'0902XXXXXXX'}
                size={'large'}
                value={state.controls.phone}
                handleChange={(e, d) => handleInput(e.target.value, d, 'phone')}
              />
            </div>
            <div className='child'>
              <label>Email</label>
              <Input
                name='email'
                placeholder={'Enter email'}
                size={'large'}
                value={state.controls.email}
                handleChange={(e, d) => handleInput(e.target.value, d, 'email')}
              />
            </div>
          </ContainerInput>
        )}
        {state?.controls?.category !== 'Children' && (
          <ContainerInput>
            <div className='child'>
              <label>Marital Status</label>
              <Select
                options={[
                  { key: 1, label: 'Single', value: 'Single' },
                  { key: 2, label: 'Married', value: 'Married' },
                  { key: 3, label: 'Divorce', value: 'Divorce' },
                ]}
                placeholder={'Select Status'}
                value={state.controls.maritalStatus}
                name='maritalStatus'
                handleChange={(e, d, name) => handleInput(e, d, name)}
              />
            </div>
            <div className='child'>
              <label>Spouse Name</label>
              <Input
                name='spouseName'
                placeholder={'Enter Spouse Name'}
                size={'large'}
                value={state.controls.spouseName}
                handleChange={(e, d) =>
                  handleInput(e.target.value, d, 'spouseName')
                }
              />
            </div>
          </ContainerInput>
        )}
        <ContainerInput>
          <div className='child'>
            <label>
              Membership <FaAsterisk size={8} color='red' />
            </label>
            <Select
              status={
                state.focusMember.error && state.focusMember.focus
                  ? 'error'
                  : ''
              }
              options={[
                { key: 1, label: 'Existing Member', value: 'Existing Member' },
                { key: 2, label: 'New Member', value: 'New Member' },
              ]}
              placeholder={'Select Status'}
              value={state.controls.membershipType}
              name='membershipType'
              handleChange={(e, d, name) => {
                setState((p) => ({
                  ...p,
                  focusMember: {
                    ...p.focusMember,
                    error: e?.length > 3 ? false : true,
                  },
                }));
                handleInput(e, d, name);
              }}
              handleFocus={() =>
                setState((p) => ({
                  ...p,
                  focusMember: {
                    ...p.focusMember,
                    focus: true,
                  },
                }))
              }
              handleBlur={() =>
                setState((p) => ({
                  ...p,
                  focusMember: {
                    ...p.focusMember,
                    focus: false,
                  },
                }))
              }
            />
          </div>
          <div className='child'>
            <label>Dirth of Birth: (MM/DD) </label>
            <Input
              name='dateOfBirth'
              placeholder={'07/07'}
              size={'large'}
              value={state.controls.dateOfBirth}
              handleChange={(e, d) =>
                handleInput(e.target.value, d, 'dateOfBirth')
              }
            />
          </div>
        </ContainerInput>
        {state?.controls?.category !== 'Children' && (
          <ContainerInput>
            <div className='child'>
              <label>Department</label>
              <Select
                mode={'tags'}
                options={
                  data?.length > 0
                    ? data.map((item) => ({
                        key: item._id,
                        label: item.name,
                        value: item.name,
                        deptId: item._id,
                        name: item.name,
                      }))
                    : []
                }
                placeholder={'Select Status'}
                value={state.controls.departments}
                name='departments'
                handleChange={(e, d, name) => handleInput(e, d, name)}
                width={'100%'}
              />
            </div>
            <div className='child'>
              <label>Joined Date: (MM/DD/YYYY) </label>
              <Input
                name='joinedDate'
                placeholder={'07/07/2004'}
                size={'large'}
                value={state.controls.joinedDate}
                handleChange={(e, d) =>
                  handleInput(e.target.value, d, 'joinedDate')
                }
              />
            </div>
          </ContainerInput>
        )}
      </Content>
    </Modals>
  );
};

export default AddMemberModal;

AddMemberModal.propTypes = {
  state: propTypes.object,
  setState: propTypes.func,
  handleInput: propTypes.func,
  handleSubmit: propTypes.func,
  isLoading: propTypes.bool,
};
