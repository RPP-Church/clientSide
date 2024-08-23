import { Card } from 'antd';
import Input from '../../../../components/Input';
import Select from '../../../../components/Select';
import propTypes from 'prop-types';

const Details = ({ state, handleInput, data }) => {
  return (
    <div className='profileContent'>
      <div className='inputWrapper'>
        <div className='inputContainer'>
          <div className='child'>
            <label>CATEGORY</label>
            <Input
              value={state.controls.category}
              size={'large'}
              disabled
              style={{ color: 'black' }}
            />
          </div>
          <div className='child'>
            <label>TITLE</label>
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
              value={state.controls.title}
              size={'large'}
              style={{ color: 'black' }}
              handleChange={(e, d, name) => handleInput(e, d, name)}
              name={'title'}
              disabled={state.update}
            />
          </div>
        </div>
        <div className='inputContainer'>
          <div className='child'>
            <label>FIRST NAME</label>
            <Input
              value={state.controls.firstName}
              size={'large'}
              disabled={state.update}
              style={{ color: 'black' }}
              handleChange={(e, d) =>
                handleInput(e.target.value, d, 'firstName')
              }
            />
          </div>
          <div className='child'>
            <label>LAST NAME</label>
            <Input
              value={state.controls.lastName}
              size={'large'}
              disabled={state.update}
              style={{ color: 'black' }}
              handleChange={(e, d) =>
                handleInput(e.target.value, d, 'lastName')
              }
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
          <div className='child'>
            <label>ADDRESS</label>
            <Input
              value={state.controls.address}
              size={'large'}
              disabled={state.update}
              style={{ color: 'black' }}
              handleChange={(e, d) => handleInput(e.target.value, d, 'address')}
            />
          </div>
        </div>
        <div className='inputContainer'>
          <div className='child'>
            <label>PHONE</label>
            <Input
              value={state.controls.phone}
              size={'large'}
              style={{ color: 'black' }}
              disabled={
                state.controls.category === 'Children' ? true : state.update
              }
              handleChange={(e, d) => handleInput(e.target.value, d, 'phone')}
            />
          </div>
          <div className='child'>
            <label>EMAIL</label>
            <Input
              value={state.controls.email}
              size={'large'}
              disabled={
                state.controls.category === 'Children' ? true : state.update
              }
              style={{ color: 'black' }}
              handleChange={(e, d) => handleInput(e.target.value, d, 'email')}
            />
          </div>
        </div>
        <div className='inputContainer'>
          <div className='child'>
            <label>MARITAL STATUS</label>
            <Select
              options={[
                { key: 1, label: 'Single', value: 'Single' },
                { key: 2, label: 'Married', value: 'Married' },
                { key: 3, label: 'Divorce', value: 'Divorce' },
              ]}
              placeholder={'Select Status'}
              defaultValue={state.controls.maritalStatus}
              name='maritalStatus'
              disabled={
                state.controls.category === 'Children' ? true : state.update
              }
              style={{ color: 'black' }}
              handleChange={(e, d, name) => handleInput(e, d, name)}
            />
          </div>
          <div className='child'>
            <label>SPOUSE NAME</label>
            <Input
              value={state.controls.spouseName}
              size={'large'}
              disabled
              style={{ color: 'black' }}
            />
          </div>
        </div>
        <div className='inputContainer'>
          <div className='child'>
            <label>MEMBERSHIP</label>
            <Select
              options={[
                {
                  key: 1,
                  label: 'Existing Member',
                  value: 'Existing Member',
                },
                { key: 2, label: 'New Member', value: 'New Member' },
              ]}
              placeholder={'Select Status'}
              value={state.controls.membershipType}
              size={'large'}
              disabled={
                state.controls.membershipType === 'Existing Member'
                  ? true
                  : state.update
              }
              style={{ color: 'black' }}
              name='membershipType'
              handleChange={(e, d, name) =>
                handleInput(e.target.value, d, name)
              }
            />
          </div>
          <div className='child'>
            <label>DOB</label>
            <Input
              value={state.controls.dateOfBirth}
              size={'large'}
              disabled={state.update}
              style={{ color: 'black' }}
              handleChange={(e, d) =>
                handleInput(e.target.value, d, 'dateOfBirth')
              }
            />
          </div>
        </div>
        <div className='inputContainer'>
          <div className='child'>
            <label>DEPARTMENT</label>
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
              width={'100%'}
              size={'large'}
              disabled={
                state.controls.category === 'Children' ? true : state.update
              }
              style={{ color: 'black' }}
              handleChange={(e, d, name) => handleInput(e, d, name)}
            />
          </div>
          <div className='child'>
            <label>JOINED DATE</label>
            <Input
              value={state.controls.joinedDate}
              size={'large'}
              disabled
              style={{ color: 'black' }}
            />
          </div>
        </div>
      </div>
      <div className='attendanceContainer'>
        <h4>Attendances:</h4>
        <div className='attendance'>
          {state.controls.attendance?.map((item) => (
            <Card key={item.serviceId}>
              <p>Sevice Name: {item.serviceName}</p>
              <p>Date: {item.date}</p>
              <p>Time: {item.time || '---'}</p>
              <p>Attendance: {item.attendance}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;

Details.propTypes = {
  state: propTypes.object,
  handleInput: propTypes.func,
  data: propTypes.array,
};
