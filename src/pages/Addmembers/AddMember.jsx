import {  useState } from 'react';
import Steper from '../../components/Steper';
import { DatePicker, Input as Inp } from 'antd';
import Select from '../../components/Select';
import Input from '../../components/Input';
import styled from 'styled-components';
import propTypes from 'prop-types';
import { useMutation, useQuery } from '@tanstack/react-query';
import api from '../../services/api';
import { ErrorHandler } from '../../components/ErrorHandler';
import { useSearchParams } from 'react-router-dom';
import Query from './Query';
import dayjs from 'dayjs';
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  label {
    color: #090808;

    span {
      color: red;
    }
  }

  .ant-input,
  .ant-select-selector,
  .ant-picker {
    border-color: #090808 !important;
  }
`;

const AddMember = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [addmember, setAddMember] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    position: '',
    membershipType: '',
    gender: '',
    department: '',
    maritalStatus: '',
    joinedDate: '',
    DOB: '',
    interest: '',
  });
  const dd = Query({ searchParams, setAddMember });

  const { data: departmentRes, isLoading } = useQuery({
    queryKey: ['departments'],
    queryFn: async () => {
      const { data } = await api.get(`/open/department`);
      let options = [];

      options = data?.data.map((item) => ({
        key: item._id,
        label: item.name,
        value: item._id,
      }));

      return options;
    },
    retry: false,
  });

  const handleAddMember = (e, data, d) => {
    if ((d && d === 'joinedDate') || d === 'DOB') {
      setAddMember((p) => ({
        ...p,
        [d]: data,
      }));
      return;
    }
    setAddMember((p) => ({
      ...p,
      [d ? d : e?.target?.name]:
        data && data?.value ? data.value : e?.target?.value,
    }));
  };

  const { mutate, isLoading: loadingAdd } = useMutation({
    mutationFn: async (form) => {
      return await api.post('/open/createuser', form);
    },
    onSuccess: () => {
      alert('Member register successfully');
      setSearchParams((params) => {
        params.delete('firstName');
        params.delete('lastName');
        params.delete('email');
        params.delete('phone');
        params.delete('address');
        params.delete('position');
        params.delete('membershipType');
        params.delete('gender');
        params.delete('department');
        params.delete('maritalStatus');
        params.delete('joinedDate');
        params.delete('DOB');
        params.delete('interest');

        return params;
      });
      setAddMember({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        position: '',
        membershipType: '',
        gender: '',
        department: '',
        maritalStatus: '',
        joinedDate: '',
        DOB: '',
        interest: '',
      });
    },
    onError: (error) => {
      const message = ErrorHandler(error);
      alert(message.data.msg);
    },
  });

  const handleQueryToUrl = () => {
    const queryString = `${
      addmember?.firstName ? `firstName=${addmember.firstName}` : ``
    }${addmember?.lastName ? `&lastName=${addmember.lastName}` : ``}${
      addmember?.gender ? `&gender=${addmember.gender}` : ``
    }${addmember?.email ? `&email=${addmember.email}` : ``}${
      addmember?.phone ? `&phone=${addmember.phone}` : ``
    }${addmember?.address ? `&address=${addmember.address}` : ''}${
      addmember?.DOB ? `&DOB=${addmember.DOB}` : ''
    }${addmember?.department ? `&department=${addmember.department}` : ``}${
      addmember?.interest ? `&interest=${addmember.interest}` : ``
    }${addmember?.joinedDate ? `&joinedData=${addmember.joinedDate}` : ``}${
      addmember?.membershipType ? `&interest=${addmember.membershipType}` : ``
    }${addmember?.position ? `&interest=${addmember.position}` : ``}${
      addmember?.maritalStatus ? `&interest=${addmember.maritalStatus}` : ``
    }`;

    setSearchParams(queryString);
  };
  const handleCreateMember = () => {
    const data = {
      firstName: addmember.firstName,
      lastName: addmember.lastName,
      gender: addmember.gender,
      phone: addmember.phone,
      maritalStatus: addmember.maritalStatus,
      email: addmember.email,
      address: addmember.address,
      departments: addmember.department,
      membershipType: addmember.membershipType,
      position: addmember.position,
      joinedDate: addmember.joinedDate,
      dob: addmember.DOB,
      interest: addmember.interest,
    };

    mutate(data);
  };

  const items = [
    {
      title: 'Bio-Data',
      child: (
        <PersonalInfo handleAddMember={handleAddMember} addmember={addmember} />
      ),
    },
    {
      title: 'Church-Data',
      child: (
        <Relationship
          handleAddMember={handleAddMember}
          isLoading={isLoading}
          departmentRes={departmentRes}
          addmember={addmember}
        />
      ),
    },
  ];

  return (
    <div style={{ margin: '10px 5px' }}>
      <Steper
        handleAddMember={handleAddMember}
        items={items}
        sumbit={handleCreateMember}
        handleQueryToUrl={handleQueryToUrl}
        loading={loadingAdd}
      />
      ;
    </div>
  );
};

export default AddMember;

const PersonalInfo = ({ handleAddMember, addmember }) => {
  return (
    <Wrapper>
      <div>
        <label>
          First Name <span>&#42;</span>
        </label>
        <Input
          placeholder={'First Name'}
          handleChange={handleAddMember}
          name='firstName'
          value={addmember.firstName}
        />
      </div>
      <div>
        <label>
          Last Name <span>&#42;</span>
        </label>

        <Input
          placeholder={'Last Name'}
          name='lastName'
          handleChange={handleAddMember}
          value={addmember.lastName}
        />
      </div>
      <div>
        <label>
          Email <span>&#42;</span>
        </label>

        <Input
          placeholder={'Email'}
          name='email'
          handleChange={handleAddMember}
          value={addmember.email}
        />
      </div>
      <div>
        <label>
          Gender <span>&#42;</span>
        </label>
        <Select
          width='100%'
          placeholder={'Select gender'}
          options={[
            { key: 1, label: 'Male', value: 'Male' },
            { key: 2, label: 'Female', value: 'Female' },
          ]}
          name='gender'
          handleChange={handleAddMember}
          value={addmember.gender}
        />
      </div>
      <div>
        <label>
          Marital Status <span>&#42;</span>
        </label>
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
          value={addmember.maritalStatus}
        />
      </div>
      <div>
        <label>
          Date of Birth <span>&#42;</span>
        </label>
        <DatePicker
          onChange={(e, d) => handleAddMember(e, d, 'DOB')}
          format={'MM-DD'}
          value={addmember.DOB && dayjs(addmember.DOB)}
        />
      </div>
      <div>
        <label>Phone</label>
        <Input
          placeholder={'Phone'}
          name='phone'
          handleChange={handleAddMember}
          value={addmember.phone}
        />
      </div>
      <div>
        <label>
          Address <span>&#42;</span>
        </label>
        <Input
          placeholder={'Address'}
          name='address'
          handleChange={handleAddMember}
          value={addmember.address}
        />
      </div>
    </Wrapper>
  );
};

const Relationship = ({
  handleAddMember,
  isLoading,
  departmentRes,
  addmember,
}) => {
  const { TextArea } = Inp;
  return (
    <Wrapper>
      <div>
        <label>Position</label>
        <Input
          placeholder={'Position'}
          name='position'
          handleChange={handleAddMember}
          value={addmember.position}
        />
      </div>

      <div>
        <label>
          Membership <span>&#42;</span>
        </label>
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
          value={addmember.membershipType}
        />
      </div>

      <div>
        <label>Department</label>
        <Select
          width='100%'
          placeholder={'Select department'}
          options={departmentRes}
          isLoading={isLoading}
          name='department'
          handleChange={handleAddMember}
          value={addmember.department}
        />
      </div>
      <div>
        <label>Department of Interest</label>
        <TextArea
          width='100%'
          placeholder={'Please indicate the department of interest'}
          name='interest'
          onChange={(e, d) => handleAddMember(e, d, 'interest')}
          value={addmember.interest}
        />
      </div>
      <div>
        <label>Date you joined the church</label>
        <DatePicker
          onChange={(e, d) => handleAddMember(e, d, 'joinedDate')}
          value={addmember.joinedDate}
        />
      </div>
    </Wrapper>
  );
};

PersonalInfo.propTypes = {
  handleAddMember: propTypes.func,
  addmember: propTypes.object,
};

Relationship.propTypes = {
  handleAddMember: propTypes.func,
  isLoading: propTypes.bool,
  departmentRes: propTypes.array,
  addmember: propTypes.object,
};
