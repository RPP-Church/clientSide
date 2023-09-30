import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosPrivate from '../../services/usePrivate';
import { Table } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';
import { ErrorHandler } from '../../components/ErrorHandler';
import { Modal } from 'antd';
import { DatePicker } from 'antd';

const Section = styled.section`
  background-color: #eee;
  .tableDiv {
    padding: 3rem 1rem;
  }

  .btn {
    display: flex;
    justify-content: end;
    padding-top: 2rem;
    padding-right: 1rem;
  }

  .ant-select,
  .ant-select-single {
    width: 100% !important;
  }
`;

const Header = styled.div`
  background-color: #f1efef;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  height: 62px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  padding: 0 10px;
  gap: 10px;
`;

const columns = [
  {
    title: 'First Name',
    dataIndex: 'firstName',
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
  },
  {
    title: 'Marital Status',
    dataIndex: 'maritalStatus',
  },
  {
    title: 'Position',
    dataIndex: 'position',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Membership',
    dataIndex: 'membershipType',
  },
  {
    title: 'Date Joined',
    dataIndex: 'joinedDate',
  },
];
const Index = () => {
  const axios = useAxiosPrivate();
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
  });
  const [formdata, setFormdata] = useState({
    firstName: '',
    address: '',
    position: '',
    gender: '',
  });

  const [usebounce, setBounce] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const { isLoading, data, refetch } = useQuery({
    queryKey: ['allevents', usebounce],
    queryFn: async () => {
      const data = await axios.get(`/user`, {
        params: {
          name: formdata.firstName,
          gender: formdata.gender,
        },
      });
      return data;
    },
    retry: false,
  });

  const { data: departmentRes } = useQuery({
    queryKey: ['departments'],
    queryFn: async () => {
      const { data } = await axios.get(`/department`);

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

  const { mutate } = useMutation({
    mutationFn: async (form) => {
      return await axios.post('/user', form);
    },
    onSuccess: () => {
      setIsModalOpen(false);
      refetch();
    },
    onError: (error) => {
      const message = ErrorHandler(error);
      alert(message.data.msg);
    },
  });

  const TableData = useMemo(() => {
    return data?.data?.length > 0
      ? data?.data?.map((item) => {
          return {
            key: item._id,
            firstName: item?.firstName,
            lastName: item?.lastName,
            gender: item.gender,
            phone: item?.phone,
            maritalStatus: item?.maritalStatus,
            position: item?.position,
            address: item?.address,
            membershipType: item?.membershipType,
            joinedDate: new Date(item?.joinedDate).toUTCString()?.slice(0, -12),
          };
        })
      : [];
  }, [data?.data]);

  const handleFormdata = (e, data, d) => {
    setFormdata((p) => ({
      ...p,
      [d ? d : e?.target?.name]:
        data && data?.value ? data?.value : e?.target?.value,
    }));
  };

  const handleAddMember = (e, data, d) => {
    if (d && d === 'joinedDate') {
      setAddMember((p) => ({
        ...p,
        joinedDate: data,
      }));
      return;
    }
    setAddMember((p) => ({
      ...p,
      [d ? d : e?.target?.name]:
        data && data?.value ? data.value : e?.target?.value,
    }));
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
    };

    mutate(data);
  };

  useEffect(() => {
    let timer;
    if (formdata) {
      clearTimeout(timer);
      setTimeout(() => {
        setBounce(formdata);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [formdata]);

  return (
    <Section>
      <Modal
        title='Add New Member'
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleCreateMember}
        okText='Add New'
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
      </Modal>
      <div className='btn'>
        <Button
          text={'Add Member'}
          background={'transparent'}
          border={'1px solid #333'}
          radius={'6px'}
          size={'.9rem'}
          hoverBackground={'#090808'}
          hoverColor={'#fff'}
          onClick={showModal}
        />
      </div>
      <div className='tableDiv'>
        <Header>
          <div>
            <Input
              type={'text'}
              placeholder={'Frist Name'}
              handleChange={handleFormdata}
              name='firstName'
            />
          </div>
          <div>
            <Input
              type={'text'}
              placeholder={'address'}
              handleChange={handleFormdata}
              name='address'
            />
          </div>
          <div>
            <Input
              type={'text'}
              placeholder={'position'}
              handleChange={handleFormdata}
              name='position'
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
              handleChange={handleFormdata}
            />
          </div>
        </Header>

        <Table
          loading={isLoading}
          columns={columns}
          dataSource={TableData}
          scroll={{ x: true, scrollToFirstRowOnChange: true }}
        />
      </div>
    </Section>
  );
};

export default Index;

const Form = styled.form`
  margin-top: 2rem;
  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 11px;
  }
`;
