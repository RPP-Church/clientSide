import { Drawer as Draw, DatePicker, Switch } from 'antd';
import propTypes from 'prop-types';
import Input from './Input';
import Select from './Select';
import styled from 'styled-components';
const { RangePicker } = DatePicker;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Drawer = ({
  open,
  placement,
  onClose,
  handleFormdata,
  departmentRes,
  formdata,
}) => {
  return (
    <Draw
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p>Add More Filter</p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <span>Sort Table</span>
            <Switch
              defaultChecked
              onChange={(e, d) => handleFormdata(e, d, 'sort')}
              size='small'
            />
          </div>
        </div>
      }
      placement={placement}
      closable={false}
      onClose={onClose}
      open={open}
      key={placement}
    >
      <Div>
        <div>
          <Select
            width='100%'
            placeholder={'Select Membership Type'}
            options={[
              { key: 1, label: 'New Member', value: 'New Member' },
              {
                key: 2,
                label: 'Existing Member',
                value: 'Existing Member',
              },
            ]}
            name='membershipType'
            handleChange={handleFormdata}
            value={formdata.membershipType}
          />
        </div>
        <div>
          <label>Date of Birth</label>
          <DatePicker onChange={(e, d) => handleFormdata(e, d, 'dob')} />
        </div>
        <div>
          <Select
            width='100%'
            placeholder={'Select department'}
            options={departmentRes}
            name='department'
            handleChange={handleFormdata}
            value={formdata.department}
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
            handleChange={handleFormdata}
            value={formdata.maritalStatus}
          />
        </div>
        <div>
          <Select
            width='100%'
            placeholder={'Select Gender'}
            options={[
              { key: 1, label: 'Male', value: 'Male' },
              { key: 2, label: 'Female', value: 'Female' },
            ]}
            name='gender'
            handleChange={handleFormdata}
            value={formdata.gender}
          />
        </div>
        <div>
          <Input
            type={'text'}
            placeholder={'Position'}
            handleChange={handleFormdata}
            name='position'
            value={formdata.position}
          />
        </div>
        <div>
          <Input
            type={'text'}
            placeholder={'Address'}
            handleChange={handleFormdata}
            name='address'
            value={formdata.address}
          />
        </div>
        <div>
          <label>Join Date</label>
          <RangePicker
            placeholder={['Start Date', 'End Date']}
            onChange={(e, d) => handleFormdata(e, d, 'fromstart')}
          />
        </div>
      </Div>
    </Draw>
  );
};

export default Drawer;

Drawer.propTypes = {
  open: propTypes.any,
  placement: propTypes.string,
  onClose: propTypes.func,
  handleFormdata: propTypes.func,
  departmentRes: propTypes.array,
  formdata: propTypes.object,
};
