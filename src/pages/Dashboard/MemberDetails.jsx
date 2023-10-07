import { useNavigate, useParams } from 'react-router-dom';
import useAxiosPrivate from '../../services/usePrivate';
import { useMutation, useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { Avatar, Card, Popconfirm, Skeleton } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import Modals from '../../components/Modal';
import { useState } from 'react';
import Select from '../../components/Select';
import Input from '../../components/Input';
import { getDepartments } from '../../services/getDepartment';
import { ErrorHandler } from '../../components/ErrorHandler';
const { Meta } = Card;
const Section = styled.section`
  background-color: #eee;
  height: 100vh;

  .tableDiv {
    padding: 3rem 1rem;
  }

  .cardBody {
    margin-top: 2rem;
    p {
      margin: 10px 0;
      font-size: 1rem;
      font-weight: 300;
      font-style: italic;
    }
  }
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MemberDetails = () => {
  const navigate = useNavigate();
  const department = getDepartments();
  const axios = useAxiosPrivate();
  const { id } = useParams();
  const [state, setState] = useState({
    isOpen: false,
  });
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
  });

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['details', id],
    queryFn: async () => {
      const { data } = await axios.get(`/user`, {
        params: {
          userId: id,
        },
      });
      if (data && data.length > 0) {
        setAddMember({ ...data[0], department: data[0]?.departments[0] });
      }

      return data;
    },
    retry: false,
  });

  const handleFormdata = (e, data, d) => {
    if (d && d === 'dob') {
      setAddMember((p) => ({
        ...p,
        dob: data,
      }));

      return;
    }
    setAddMember((p) => ({
      ...p,
      [d ? d : e?.target?.name]:
        data && data?.value ? data?.value : e?.target?.value,
    }));
  };

  const finddep = (Id) => {
    let dpartment =
      department && department.length > 0
        ? department.find((c) => c.key === Id)
        : '';

    return dpartment && dpartment.label;
  };

  const { mutate, isLoading: loadingAdd } = useMutation({
    mutationFn: async (form) => {
      return await axios.patch(`/user/${id}`, form);
    },
    onSuccess: () => {
      setState((p) => ({ ...p, isOpen: false }));
      refetch();
    },
    onError: (error) => {
      const message = ErrorHandler(error);
      alert(message.data.msg);
    },
  });

  const handleUpdate = () => {
    const data = {
      firstName: addmember.firstName,
      lastName: addmember.lastName,
      phone: addmember.phone,
      maritalStatus: addmember.maritalStatus,
      address: addmember.address,
      departments: addmember.department,
      position: addmember.position,
      membershipType: addmember.membershipType,
    };

    mutate(data);
  };

  const DeleteUser = useMutation({
    mutationFn: async (form) => {
      return await axios.delete(`/user/${id}`, form);
    },
    onSuccess: () => {
      navigate('/dashboard');
    },
    onError: (error) => {
      const message = ErrorHandler(error);
      alert(message.data.msg);
    },
  });

  return (
    <Section>
      <Modals
        title={'Update Member'}
        open={state.isOpen}
        onCancel={() => setState((p) => ({ ...p, isOpen: false }))}
        children={
          <FormData
            addmember={addmember}
            handleFormdata={handleFormdata}
            department={department}
            handleUpdate={handleUpdate}
            loading={loadingAdd}
          />
        }
        handleOK={handleUpdate}
        loading={loadingAdd}
        // okText={okText}
        // children
        // confirmLoading={loading}
      />
      <div className='tableDiv'>
        <Card
          style={
            {
              // width: 300,
              // marginTop: 16,
            }
          }
          actions={[
            <EditOutlined
              key='edit'
              onClick={() => setState((p) => ({ ...p, isOpen: true }))}
            />,
            <Popconfirm
              title='Sure to delete?'
              onConfirm={(e) => DeleteUser.mutate()}
              disabled={DeleteUser.isLoading}
            >
              <DeleteOutlined size={20} />
            </Popconfirm>,
          ]}
        >
          <Skeleton loading={isLoading || DeleteUser.isLoading} avatar active>
            {data &&
              data.length > 0 &&
              data.map((item) => (
                <div key={item._id}>
                  <Meta
                    key={item._id}
                    avatar={
                      <Avatar src='https://xsgames.co/randomusers/avatar.php?g=pixel&key=2' />
                    }
                    title={`${item.firstName} ${item.lastName}`}
                    description={item.email}
                  />
                  <div className='cardBody'>
                    <p>Address: {item.address}</p>
                    <p>Gender: {item.gender}</p>
                    <p>Phone: {item.phone}</p>
                    <p>Membership: {item.membershipType}</p>
                    <p>Status: {item.maritalStatus}</p>
                    <p>
                      Department:{' '}
                      {item?.departments && item?.departments[0]
                        ? finddep(item?.departments[0])
                        : ''}
                    </p>
                    <p>
                      Date of Birth:{' '}
                      {new Date(item.dob).toDateString() !== 'Invalid Date'
                        ? new Date(item.dob).toDateString().slice(3, -4)
                        : ''}
                    </p>
                    <p>
                      Position:{' '}
                      {item.position ? item.position : 'No position held'}
                    </p>
                    <p>
                      Date Joined: {new Date(item.joinedDate).toDateString()}
                    </p>
                  </div>
                </div>
              ))}
          </Skeleton>
        </Card>
      </div>
    </Section>
  );
};

export default MemberDetails;

const FormData = ({ addmember, handleFormdata, department }) => {
  return (
    <Div>
      <div>
        <Input
          type={'text'}
          placeholder={'First Name'}
          handleChange={handleFormdata}
          name='firstName'
          value={addmember.firstName}
        />
      </div>
      <div>
        <Input
          type={'text'}
          placeholder={'Last Name'}
          handleChange={handleFormdata}
          name='lastName'
          value={addmember.lastName}
        />
      </div>
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
          value={addmember.membershipType}
        />
      </div>

      <div>
        <Select
          width='100%'
          placeholder={'Select department'}
          options={department}
          name='department'
          handleChange={handleFormdata}
          value={addmember && addmember.department}
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
          value={addmember.maritalStatus}
        />
      </div>
      {/* <div>
        <Select
          width='100%'
          placeholder={'Select Gender'}
          options={[
            { key: 1, label: 'Male', value: 'Male' },
            { key: 2, label: 'Female', value: 'Female' },
          ]}
          name='gender'
          handleChange={handleFormdata}
          value={addmember.gender}
        />
      </div> */}
      <div>
        <Input
          type={'text'}
          placeholder={'Position'}
          handleChange={handleFormdata}
          name='position'
          value={addmember.position}
        />
      </div>
      <div>
        <Input
          type={'text'}
          placeholder={'Address'}
          handleChange={handleFormdata}
          name='address'
          value={addmember.address}
        />
      </div>
      <div>
        <Input
          type={'text'}
          placeholder={'Phone'}
          handleChange={handleFormdata}
          name='phone'
          value={addmember.phone}
        />
      </div>
    </Div>
  );
};
