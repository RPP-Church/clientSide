import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosPrivate from '../../services/usePrivate';
import { Table } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { ErrorHandler } from '../../components/ErrorHandler';

import Drawer from '../../components/Drawer';
import Modal from './Modal';

const Section = styled.section`
  background-color: #eee;
  /* height: 100vh; */
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

  .ant-drawer .ant-drawer-content-wrapper {
    bottom: -120px !important;
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
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
  },
  {
    title: 'Department',
    dataIndex: 'department',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
  },
  {
    title: 'DOB',
    dataIndex: 'dob',
  },
  {
    title: 'Status',
    dataIndex: 'status',
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
    DOB: '',
  });
  const [formdata, setFormdata] = useState({
    firstName: '',
    address: '',
    position: '',
    gender: '',
    maritalStatus: '',
    membershipType: '',
    department: '',
    dob: '',
    fromDate: '',
    toDate: '',
    sort: '',
  });

  const [usebounce, setBounce] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const { isLoading, data, refetch } = useQuery({
    queryKey: ['allevents', usebounce],
    queryFn: async () => {
      const data = await axios.get(`/user`, {
        params: {
          name: formdata.firstName,
          gender: formdata.gender,
          membershipType: formdata.membershipType,
          maritalStatus: formdata.maritalStatus,
          position: formdata.position,
          department: formdata.department,
          dob: formdata.dob,
          address: formdata.address,
          fromDate: formdata.fromDate,
          toDate: formdata.toDate,
          sort: formdata.sort,
        },
      });

      onClose();
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

  const finddep = (Id) => {
    let dpartment =
      departmentRes && departmentRes.length > 0
        ? departmentRes.find((c) => c.key === Id)
        : '';

    return dpartment && dpartment.label;
  };

  const TableData = useMemo(() => {
    return data?.data?.length > 0
      ? data?.data?.map((item) => {
          return {
            key: item._id,
            name: item?.firstName + ' ' + item?.lastName,
            dob: new Date(item?.dob).toUTCString()?.slice(0, -12),
            department:
              item?.departments && item?.departments[0]
                ? finddep(item?.departments[0])
                : '',
            gender: item.gender,
            phone: item?.phone,
            status: item?.maritalStatus,
            position: item?.position,
            address: item?.address,
            membershipType: item?.membershipType,
            joinedDate: new Date(item?.joinedDate).toUTCString()?.slice(0, -12),
          };
        })
      : [];
  }, [data?.data]);

  const handleFormdata = (e, data, d) => {
    if (d && d === 'sort') {
      setFormdata((p) => ({
        ...p,
        sort: e,
      }));
      return;
    }
    if (d && d === 'fromstart') {
      if (data && data[0] && data[1]) {
        setFormdata((p) => ({
          ...p,
          fromDate: data[0],
          toDate: data[1],
        }));
      }

      return;
    }
    if (d && d === 'dob') {
      setFormdata((p) => ({
        ...p,
        dob: data,
      }));

      return;
    }
    setFormdata((p) => ({
      ...p,
      [d ? d : e?.target?.name]:
        data && data?.value ? data?.value : e?.target?.value,
    }));
  };

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
    };

    mutate(data);
  };

  const handleReset = () => {
    setFormdata({
      firstName: '',
      address: '',
      position: '',
      gender: '',
      maritalStatus: '',
      membershipType: '',
      department: '',
      dob: '',
      fromDate: '',
      toDate: '',
    });
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
      <Drawer
        placement={'bottom'}
        onClose={onClose}
        showDrawer={showDrawer}
        open={open}
        handleFormdata={handleFormdata}
        departmentRes={departmentRes}
        formdata={formdata}
      />
      <Modal
        isModalOpen={isModalOpen}
        handleCreateMember={handleCreateMember}
        setIsModalOpen={setIsModalOpen}
        handleAddMember={handleAddMember}
        departmentRes={departmentRes}
      />
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
              value={formdata.firstName}
            />
          </div>

          {/* <div>
            <Input
              type={'text'}
              placeholder={'position'}
              handleChange={handleFormdata}
              name='position'
            />
          </div> */}
          {/* <div>
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
          </div> */}
          <div>
            <Button
              text={'Reset'}
              background={'#f1efef'}
              border={'1px solid #090808'}
              radius={'5px'}
              height={'30px'}
              onClick={handleReset}
            />
          </div>
          <div>
            <Button
              text={'Open Filter'}
              background={'#f1efef'}
              border={'1px solid #090808'}
              radius={'5px'}
              height={'30px'}
              onClick={() => setOpen(true)}
              width='80px'
              size={'12px'}
            />
          </div>
        </Header>

        <Table
          size='small'
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
